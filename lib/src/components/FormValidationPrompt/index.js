import React from 'react'
import localStyles from './styles.module.css'

const FormValidationPrompt = (props) => {
    const promptColor = () => {
        switch(props.status){
            case 'invalid': return '#dc3545';
            case 'warning': return '#f8d500';
            default: return '#28a745';
        }
    }
    return(
        <div
        id={localStyles.wrapper}
        style={{
            display: props.show ? 'block' : 'none',
            color: promptColor()
        }}
        >
        {props.text}
        </div>
    )
}

export default FormValidationPrompt