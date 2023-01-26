import './Window.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';

const Window = (props) => {

    function onClickExit(event){
        props.setShow(false)
        props.onClose()
    }

    return(
        <div
            className='window-element'
            style={{
                display: props.show ? 'block' : 'none',
                background: props.background
            }}
        >
            <Button
                className="exit"
                onClick={onClickExit}
            >
                <FontAwesomeIcon icon={faXmark} />
            </Button>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Window
