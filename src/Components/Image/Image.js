import './Image.css'
import Window from "../Window/Window";
import React, {Component} from "react";

class Image extends Component{
    state = {
        zoom: false
    }
    handleZoomClose(){
        this.setState({zoom: false})
    }
    handleImgClick(){
        this.setState({zoom: true})
    }
    render(){
        return (
            <>
                <img
                    src={this.props.src}
                    alt={this.props.alt ? this.props.alt : this.props.src}
                    style={{
                        width: this.props.width
                    }}
                    onClick={this.handleImgClick.bind(this)}
                />
                {this.state.zoom ? <Window onClose={this.handleZoomClose.bind(this)}><img src={this.props.src} alt={this.props.alt ? this.props.alt : this.props.src}/></Window> : ""}
            </>
        )
    }
}

export default Image