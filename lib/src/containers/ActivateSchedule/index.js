import React from "react"
import localStyles from "./styles.module.css"

import { Row, Col, Modal, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faInfoCircle, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { timeFromInt } from "time-number";

import Title from "../../components/Title";
import NoContent from "../../components/NoContent";
import CircularProgressBar from "../../components/CircularProgressBar"
import functions from '../../assets/functions'



class ActivateSchedule extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            schedules: [],
            active: null
        }
    }
    
    async componentDidMount(){
        this.setState({ schedules: this.props.schedules });
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        schedules: nextProps.schedules
      })
    }

    showScheduleModal(schedule){
      this.setState({
        active: schedule
      })
    }

    hideScheduleModal(){
      this.setState({
        active: null
      })
    }

    renderScheduleInfoModal(){
      let schedule = this.state.active;
      if(schedule){
        return(
          <Modal 
          show={this.state.active} 
          onHide={() => this.hideScheduleModal()}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
          >
          <Modal.Header closeButton>
            <Modal.Title>{schedule.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Meeting ID</th>
                <th>Join Days</th>
                <th>Join Time</th>
                <th>Leave Time</th>
              </tr>
            </thead>
            <tbody>
              {functions.sortMeetingsByJoinTime(schedule.meetings).map(meeting => (
                <tr className={localStyles.row}>
                  <td>{meeting.meetingId}</td>
                  <td>{functions.daysText(meeting.days)}</td>
                  <td>{timeFromInt(meeting.joinTime, { format: 12 })}</td>
                  <td>{timeFromInt(meeting.leaveTime, { format: 12 })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.hideScheduleModal()}>
              Close
            </Button>
            <Button variant="success" onClick={() => this.hideScheduleModal()}>
            <FontAwesomeIcon icon={faPowerOff}/>
            </Button>
          </Modal.Footer>
        </Modal>
        )
      }
    }

    renderScheduleCell(schedule){
      return(
        <div className={localStyles.scheduleCell}>
          <div className={localStyles.cellName}>
            {schedule.name}
          </div>
          <div className={localStyles.cellLastActive}>
            Last Active: {new Date().toLocaleDateString()}
          </div>
          <div className={localStyles.cellButtonRow}>
            <div className={localStyles.cellButton} id={localStyles.cellInfoButton} onClick={() => this.showScheduleModal(schedule)}>
              <FontAwesomeIcon icon={faInfoCircle}/>
            </div>
            <div className={localStyles.cellButton} id={localStyles.cellActivateButton} onClick={() => this.props.activate(schedule._id)}>
            <FontAwesomeIcon icon={faPowerOff}/>
            </div>
          </div>
        </div>
      )
    }

    renderSchedules() {
      if (this.state.schedules.length) {
        return (
          <div id={localStyles.schedulesWrapper}>
            <Row>
            {
              this.state.schedules.map((schedule) => {
                return(
                  <Col xs={4}>
                    {this.renderScheduleCell(schedule)}
                  </Col>
                )
              })
            }
            </Row>
          </div>
        );
      } else {
        return (
          <NoContent
            text={`Head over to "Create Schedule" to get started!`}
            icon={faCalendarTimes}
          />
        );
      }
    }

    render() {
        return (
          <div id={localStyles.wrapper}>
            <Title main="Activate a Schedule" />
            {this.renderSchedules()}
            {this.renderScheduleInfoModal()}
          </div>
        );
      }

}

export default ActivateSchedule;