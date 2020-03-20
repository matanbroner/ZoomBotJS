import React from 'react'
import localStyles from './styles.module.css'

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DayPicker = (props) => {
    return(
        <div id={localStyles.wrapper}>
            {
                days.map((day, index) => {
                    return(
                        <div 
                        className={localStyles.day}
                        style={{
                            backgroundColor: props.given.includes(index) ? 'rgb(71, 141, 247)' : 'white',
                            color: props.given.includes(index) ? 'white' : '#ced4da',
                            border: props.given.includes(index) ? '0' : '1px solid #ced4da',
                        }}
                        onClick={() => props.onClickDay(index)}
                        >
                            {day}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DayPicker