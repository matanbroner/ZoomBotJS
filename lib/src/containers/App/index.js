import React from "react";
import socketIOClient from "socket.io-client";

import NotificationSystem from "react-notification-system";

import Fade from "../../components/Fade";
import ContentSidebar from "../ContentSidebar";
import ContentWrapper from "../ContentWrapper";

const agent = require("superagent");

import "./styles.css";

import CreateSchedule from "../CreateSchedule";
import ActivateSchedule from "../ActivateSchedule";
import ActiveSchedule from "../ActiveSchedule";
import Loader from "../../components/Loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      tabs: [],
      schedules: [],
      loading: false,
      socketServer: "http://localhost:8300",
      activeEvent: null
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    this.configureSocketEvents();
  }

  configureSocketEvents() {
    let socket = socketIOClient(this.state.socketServer);
    socket.on("schedules", schedules => {
      this.setState({
        schedules
      });
    });
    socket.on("newEvent", data => {
      this.setState({
        activeEvent: {
          prompt: data.prompt,
          time: data.time
        }
      });
    });
    socket.on("endSchedule", () => {
      this.setState({
        activeEvent: null
      });
    });
    socket.on("error", err => {
      this.notify("error", err);
    });
    return this.setState({
      socket
    });
  }

  activateSchedule(id) {
    this.state.socket.emit("activate", id);
  }

  deactivateSchedule(){
    this.state.socket.emit("deactivate");
  }

  skipScheduleEvent(){
    this.state.socket.emit("skip");
  }

  notify(level, message) {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message,
      level
    });
  }

  async postSchedule(schedule) {
    try {
      await this.setState({ loading: true });
      await agent.post("http://localhost:8300/api/schedule").send(schedule);
      this.notify("success", `Succesfully created schedule: ${schedule.name}!`);
    } catch (e) {
      this.notify("error", `Error creating schedule: ${schedule.name}`);
    }
    await this.setState({ loading: false });
  }

  setTab(tab) {
    this.setState({
      active: tab
    });
  }

  tabs() {
    return [
      <div>
        <ActivateSchedule
          schedules={this.state.schedules}
          activate={id => this.activateSchedule(id)}
        />
      </div>,
      <CreateSchedule onSubmit={schedule => this.postSchedule(schedule)} />,
      <div>Manage Schedules</div>
    ];
  }

  renderContent() {

    if (this.state.activeEvent) {
      console.log(this.state.activeEvent)
      return(
        <ActiveSchedule 
        event={this.state.activeEvent} 
        deactivate={() => this.deactivateSchedule()}
        skip={() => this.skipScheduleEvent()}
        />
      );
    } else {
      return this.tabs().map((tab, index) => {
        return (
          <div
            style={{
              display: this.state.active === index ? null : "none"
            }}
          >
            <Fade inProp={this.state.active === index}>{tab}</Fade>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <ContentSidebar onChangeTab={tab => this.setTab(tab)}>
        <ContentWrapper>
          {!this.state.loading ? this.renderContent() : <Loader />}
        </ContentWrapper>
        <NotificationSystem ref={this.notificationSystem} />
      </ContentSidebar>
    );
  }
}

export default App;
