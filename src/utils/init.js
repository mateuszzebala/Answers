import axios from "axios";
import {setGlobalState} from "./globalState";
import apiUrl from "../apiUrl";

async function init(){
    axios({
        method:'get',
        url: `${apiUrl}/user/`,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
        responseType: 'json',
    }).then(response=>{
        if(response.data.code === 200){
            setGlobalState('username', response.data.username)
            setGlobalState('login', true)
            if(response.data.is_superuser === true){
                setGlobalState('is_superuser', true)
            }else{
                setGlobalState('is_superuser', false)
            }
        }
        else{
            setGlobalState('login', false)
        }
    })
    axios({
        method:'get',
        url: `${apiUrl}/message/`,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
        responseType: 'json',
    }).then(response=>{
        if(response.data.code === 200){
            setGlobalState('message', response.data.message)
        }
    })
    setTimeout(
        ()=>{
            setGlobalState('loaded', 'true')
            document.body.style.overflow = "auto"
        },
        1000
    )
}

export default init