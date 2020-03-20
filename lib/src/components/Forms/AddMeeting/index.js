import React, { useState } from 'react'
import localStyles from './styles.module.css'
import TimePicker from 'react-bootstrap-time-picker';
import { Row, Col, Form, Button } from 'react-bootstrap'

import DayPicker from '../../DayPicker'
import FormValidationPrompt from '../../FormValidationPrompt'

class AddMeetingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            meeting: {
                days: [],
                meetingId: "",
                joinTime: 180000, // 5:00 AM
                leaveTime: 180000, // 5:00 AM
            },
            validate: false
        }
    }

    resetState(){
        this.setState({
            meeting: {
                days: [],
                meetingId: "",
                joinTime: 180000, // 5:00 AM
                leaveTime: 180000, // 5:00 AM
            },
            validate: false
        })
    }

    onChange(key, val){
        this.setState({
            validate: false,
            meeting: {
                ...this.state.meeting,
                [key]: val
            }
        })
    }

    editDays(day){
        let { days } = this.state.meeting;
        if (days.includes(day)){
            days = days.filter(d => d !== day);
        } else {
            days.push(day);
        }
        this.onChange('days', days);
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({ validate: true });
        if (this.validateDays() && this.validateMeetingId && this.validateTimes()) {
            this.props.onSubmit(this.state.meeting);
            this.resetState();
        }
    };

    validateMeetingId(){
        return this.state.meeting.meetingId.length > 0
    }

    validateDays(){
        return this.state.meeting.days.length !== 0
    }

    validateTimes(){
        return this.state.meeting.leaveTime > this.state.meeting.joinTime
    }

    render(){
        return (
            <div id={localStyles.wrapper}>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} xs="6" controlId="validationCustom01">
                            <Form.Label>Meeting Room ID</Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.meeting.meetingId}
                                placeholder="Zoom Room ID"
                                onChange={(e) => this.onChange('meetingId', e.target.value)}
                            />
                            <FormValidationPrompt
                            text="Looks Good!"
                            show={this.state.validate && this.validateMeetingId()}
                            />
                            <FormValidationPrompt
                            text="Please enter a valid Meeting ID"
                            status="invalid"
                            show={this.state.validate && !this.validateMeetingId()}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs="6">
                            <Form.Label>Days to Join</Form.Label>
                            <DayPicker
                                given={this.state.meeting.days}
                                onClickDay={(day) => this.editDays(day)}
                            />
                            <FormValidationPrompt
                            text="Looks Good!"
                            show={this.state.validate && this.validateDays()}
                            />
                            <FormValidationPrompt
                            text="Please choose at least one day"
                            status="invalid"
                            show={this.state.validate && !this.validateDays()}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} xs="6">
                            <Form.Label>Time to Join</Form.Label>
                            <TimePicker
                            start="05:00"
                            end="24:00"
                            value={this.state.meeting.joinTime}
                            onChange={(time) => this.onChange('joinTime', time)}
                            step={5} />
                            <FormValidationPrompt
                            text="Looks Good!"
                            show={this.state.validate && this.validateTimes()}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs="6">
                            <Form.Label>Time to Leave</Form.Label>
                            <TimePicker
                            start="05:00"
                            end="24:00"
                            value={this.state.meeting.leaveTime}
                            onChange={(time) => this.onChange('leaveTime', time)}
                            step={5} />
                            <FormValidationPrompt
                            text="Looks Good!"
                            show={this.state.validate && this.validateTimes()}
                            />
                            <FormValidationPrompt
                            text="Please choose a leave time after your join time"
                            status="invalid"
                            show={this.state.validate && !this.validateTimes()}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12}>
                            <div id={localStyles.submtButtonWrapper}>
                                <Button type="submit">Submit Meeting</Button>
                            </div>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}

export default AddMeetingForm