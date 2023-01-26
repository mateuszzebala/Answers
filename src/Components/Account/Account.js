import './Account.css'
import Text from "../Text/Text";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "../Form/Form";
import React, {useState} from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";
import getCsrfToken from "../../utils/csrf";
import {useGlobalState} from "../../utils/globalState";
import {Redirect} from "react-router-dom";
import Message from "../Message/Message";

export default function Account(props){
    document.title = "Twoje konto"
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [firstname, setFirstname] = useState("")
    let [lastname, setLastname] = useState("")
    let [password1, setPassword1] = useState("")
    let [password2, setPassword2] = useState("")
    let [oldPassword, setOldPassword] = useState("")
    let [init, setInit] = useState(true)
    let [message, setMessage] = useState("")
    let [color, setColor] = React.useState("red")
    let [special, setSpecial] = React.useState(Math.random())

    if(init){
        axios({
            method:'get',
            url: `${apiUrl}/user/`,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',
        }).then(data=>{
            setUsername(data.data.username ? data.data.username : "")
            setEmail(data.data.email ? data.data.email : "")
            setFirstname(data.data.first_name ? data.data.first_name : "")
            setLastname(data.data.last_name ? data.data.last_name : "")
        })
        setInit(false)
    }
    function handleLoginChange(event){
        setUsername(event.target.value)
    }
    function handlePassword1Change(event){
        setPassword1(event.target.value)
    }
    function handlePassword2Change(event){
        setPassword2(event.target.value)
    }
    function handleFirstnameChange(event){
        setFirstname(event.target.value)
    }
    function handleLastnameChange(event){
        setLastname(event.target.value)
    }
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handleOldPasswordChange(event){
        setOldPassword(event.target.value)
    }
    async function submitLogin(event){
        event.preventDefault()
        axios({
            method:'post',
            url: `${apiUrl}/edit_user/`,
            data:{
                username: username,
                email: email,
                firstName: firstname,
                lastName: lastname,
                password1: password1,
                password2: password2,
                old_password: oldPassword
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
                setColor("#20ba20")
                setMessage(response.data.message)
                setPassword1("")
                setPassword2("")
                setOldPassword("")
            }
            else{
                setColor("#FF0000")
                setMessage(response.data.message)
            }
        })
    }

    let [logedin] = useGlobalState('login')

    async function loged(){
        await init()
        return logedin

    }

    if(!loged){
        return <Redirect exact to="/"/>
    }
    else{
        return (
            <>
                <Form className="account-form">
                    <Text font="30" fontWeight="700" pad="10px">TWOJE KONTO</Text>
                    <Input text="Login" type="text" name="login" setValue={setUsername} value={username ? username : ""} onChange={handleLoginChange}/>
                    <Input text="Imię" type="text" name="firstname" setValue={setFirstname} value={firstname ? firstname : ""} onChange={handleFirstnameChange}/>
                    <Input text="Nazwisko" type="text" name="lastname" setValue={setLastname} value={lastname ? lastname : ""} onChange={handleLastnameChange}/>
                    <Input text="E-mail" type="text" name="email" setValue={setEmail} value={email ? email : ""} onChange={handleEmailChange}/>
                    ------------------------------
                    <Input text="Nowe Hasło" type="password" name="password" setValue={setPassword1} value={password1 ? password1 : ""} onChange={handlePassword1Change}/>
                    <Input text="Powtórz Nowe Hasło" type="password" name="password" setValue={setPassword2} value={password2 ? password2 : ""} onChange={handlePassword2Change}/>
                    <Input text="Stare Hasło" type="password" name="password" setValue={setOldPassword} value={oldPassword ? oldPassword : ""} onChange={handleOldPasswordChange}/>
                    <span className="error">
                       <Message text={message} color={color} special={special}/>
                    </span>
                    <Button type="submit" onClick={submitLogin}>Zapisz</Button>
                </Form>
            </>
        )
    }

}