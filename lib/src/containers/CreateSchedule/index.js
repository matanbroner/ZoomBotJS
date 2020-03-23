import React from "react";
import localStyles from "./styles.module.css";

import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { timeFromInt } from "time-number";

import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import AddMeetingForm from "../../components/Forms/AddMeeting";
import NoContent from "../../components/NoContent";
import FormValidationPrompt from "../../components/FormValidationPrompt";

import constants from "../../assets/constants";

class CreateSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      meetings: [
        {
          id: 123,
          meetingId: 12345,
          joinTime: 18000,
          leaveTime: 18600,
          days: [0, 1, 2, 3, 4, 5, 6]
        }
      ],
      validate: false
    };
  }

  finalizeSchedule() {
    this.setState({
      validate: true
    });
    if(this.isValid()){
        let {
            name,
            meetings
        } = this.state
        this.props.onSubmit({
            name,
            meetings
        });
    }
  }

  isValid(){
      return this.state.name.length > 0;
  }

  submitMeeting(meeting) {
    this.setState({
      meetings: [
        ...this.state.meetings,
        {
          ...meeting,
          id: uuidv4()
        }
      ]
    });
  }

  deleteMeeting(id) {
    this.setState({
      meetings: this.state.meetings.filter(meeting => meeting.id !== id)
    });
  }

  sortMeetingsByJoinTime() {
    return this.state.meetings.sort((a, b) =>
      a.joinTime > b.joinTime ? 1 : -1
    );
  }

  daysText(days) {
    return days.map(day => constants.days[day]).join(", ");
  }

  renderForm() {
    return (
      <div id={localStyles.formWrapper}>
        <Row>
          <Col xs={12}>
            <Form.Label>Schedule Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              placeholder="Enter a schedule name"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <FormValidationPrompt
              text="Please enter name for this schedule"
              status="invalid"
              show={this.state.validate && !this.state.name.length}
            />
          </Col>
        </Row>
        <AddMeetingForm onSubmit={m => this.submitMeeting(m)} />
      </div>
    );
  }

  renderTable() {
    if (this.state.meetings.length) {
      return (
        <div>
          <Subtitle main="Added Meetings" />
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
              {this.sortMeetingsByJoinTime().map(meeting => (
                <tr className={localStyles.row}>
                  <td>{meeting.meetingId}</td>
                  <td>{this.daysText(meeting.days)}</td>
                  <td>{timeFromInt(meeting.joinTime, { format: 12 })}</td>
                  <td>{timeFromInt(meeting.leaveTime, { format: 12 })}</td>
                  <td className={localStyles.deleteCell}>
                    <div
                      className={localStyles.deleteButton}
                      onClick={() => this.deleteMeeting(meeting.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form.Row>
            <Col xs={12}>
              <div id={localStyles.submitButtonWrapper}>
                <Button type="submit" onClick={() => this.finalizeSchedule()}>Finalize Schedule</Button>
              </div>
            </Col>
          </Form.Row>
        </div>
      );
    } else {
      return (
        <NoContent
          text={`Click "Submit Meeting" to add your first meeting`}
          icon={faCalendarTimes}
        />
      );
    }
  }

  render() {
    return (
      <div id={localStyles.wrapper}>
        <Title main="Create a New Schedule" />
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}

export default CreateSchedule;
