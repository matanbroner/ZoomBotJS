import React from 'react';
import NotificationSystem from 'react-notification-system';


import Fade from '../../components/Fade'
import ContentSidebar from '../ContentSidebar'
import ContentWrapper from '../ContentWrapper'

const agent = require('superagent');

import './styles.css'

import CreateSchedule from '../CreateSchedule'
import Loader from '../../components/Loader'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      tabs: [],
      schedules: [],
      loading: false
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount(){
    const schedules = this.getSchedules();
    this.setState({
      schedules
    });
    this.generateTabs();
  }

  notify(level, message){
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message,
      level
    });
  }

  async getSchedules(){
    try {
      await this.setState({ loading: true });
      await agent
      .get("http://localhost:8300/api/schedule")
    } catch (e) {
      this.notify('error', `Error fetching all schedules`)
    }
    await this.setState({ loading: false });
  }

  async postSchedule(schedule){
    try {
      await this.setState({ loading: true });
      await agent
      .post("http://localhost:8300/api/schedule")
      .send(schedule);
      this.notify('success', `Succesfully created schedule: ${schedule.name}!`)
    } catch (e) {
      this.notify('error', `Error creating schedule: ${schedule.name}`)
    }
    await this.setState({ loading: false });
  }

  setTab(tab){
    this.setState({
      active: tab
    });
  }

  generateTabs(){
    const tabs = [
      <div>
        Activate a Schedule
        <Loader/>
      </div>,
      <CreateSchedule
      onSubmit={(schedule) => this.postSchedule(schedule)}
      />,
      <div>
        Manage Schedules
      </div>
    ]
    this.setState({
      tabs
    })
  }
 
  render() {
    return (
      <ContentSidebar
      onChangeTab={(tab) => this.setTab(tab)}
      >
        <ContentWrapper>
          {
            !this.state.loading
            ? this.state.tabs.map((tab, index) => {
              return(
                <div
                style={{
                  display: this.state.active === index ? null : 'none'
                }}
                >
                  <Fade
                inProp={this.state.active === index}
                >
                  {tab}
                </Fade>
                </div>
              )
            })
            : <Loader/>
          }
        </ContentWrapper>
        <NotificationSystem ref={this.notificationSystem} />
      </ContentSidebar>
    );
  }
}
 
export default App;
