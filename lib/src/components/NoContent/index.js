import React from 'react'
import localStyles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const NoContent = (props) => {

    return(
        <div id={localStyles.wrapper}>
            <div id={localStyles.icon}>
                <FontAwesomeIcon icon={props.icon || faFolderOpen}/>
            </div>
            <div id={localStyles.text}>
                {props.text || 'No Content'}
            </div>
        </div>
    )
}

export default NoContent