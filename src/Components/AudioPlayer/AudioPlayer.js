import './AudioPlayer.css'

import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'

class AudioPlayer extends Component {
    state = {
        play: false,
        time: 0,
        duration: 0,
        time_show: "0:00 / 0:00",
    }
    audio = new Audio()


    constructor(props) {
        super(props)
        this.audio.src = this.props.src
        this.rangeRef = React.createRef()

    }

    time() {
        let seconds = this.state.time
        let minutes = 0
        let duration_m = 0
        let duration_s = this.state.duration
        while (seconds >= 60) {
            minutes += 1
            seconds -= 60
        }
        while (duration_s >= 60) {
            duration_m += 1
            duration_s -= 60
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        if (duration_s < 10) {
            duration_s = `0${duration_s}`
        }
        this.setState({time_show: `${minutes}:${seconds} / ${duration_m}:${duration_s}`})
    }

    setDuration() {
        this.setState({duration: Math.floor(this.audio.duration)})

    }

    componentDidMount() {
        this.audio.ontimeupdate = this.update.bind(this)
        this.audio.onloadedmetadata = this.setDuration.bind(this)
        this.audio.onended = () => {
            this.setState({play: false})
        }
        this.time()
    }

    update(event) {
        this.setState({time: Math.floor(event.target.currentTime)})

        this.time()
    }

    handleClickPlayPause() {
        this.setState({play: !this.state.play})
        if (this.state.play) {
            this.audio.pause()
        } else {
            this.audio.play()
        }

    }

    handleInputChange(event) {
        const time = Math.floor(event.target.value)
        this.setState({time: time})
        this.audio.currentTime = time

    }

    render() {
        return (
            <div className="audio-element">

                <div className="top">
                    <button
                        onClick={this.handleClickPlayPause.bind(this)}
                    >{this.state.play ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}</button>

                    <span>{this.state.time_show}</span>

                </div>
                <input onChange={this.handleInputChange.bind(this)} value={this.state.time} type="range" ref={this.rangeRef} max={this.state.duration}/>
            </div>
        )
    }
}

export default AudioPlayer