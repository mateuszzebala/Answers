import './AuthEmail.css'
import {useState} from "react";
import Loading from "../Loading/Loading";
import Text from "../Text/Text";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";
import apiUrl from "../../apiUrl";

const AuthEmail = props => {
    document.title = "Autoryzacja adresu e-mail"
    let [auth, setAuth] = useState(false)
    let [timeEnd, setTimeEnd] = useState(false)

    const code = props.match.params.code

    setTimeout(()=>{
        setTimeEnd(true)
    }, 5000)

    axios.get(`${apiUrl}/auth_email/${code}`).then(res=>{
        if(res.data.code === 200){
            setAuth(true)
        }
    })


    return (
        <div className="auth-email-element">
            {auth ?
                <>
                    <span style={{color: "var(--special)"}}><FontAwesomeIcon icon={faThumbsUp}/></span>
                    <Text fontWeight={700} font={30}>Autoryzacaja uzyskana</Text>
                    <Text font={20}>Teraz możesz się <Link to="/login">zalogować</Link></Text>
                </>
                : ! timeEnd ?
                    <Loading/>
                    : <>
                        <span style={{color: "red"}}><FontAwesomeIcon icon={faThumbsDown}/></span>
                        <Text fontWeight={700} font={30}>Błąd autoryzacji</Text>
                    </>
            }
        </div>
    )
}

export default AuthEmail