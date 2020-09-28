import React from "react";
import TwitterLogin from "react-twitter-auth";
import axios from "axios";
// eslint-disable-next-line
let API_ROOT, CLIENT_ROOT
if(process.env.NODE_ENV === "development"){
  API_ROOT = "http://127.0.0.1:3000"
  CLIENT_ROOT = "http://localhost:4000"
}else {
  API_ROOT = "https://animatch-nyan-api.herokuapp.com"
  CLIENT_ROOT = "https://animatch-nyan.herokuapp.com"
}
let setUser, setIsAuthenticated

const onSuccess = (response) => {
  const token = response.headers.get('x-auth-token');
  localStorage.setItem('x-auth-token', token);
  axios.get(API_ROOT + '/api/v1/users/me', {
    headers: {
      'x-auth-token': token
    }
  }).then(response => {
    if (response.data.user) {
      setIsAuthenticated(true)
    }
  })
};

const onFailed = (error) => {
  alert(error);
};

function TwitterButton(props){
  setUser = props.value.setUser
  setIsAuthenticated = props.value.setIsAuthenticated
  console.log("user:", props.value.user, props.value.isAuthenticated)
  return (
    <TwitterLogin loginUrl={API_ROOT+"/api/v1/auth/twitter"}
                  onFailure={onFailed} onSuccess={onSuccess}
                  requestTokenUrl={API_ROOT+"/api/v1/auth/twitter/reverse"}/>
  )
}

export default TwitterButton