import "./Burger.css";

import {useEffect} from "react";

function Burger(props) {

    function handleClickButton(){
        props.onClick()
        props.setOpen(!props.open)

    }

    useEffect(()=>{
        props.setOpen(props.open)
    }, [props.open])

    return (
        <button className={props.open ? "burger open" : "burger"} onClick={handleClickButton}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )

}

export default Burger;