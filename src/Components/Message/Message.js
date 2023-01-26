import './Message.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

let time_out;

export default function Message(props){
    let [hide, setHide] = useState(false)
    let [text, setText] = useState("")
    let [key, setKey] = useState("")
    clearTimeout(time_out)

    time_out = setTimeout(()=>{
        clearTimeout(time_out)
        hide_message()
    }, 5000)
    function hide_message(){
        setHide(true)
    }
    useEffect(()=>{
         setHide(false)
        setText(props.text)
    }, [props.special, props.text])

    return (
        <>
            {props.text ?
                <div className="message-element" style={{
                    transform: hide ? "translate(0, -200%)" : "translate(0, 0)",
                    background: props.color ? props.color + "d2" : "#FF0000d2"
                }}>
                    <span className="message">{text}</span>
                    <span onClick={hide_message} className="x-mark"><FontAwesomeIcon icon={faXmark}/></span>
                </div>
                : ""
            }
        </>
    )
}