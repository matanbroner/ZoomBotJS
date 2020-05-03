import React from 'react'
import localStyles from './styles.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import CircularProgressBar from '../../components/CircularProgressBar';
import Title from '../../components/Title'

import functions from '../../assets/functions';

class ActiveSchedule extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            time: 0,
            originalTime: 0,
            prompt: "",
            interval: null
        }
    }

    setTimer(){
        if(this.state.originalTime > 0 && !this.state.interval){
            let runs = this.state.originalTime;
            this.setState({
                interval: setInterval(async () => {
                    await this.setState({
                        time: this.state.time + 1
                    })
                    runs -= 1;
                    if(runs == 0){
                        clearInterval(this.state.interval);
                    }
                    console.log("run interval")
                }, 1000)
            })
            
        }
    }

    setProps(props=this.props){
        if(props.event){
            const {
                time, 
                prompt
            } = props.event;
            this.setState({
                originalTime: time,
                prompt
            });
        }
    }

    componentDidMount(){
        this.setProps()
    }

    componentWillReceiveProps(nextProps){
        this.setProps(nextProps);
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    timeLeft(){
        return functions.timeText(this.state.originalTime - this.state.time)
    }

    percent(){
        return (this.state.time / this.state.originalTime) * 100
    }

    renderContent(){
        return(
            <div id={localStyles.content}>
                <div id={localStyles.prompt}>
                    {this.state.prompt} in...
                </div>
                <div id={localStyles.countdownWrapper}>
                <CircularProgressBar
                strokeWidth="20"
                sqSize="300"
                text={`${this.timeLeft()}`}
                percentage={this.percent()}/>
                </div>
                {this.renderButtons()}
            </div>
        )
    }

    renderButtons(){
        return(
            <div id={localStyles.buttonRow}>
                <div className={localStyles.eventButton} id={localStyles.skip} onClick={() => this.props.skip()}>
                    <FontAwesomeIcon icon={faForward}/>
                </div>
                <div className={localStyles.eventButton} id={localStyles.end} onClick={() => this.props.deactivate()}>
                    <FontAwesomeIcon icon={faPowerOff}/>
                </div>
            </div>
        )
    }

    render(){
        if(this.props.event){
            this.setTimer();
            return(
                <div id={localStyles.wrapper}>
                    <Title
                    main="Active Schedule"
                    />
                    {this.renderContent()}
                </div>
            )
        } else {
            return null
        }
    }
}

export default ActiveSchedule;