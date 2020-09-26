import React, { Component } from 'react'
import TwitterLogin from 'react-twitter-auth'
import axios from 'axios'
// eslint-disable-next-line
let API_ROOT, CLIENT_ROOT
if(process.env.NODE_ENV === "development"){
  API_ROOT = "http://127.0.0.1:3000"
  CLIENT_ROOT = "http://localhost:4000"
}else {
  API_ROOT = "https://animatch-nyan-api.herokuapp.com"
  CLIENT_ROOT = "https://animatch-nyan.herokuapp.com"
}

class App extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  componentDidMount() {
    console.log(API_ROOT, CLIENT_ROOT)
    if(localStorage.getItem('x-auth-token')) {
      axios.get(API_ROOT + '/api/v1/auth/me', {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token')
        }
      }).then(response => {
        console.log(response)
      })
    }
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    console.log(token)
    localStorage.setItem('x-auth-token', token);
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="https://animatch-nyan-api.herokuapp.com/api/v1/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="https://animatch-nyan-api.herokuapp.com/api/v1/auth/twitter/reverse"/>
      );
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;