import React from 'react'
import localStyles from './styles.module.css'

class ContentWrapper extends React.Component{
    render(){
        return(
            <div id={localStyles.wrapper}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentWrapper