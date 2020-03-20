import React from 'react'
import localStyles from './styles.module.css'

const Subtitle = (props) => {
    return(
        <div id={localStyles.wrapper}>
            {props.main}
        </div>
    )
}

export default Subtitle