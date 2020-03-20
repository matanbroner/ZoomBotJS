import React from 'react'
import localStyles from './styles.module.css'
import { Col, Form } from 'react-bootstrap'

const TextInput = (props) => {
    return(
        <Form.Group as={Col} xs={props.xs}>
          <Form.Control type="text" placeholder="Meeting ID" />
        </Form.Group>
    )
}

export default TextInput
