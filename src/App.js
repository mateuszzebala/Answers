import './App.css'
import Menu from './Components/Menu/Menu'
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TaskComponent from "./Components/Task/TaskComponent";
import LoginForm from "./Components/Forms/LoginForm/LoginForm";
import RegisterForm from "./Components/Forms/RegisterForm/RegisterForm";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import LogoutForm from "./Components/Forms/LogoutForm/LogoutForm";
import {useGlobalState} from "./utils/globalState";
import init from './utils/init'
import Curtain from "./Components/Curtain/Curtain";
import AuthEmail from "./Components/AuthEmail/AuthEmail";
import Account from "./Components/Account/Account";
import News from "./Components/News/News";
import Message from "./Components/Message/Message";
import AddTaskForm from "./Components/Forms/AddTaskForm/AddTaskForm";
import Editor from "./Components/Editor/Editor";

init()

function App() {

    const [loaded] = useGlobalState('loaded')
    const [message] = useGlobalState('message')

    return (
        <Router>
            {loaded ? "" :  <Curtain/>}
            <Menu/>
            <div className="content">
                <Switch>
                    <Route exact path="/task/:id" component={TaskComponent}/>
                    <Route exact path="/auth_email/:code" component={AuthEmail}/>
                    <Route exact path="/logout" component={LogoutForm}/>
                    <Route exact path="/login" component={LoginForm}/>
                    <Route exact path="/register" component={RegisterForm}/>
                    <Route exact path="/account/" component={Account}/>
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/editor/:id" component={Editor}/>
                    <Route exact path="/add_task" component={AddTaskForm}/>
                    <Route exact path="/" component={Main}/>
                </Switch>
            </div>
            {message ? <Message text={message.text} color={message.color}/> : ""}
            <Footer/>
        </Router>
    )
}

export default App;
