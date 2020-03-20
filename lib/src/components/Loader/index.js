import React from 'react'
import localStyles from './styles.module.css'

const Loader = (props) => (
    <div id={localStyles.wrapper}>
        <div className={localStyles.loader}></div>
        <div id={localStyles.text}>
            {props.text || "Loading..."}
        </div>
    </div>
)

export default Loader