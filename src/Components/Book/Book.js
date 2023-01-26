import './Book.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import icons_by_category from "../../utils/icons";
import HyperButton from "../HyperButton/HyperButton";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

function Book(props){
    let [maxHeight, setMaxHeight] = useState(0)
    function handleClick(){
        if(maxHeight === 0){
            setMaxHeight('500px')
        }
        else{
            setMaxHeight(0)
        }
    }
    return (
        <div className="book-element" onClick={handleClick}>
            <div className="top">
                <div>
                    <span><FontAwesomeIcon className={maxHeight !== 0 ? "active_icon icon" : "icon"} icon={faCaretDown}/></span>
                    <span className="icon-category">
                        {icons_by_category[props.element.category]}
                    </span>
                    <Link to={props.element.link}><span className="book-name">{props.element.name}</span></Link>
                </div>

                <div className="row-with-gap">
                    <span>{props.element.type}</span>
                    <span>{props.element.publishing_house}</span>
                </div>
            </div>
            <div style={{
                maxHeight: maxHeight,
                padding: maxHeight === 0 ? "0" : "30px 0",
                transform: maxHeight === 0 ? "translateX(0)" : "translateX(30px)",
            }} className="dropdown">
                <div className="row-with-gap bottom">
                    <span>Przedmiot: <span className="un-break">{props.element.category}</span></span>
                    <span>Rok wydania: <span className="un-break">{props.element.year}</span></span>
                    <span>Autorzy: <span className="un-break">{props.element.authors}</span></span>
                    <HyperButton color="#ffffff88" to={props.element.link}>Otwórz&nbsp;<FontAwesomeIcon icon={faArrowRight}/></HyperButton>
                </div>
            </div>
        </div>
    )
}

export default Book