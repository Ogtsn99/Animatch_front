import React from 'react'
import axios from 'axios'
import Footer from "./Footer";
import PersistentDrawer from "./conponents/PersistentDrawer";

// eslint-disable-next-line
let API_ROOT, CLIENT_ROOT
if(process.env.NODE_ENV === "development"){
  API_ROOT = "http://127.0.0.1:3000"
  CLIENT_ROOT = "http://localhost:4000"
}else {
  API_ROOT = "https://animatch-nyan-api.herokuapp.com"
  CLIENT_ROOT = "https://animatch-nyan.herokuapp.com"
}

function App(){
  const [user, setUser] = React.useState(null)
  React.useEffect(()=>{
    if(localStorage.getItem('x-auth-token')){
      axios.get(API_ROOT + '/api/v1/users/me', {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token')
        }
      }).then(response => setUser(response.data.user))
    }
  }, [setUser])
  return (
    <div>
      <PersistentDrawer value={{
        user: user,
        setUser: setUser
      }}/>
      <Footer />
    </div>
  )
}

export default App;