import './SearchInput.css'
import React, {useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import apiUrl from "../../apiUrl";

const SearchInput = (props)=>{
    let [focus, setFocus] = React.useState(false)
    let [value, setValue] = React.useState("")
    let [hints, setHints] = React.useState([])

    const thisRef = React.useRef()

    function focusInput(){
        if(value.length > 0){
            setFocus(true)
        }
    }
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
        setFocus(false)
    })
    function blurInput(){

    }

    function handleInputChange(event){
        setValue(event.target.value)
        if(event.target.value === "") {
            setHints([])
            setFocus(false)
            return
        }
        setFocus(true)

        axios({
            method:'GET',
            url: `${apiUrl}/search/` + event.target.value,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',
        }).then(response=>{
            setHints(response.data)
        })
    }
    function hideHints(){
        setFocus(false)
    }
    return (
        <div className='search-input-element' ref={thisRef} style={{
                borderRadius: "10px"
            }}>
            <div className="top-part" >
                <input value={value} onChange={handleInputChange} onBlur={blurInput} onFocus={focusInput} type="text" placeholder={props.placeholder}></input>
            </div>
            <div
                className="dropdown"
                style={{
                    maxHieght: focus ? "100vh" : "0px",
                    minHeight: focus ? "200px" : "0px"
                }}
            >

                {hints ? Object.keys(hints).map(elem => {
                    return <span onClick={hideHints} key={elem}><Link className="hints" to={"/" + hints[elem].link}>{hints[elem].string}</Link></span>
                }) : "Brak wyników"}
            </div>
        </div>
    )

}

export default SearchInput
