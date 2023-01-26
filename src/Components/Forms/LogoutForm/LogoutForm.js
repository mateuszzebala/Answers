import React, {Component} from "react";
import axios from "axios";
import {createBrowserHistory} from "history";
import {Redirect} from "react-router-dom";
import {setGlobalState} from "../../../utils/globalState";
import apiUrl from "../../../apiUrl";


class LogoutForm extends Component {
   constructor() {
      super();
      this.history = createBrowserHistory()
   }
   componentDidMount() {
      axios({
          method:'get',
          url: `${apiUrl}/logout/`,
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
          withCredentials: true,
          responseType: 'json',
      }).then(()=>{
          setGlobalState('login', false)
          setGlobalState('username', null)
          setGlobalState('is_superuser', false)
      })
   }
   render(){
      return (
          <>
            <Redirect to="/"/>
          </>
      )
   }
}

export default LogoutForm