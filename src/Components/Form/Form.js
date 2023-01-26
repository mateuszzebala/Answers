import './Form.css'

import React, { Component } from'react'
import Text from '../Text/Text'

class Form extends Component {
    render(){
        return (
            <form 
                action={this.props.action}
                method={this.props.method ? this.props.method : "POST"}
                encType={this.props.enctype ? this.props.enctype : "multipart/form-data"}
                className={this.props.className ? "form-element " + this.props.className : "form-element"}
            >
                <Text font="30" fontWeight="700" pad="10px">{this.props.text ? this.props.text : ""}</Text>
                {this.props.children}
            </form>
        )
    }
}

export default Form