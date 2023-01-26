import './VideoPlayer.css'

import React, { Component } from'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faExpand} from "@fortawesome/free-solid-svg-icons";

class VideoPlayer extends Component {
    state = {
        play: false,
        time: 0,
        duration: 0,
        time_show: "0:00 / 0:00",
    }


    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
        this.rangeRef = React.createRef()

    }
    time(){
        let seconds = this.state.time
        let minutes = 0
        let duration_m = 0
        let duration_s = this.state.duration
        while (seconds >= 60){
            minutes += 1
            seconds -= 60
        }
        while(duration_s >= 60){
            duration_m += 1
            duration_s -= 60
        }
        if(seconds < 10){
            seconds = `0${seconds}`
        }
        if(duration_s < 10){
            duration_s = `0${duration_s}`
        }
        this.setState({time_show: `${minutes}:${seconds} / ${duration_m}:${duration_s}`})
    }
    setDuration(){
        this.setState({duration: Math.floor(this.videoRef.current.duration)})
    }
    componentDidMount() {
        this.videoRef.current.ontimeupdate = this.update.bind(this)
        this.videoRef.current.onloadedmetadata = this.setDuration.bind(this)
        this.videoRef.current.onended = ()=>{this.setState({play: false})}
    }
    update(event){
        this.setState({time: Math.floor(event.target.currentTime)})

        this.time()
    }
    handleClickPlayPause(){
        this.setState({play: !this.state.play})
        if(this.state.play){
            this.videoRef.current.pause()
        }else{
            this.videoRef.current.play()
        }
    }
    handleInputChange(event){
        const time = Math.floor(event.target.value)
        this.setState({time: time})
        this.videoRef.current.currentTime = time

    }
    fullscreen(){
        this.videoRef.current.requestFullscreen()
    }
    render(){
        return (
            <div className="video-element">
                <video
                    className="video-tag"
                    src={this.props.src}
                    ref={this.videoRef}
                    onClick={this.handleClickPlayPause.bind(this)}
                />
                <div className="video-tools">
                    <button
                        onClick={this.handleClickPlayPause.bind(this)}
                    >{this.state.play ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} /> }</button>
                    <input onChange={this.handleInputChange.bind(this)} value={this.state.time} type="range" ref={this.rangeRef} max={this.state.duration}/>
                    <span>{this.state.time_show}</span>
                    <button
                        onClick={this.fullscreen.bind(this)}
                    >
                        <FontAwesomeIcon icon={faExpand}/>
                    </button>
                </div>
            </div>
        )
    }
}

export default VideoPlayer