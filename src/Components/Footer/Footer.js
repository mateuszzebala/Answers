import './Footer.css'
import {useGlobalState} from "../../utils/globalState";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import apiUrl from "../../apiUrl";
import HyperButton from "../HyperButton/HyperButton";

const Footer = (props)=>{

    const [username] = useGlobalState('username')
    const [is_superuser] = useGlobalState('is_superuser')

    return (
        <footer className="footer-element">

            <h1>{username ? "ZALOGOWANO" : "NIEZALOGOWANO"}</h1>
            <span>2022</span>
            {is_superuser == true ? <>
                <div className="links">
                    <HyperButton fontColor="white" color="transparent" to="/">HOME</HyperButton>
                    <HyperButton fontColor="white" color="transparent" to="/add_task"><FontAwesomeIcon icon={faPlus}/>&nbsp;ZADANIE</HyperButton>
                    <HyperButton fontColor="white" color="transparent" blank={true} to={`${apiUrl}/admin`}>ADMIN</HyperButton>
                </div>
            </>:""}
        </footer>
    )

}

export default Footer