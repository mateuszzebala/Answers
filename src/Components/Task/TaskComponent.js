import Task from "./Task";
import {useEffect, useState} from "react";
import {useGlobalState} from "../../utils/globalState";
export default function TaskComponent(props){
    let [id, setId] = useState(props.match.params.id)
    useEffect(()=>{
        setId(props.match.params.id)
    }, [props.match.params.id])
    let [is_superuser] = useGlobalState("is_superuser")
    return (
        <>
            <Task id={id} setId={setId} admin={is_superuser}/>
        </>
    )
}