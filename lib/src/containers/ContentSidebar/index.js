import React from "react";
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faPowerOff, faCalendarWeek, faTasks } from '@fortawesome/free-solid-svg-icons'
import {Row, Col} from 'react-bootstrap'

import localStyles from "./styles.module.css";

const mql = window.matchMedia(`(min-width: 800px)`);
const sidebarStyles = {
  sidebar: {
    background: "rgb(57, 58, 76)",
    width: "256px"
  }
};

const tabs = [
  {
    key: 0,
    title: "Activate a Schedule",
    icon: faPowerOff
  },
  {
    key: 1,
    title: "Create a New Schedule",
    icon: faCalendarWeek
  },
  {
    key: 2,
    title: "Manage Schedules",
    icon: faTasks
  }
]

class ContentSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  renderSidebarContent() {
    return (
      <div id={localStyles.sidebarWrapper}>
        {this.renderHeader()}
        {this.renderTabs()}
      </div>
    )
  }

  renderHeader() {
    return (
      <div id={localStyles.headerWrapper}>
        <Row>
          <Col xs={12}>
            <div id={localStyles.headerIcon}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
            />
          </div>
          </Col>
          <Col xs={12}>
          <div id={localStyles.headerTitle}>
            Zoom Scheduler
          </div>
          </Col>
        </Row>
      </div>
    )
  }

  renderTabs(){
    return(
      <div id={localStyles.tabsWrapper}>
        {
          tabs.map((tab) => {
            return(
              <div 
              className={localStyles.tab}
              onClick={() => this.props.onChangeTab(tab.key)}
              >
                <FontAwesomeIcon icon={tab.icon}/>
                <span className={localStyles.tabTitle}>
                  {tab.title}
                </span>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <Sidebar
        sidebar={this.renderSidebarContent()}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={sidebarStyles}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

export default ContentSidebar;
