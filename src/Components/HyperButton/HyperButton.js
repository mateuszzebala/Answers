import './HyperButton.css'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class HyperButton extends Component {
    render(){
        if(this.props.blank){
            return(
                <a
                    className={this.props.hoverEffect ? "hyper-button-element hover-effect" : "hyper-button-element"}
                    href={this.props.to}
                    onClick={this.props.onClick}
                    target={this.props.blank ? "_blank" : ""}
                    style={{
                        "--special": this.props.color,
                        "--lcolor": this.props.lcolor ? this.props.lcolor : "#000",
                        textTransform: this.props.textTransform,
                        padding: this.props.padding,
                        fontSize: this.props.font,
                        color: this.props.fontColor
                    }}
                >
                    {this.props.children}
                </a>
            )
        }
        return (
            <Link
                className={this.props.hoverEffect ? "hyper-button-element hover-effect" : "hyper-button-element"}
                to={this.props.to}
                onClick={this.props.onClick}
                target={this.props.blank ? "_blank" : ""}
                style={{
                    "--special": this.props.color,
                    "--lcolor": this.props.lcolor ? this.props.lcolor : "#000",
                    textTransform: this.props.textTransform,
                    padding: this.props.padding,
                    fontSize: this.props.font,
                    color: this.props.fontColor
                }}
            >
                {this.props.children}
            </Link>
        )
    }
}

export default HyperButton