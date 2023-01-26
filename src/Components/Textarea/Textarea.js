import './Textarea.css'

import {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function Textarea(props) {
    let [focus, setFocus] = useState(false)
    let [show, setShow] = useState(false)
    let [type, setType] = useState(props.type)

    const textareaRef = useRef()

    useEffect(()=>{
        if(props.value !== '' && props.value != null){
           setFocus(true)
        }
        else{
            setFocus(false)
        }
    }, [props.value])

    function handleChange(event){
        if(props.setValue) props.setValue(event.target.value)

        if(props.onChange) props.onChange(event)
    }
    function handleBlur() {
        if(props.value === "" || props.value == null){
            setFocus(false)
        }
    }
    function focusTextarea(){
        textareaRef.current.focus()
    }
    function handleFocus() {
        setFocus(true)
    }


    function handlePlaceHolderClick() {
        focusTextarea()
    }

    function handleClickEye(){
        if(!show){
            setType("text")
        }
        else{
            setType("password")
        }
        setShow(!show)
    }

    return (
        <div
            className='textarea-box'
            onClick={focusTextarea}
        >
            <textarea
                type={type}
                name={props.name}
                ref={textareaRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={props.value}
                style={{
                    width: props.width,
                    boxSizing: 'border-box'
                }}
            />
            <p
                className={focus ? "placeholder focus" : "placeholder"}
                onClick={handlePlaceHolderClick}
            >
                {props.text}
            </p>
            {props.type === 'password' ? <span onClick={handleClickEye} className="eye"><FontAwesomeIcon icon={!show ? faEye : faEyeSlash}/></span> : ""}
        </div>

    )

}

export default Textarea