import './RegisterForm.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import Text from '../../Text/Text'
import Hyper from '../../Hyper/Hyper'
import Form from '../../Form/Form'
import React from'react'
import getCsrfToken from "../../../utils/csrf";
import axios from "axios";
import {useGlobalState} from "../../../utils/globalState";
import {Redirect} from "react-router-dom";
import apiUrl from "../../../apiUrl";
import Message from "../../Message/Message";
import init from "../../../utils/init";


const RegisterForm = () => {
    document.title = "Rejestracja"
    let [registered, setRegistered] = React.useState(false)
    let [login, setLogin] = React.useState("")
    let [email, setEmail] = React.useState("")
    let [firstName, setFirstName] = React.useState("")
    let [lastName, setLastName] = React.useState("")
    let [password1, setPassword1] = React.useState("")
    let [password2, setPassword2] = React.useState("")
    let [message, setMessage] = React.useState("")
    let [color, setColor] = React.useState("red")
    let [special, setSpecial] = React.useState(Math.random())

    async function submitRegister(event){
        event.preventDefault()
        axios({
            method:'post',
            url: `${apiUrl}/register/`,
            data:{
                username: login,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password1: password1,
                password2: password2,
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
                init()
                setRegistered(true)
                setMessage(response.data.message)
                setColor("#20ba20")
            }
            else{
                setColor("#FF0000")
                setMessage(response.data.message)
            }
        })

    }
    function handleChangeLogin(event){
        setLogin(event.target.value)
    }
    function handleChangeEmail(event){
        setEmail(event.target.value)
    }
    function handleChangeFirstName(event){
        setFirstName(event.target.value)
    }
    function handleChangeLastName(event){
        setLastName(event.target.value)
    }
    function handleChangePassword1(event){
        setPassword1(event.target.value)
    }
    function handleChangePassword2(event){
        setPassword2(event.target.value)
    }
    const [logedin] = useGlobalState('login')

    if(logedin){
        return <Redirect exact to="/"/>
    }
    else if(registered){
        return <Redirect exact to="/login"/>
    }
    else{
        return (
            <Form action="/register/" className="register-form">
                <Text font="30" fontWeight="700" pad="10px">REJESTRACJA</Text>
                <Input onChange={handleChangeLogin} value={login} text="Login" type="text" name="login"/>
                <Input onChange={handleChangeEmail} value={email} text="E-mail" type="email" name="email"/>
                <Input onChange={handleChangeFirstName} value={firstName} text="Imię" type="text" name="firstname"/>
                <Input onChange={handleChangeLastName} value={lastName} text="Nazwisko" type="text" name="lastname"/>
                <Input onChange={handleChangePassword1} value={password1} text="Hasło" type="password" name="password1"/>
                <Input onChange={handleChangePassword2} value={password2} text="Powtórz hasło" type="password" name="password2"/>
                <span className="error">
                   <Message text={message} color={color} special={special}/>
                </span>
                <Button type="submit" onClick={submitRegister}>Zarejestruj</Button>
                <Hyper to="/login">Zaloguj się</Hyper>
            </Form>

        )
    }


}

export default RegisterForm