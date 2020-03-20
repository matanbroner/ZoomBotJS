import React from 'react';

import Fade from '../../components/Fade'
import ContentSidebar from '../ContentSidebar'
import ContentWrapper from '../ContentWrapper'

const agent = require('superagent');

import './styles.css'

import CreateSchedule from '../CreateSchedule'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      tabs: []
    };
  }

  componentDidMount(){
    agent.get("http://localhost:8300/api")
    .then((res) => console.log(res))
    this.generateTabs();
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
      </div>,
      <CreateSchedule/>,
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
            typeof this.state.tabs !== 'undefined'
            ? this.state.tabs.map((tab, index) => {
              console.log(this.state.active === index)
              return(
                <Fade
                inProp={this.state.active === index}
                >
                  {tab}
                </Fade>
              )
            })
            : null
          }
        </ContentWrapper>
      </ContentSidebar>
    );
  }
}
 
export default App;
