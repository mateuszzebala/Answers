import './TextButton.css'

import React, { Component } from'react'

class Button extends Component {
    state = {

    }
    constructor(props) {
        super();
    }

    render(){
        return (
            <div className='button-box'>
                <div className='text-button'>{this.props.children}</div>
            </div>
            
        )
    }
}

export default Button