import { Transition } from 'react-transition-group';
import React from 'react'

const duration = 150;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};


const Fade = (props) => {
  return(
    <Transition in={props.inProp} timeout={duration}>
      {state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          {props.children}
        </div>
      )}
    </Transition>
  )
}

export default Fade