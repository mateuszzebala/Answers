import './Select.css'
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faLeftLong, faRightLong} from "@fortawesome/free-solid-svg-icons"

function Select(props){
    let [value, setValue] = React.useState(props.value ? props.value : 0)
    let [active, setActive] = React.useState()
    let [elements, setElements] = React.useState(props.elements)
    const thisRef = React.useRef()
    const inputRef = React.useRef()
    const dropDownRef = React.useRef()

    useEffect(()=>{
        setValue(props.value)
    }, [props.value])

    useEffect(() => {

        setElements(props.elements)

    }, [props.elements])

    
    useEffect(() => {
       inputRef.current.value = elements[value]
    },[elements, value])

    useEffect(()=>{
        try{dropDownRef.current.style.overflow = 'hidden'}
        catch (e) {}
        setTimeout(()=>{
            try{
                dropDownRef.current.style.overflow = active ? "auto" : 'hidden'
            }
            catch (e) {}
        }, 300)
    }, [active])

    function useOnClickOutside(ref, handler) {
        useEffect(
            () => {
                const listener = (event) => {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        )
    }
    useOnClickOutside(thisRef, ()=>{
        setActive(false)
    })
    function handleSelectClick(event){
        if(event.target.tagName === 'BUTTON' || event.target.tagName === 'path' || event.target.tagName === 'svg')
        {
        }
        else{
            setActive(!active)
        }

    }
    function newValue(event){
        if(event.target.getAttribute("value") !== value){
            event.value = event.target.getAttribute("value")
            setValue(event.value)
            props.onChange(event)
        }
        setActive(false)
    }
    function left(){
        let event = {value: value-1}
        setActive(false)
        if(value > 0){
            setValue(event.value)
            props.onChange(event)
        }
    }
    function right(){
        let event = {value: value+1}
        setActive(false)
        if(value < Object.keys(elements).length - 1){
            setValue(event.value)
            props.onChange(event)
        }
    }
    return(
        <div
            className="select-element"
            onClick={handleSelectClick}
            ref={thisRef}
        >

                <div className="top" style={{
                    display: props.hideTop === true ? "none" : "inline-flex"
                }}>
                    <input type="hidden" ref={inputRef} name={props.name}/>
                    {props.title ? props.title : ""}
                    <FontAwesomeIcon icon={faCaretDown} className={active ? "active_icon icon" : "icon"}/>
                </div>
            <div className="bottom">
                {props.toogles ? <button onClick={left} className="toogles"><FontAwesomeIcon icon={faLeftLong}/></button>: ""}
                <div className="name"><span style={{fontWeight: 200}}>{props.hideTop === true ? props.title + ": " : ""}</span>{typeof elements[value] != "undefined" ? elements[value][1] : "-"}</div>
                {props.toogles ? <button onClick={right} className="toogles"><FontAwesomeIcon icon={faRightLong}/></button> : ""}
            </div>
            <div ref={dropDownRef} className={active ? "dropdown active" : "dropdown"}>
                {Object.keys(elements).map((elem, key) => {
                    return <button value={elem} onClick={newValue} key={key} type="button">{elements[elem][1]}</button>
                })}
            </div>

        </div>
    )
}

export default Select