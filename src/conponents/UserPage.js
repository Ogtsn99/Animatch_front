import React from "react"
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert, AlertTitle } from '@material-ui/lab'
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";

// eslint-disable-next-line
let API_ROOT, CLIENT_ROOT
if(process.env.NODE_ENV === "development"){
  API_ROOT = "http://127.0.0.1:3000"
  CLIENT_ROOT = "http://localhost:4000"
}else {
  API_ROOT = "https://animatch-nyan-api.herokuapp.com"
  CLIENT_ROOT = "https://animatch-nyan.herokuapp.com"
}

function UserPage(props){
  const id = props.match.params.id
  const [isYou, setIsYou] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState(null)

  React.useEffect( ()=>{
    if(localStorage.getItem('x-auth-token')){
      axios.get(API_ROOT + '/api/v1/users/me', {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token')
        }
      }).then(response => {
        setIsYou(response.data.user.id.toString()===id)
      })
    }
  }, [])

  React.useEffect(()=>{
    axios.get(API_ROOT + '/api/v1/users/' + id, {
      headers: {
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    }).then(response =>{
      if(response.data.user === null){
        setUserInfo("Not Found")
      }else setUserInfo(response.data.user)
    }).catch(()=>{setUserInfo("Not Found")})
  }, [setUserInfo])

  if(userInfo === null){
    return (
      <CircularProgress color="secondary" />
    )
  }else if(userInfo === "Not Found"){
    return (
      <Alert severity="error">
        <AlertTitle>User Not Found</AlertTitle>
        ユーザーが見つかりませんでした。削除されたかURLが間違っている可能性があります。
      </Alert>
    )
  } else{
    return (
      <div>
        <Typography variant="h6" noWrap align='center'>
          <p>ユーザーページ</p>
          <p>名前: {userInfo.name}</p>
          <p>isYou: {isYou? "Yes": "No"}</p>
          <Box
            boxShadow={3}
            bgcolor="background.paper"
            m={1}
            p={1}
            style={{ width: '8rem', height: '5rem' }}
          >
          </Box>
        </Typography>
      </div>
    )
  }
}

export default UserPage

