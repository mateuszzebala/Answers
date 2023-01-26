import './LoginForm.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import Text from '../../Text/Text'
import Hyper from '../../Hyper/Hyper'
import Form from '../../Form/Form'
import React from'react'
import getCsrfToken from "../../../utils/csrf";
import axios from "axios";
import {useGlobalState, setGlobalState} from "../../../utils/globalState";
import init from "../../../utils/init";
import {Redirect} from "react-router-dom";
import apiUrl from "../../../apiUrl";
import Message from "../../Message/Message";

const LoginForm = () => {
    document.title = "Logowanie"
    let [login, setLogin] = React.useState("")
    let [password, setPassword] = React.useState("")
    let [message, setMessage] = React.useState("")
    let [color, setColor] = React.useState("red")
    let [special, setSpecial] = React.useState(Math.random())

    async function submitLogin(event){
        event.preventDefault()
        axios({
            method:'post',
            url: `${apiUrl}/login/`,
            data:{
                login: login,
                password: password,
            },
            headers: {
                'X-CSRFTOKEN': await getCsrfToken(),
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',

        }).then(response=>{
            setSpecial(Math.random())
            if(response.data.code === 200){
                setGlobalState('login', true)
                init()
                setMessage(response.data.message)
                setColor("#20ba20")
            }
            else{
                setColor("#FF0000")
                setMessage(response.data.message)
            }
        })

    }
    function handleLoginChange(event){
        setLogin(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    const [logedin] = useGlobalState('login')

    if(logedin){
        return <Redirect exact to="/"/>
    }
    else{
        return (
            <Form className="login-form">
                <Text font="30" fontWeight="700" pad="10px">LOGOWANIE</Text>
                <Input text="Login" type="text" name="login" value={login} onChange={handleLoginChange}/>
                <Input text="Hasło" type="password" name="password" value={password} onChange={handlePasswordChange}/>
                <span className="error">
                   <Message text={message} color={color} special={special}/>
                </span>
                <Button type="submit" onClick={submitLogin}>Zaloguj</Button>
                <Hyper to="/register">Zarejestruj się</Hyper>

            </Form>
        )
    }


}

export default LoginForm