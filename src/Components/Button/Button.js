import './Button.css'

import React, { Component } from'react'

class Button extends Component {
    state = {

    }
    constructor(props) {
        super();
    }

    render(){
        return (
            <div className={this.props.className ? "button-box " + this.props.className : "button-box"}>
                <button 
                    className="button-element"
                    type={this.props.type ? this.props.type : "button"} 
                    {...this.props}
                >
                    {this.props.children}
                </button>
            </div>
            
        )
    }
}

export default Button