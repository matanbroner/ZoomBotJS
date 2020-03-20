import React from 'react'
import localStyles from './styles.module.css'

import { Row, Col, Form, Table } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { timeFromInt } from 'time-number';


import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'

import AddMeetingForm from '../../components/Forms/AddMeeting'
import NoContent from '../../components/NoContent'

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
                    days: [1, 4]
                }
            ]
        }
    }

    submitMeeting(meeting){
        this.setState({
            meetings: [
                ...this.state.meetings,
                {
                    ...meeting,
                    id: uuidv4()
                }
            ]
        })
    }

    deleteMeeting(id){
        this.setState({
            meetings: this.state.meetings.filter((meeting) => meeting.id !== id)
        })
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
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </Col>
                </Row>
                <AddMeetingForm
                onSubmit={(m) => this.submitMeeting(m)}
                />
            </div>
        )
    }

    renderTable(){
        let { meetings } = this.state
        if (this.state.meetings.length){
            return(
                <div>
                    <Subtitle
                    main="Added Meetings"
                    />
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
                        {
                            this.state.meetings.map((meeting) => (
                                <tr className={localStyles.row}>
                                <td>{meeting.meetingId}</td>
                                <td>{meeting.days.length}</td>
                                <td>{timeFromInt(meeting.joinTime, { format: 12 })}</td>
                                <td>{timeFromInt(meeting.leaveTime, { format: 12 })}</td>
                                <td className={localStyles.deleteCell}>
                                    <div 
                                    className={localStyles.deleteButton}
                                    onClick={() => this.deleteMeeting(meeting.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </div>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </div>
            )
        } else {
            return(
                <NoContent
                text={`Click "Submit Meeting" to add your first meeting`}
                icon={faCalendarTimes}
                />
            )
        }
    }

    render() {
        return (
            <div id={localStyles.wrapper}>
                <Title
                    main="Create a New Schedule"
                />
                {this.renderForm()}
                {this.renderTable()}
            </div>
        )
    }
}

export default CreateSchedule