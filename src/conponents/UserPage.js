import React from "react"
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert, AlertTitle } from '@material-ui/lab'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormDialog from "./FormDialog";

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
    axios.get(API_ROOT + '/api/v1/users/showInfo/' + id, {
      headers: {
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    }).then(response =>{
      if(response.data.user === null){
        setUserInfo("Not Found")
      }else {
        let userInfo = response.data.user.user_info
        userInfo.name = response.data.user.name
        console.log(userInfo)
        setUserInfo(userInfo)
      }
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
      <Container maxWidth="sm">
        <Typography variant="subtitle1">ユーザーページ</Typography>
        <Box my={3} textAlign="center">
          <Typography variant="body1">基本情報</Typography>
          <Box
            boxShadow={3}
            bgcolor="background.paper"
            m={1}
            p={1}
            style={{ width: 'auto', height: 'auto' }}
          >
            <Typography variant="body1">名前: {userInfo.name}</Typography>
            {userInfo.age && <Typography variant="body1">年齢: {userInfo.age}</Typography>}
            {userInfo.gender && <Typography variant="body1">性別: {userInfo.gender}</Typography>}
            {userInfo.twitter_id_str &&
            <Link href={"https://twitter.com/Ogtsn99"+userInfo.twitter_id_str} target="_blank">
              Twitter_id: {userInfo.twitter_id_str}
            </Link>}
          </Box>
          {isYou && <Typography variant="body1">isYou!</Typography>}
          <FormDialog formTitle="編集"
                      name={userInfo.name}
                      twitter_id={userInfo.twitter_id_str}
                      age={userInfo.age}
                      gender={userInfo.gender}
          />
        </ Box>
      </Container>
    )
  }
}

export default UserPage

