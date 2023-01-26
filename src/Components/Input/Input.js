import './Input.css'

import {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function Input(props) {
    let [focus, setFocus] = useState(false)
    let [show, setShow] = useState(false)
    let [type, setType] = useState(props.type)

    const inputRef = useRef()

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
    function focusInput(){
        inputRef.current.focus()
    }
    function handleFocus() {
        setFocus(true)
    }


    function handlePlaceHolderClick() {
        focusInput()
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
            className='input-box'
            onClick={focusInput}
        >
            <input
                type={type}
                name={props.name}
                value={props.value}
                ref={inputRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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

export default Input