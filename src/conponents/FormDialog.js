import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress'

// eslint-disable-next-line
let API_ROOT, CLIENT_ROOT
if(process.env.NODE_ENV === "development"){
  API_ROOT = "http://127.0.0.1:3000"
  CLIENT_ROOT = "http://localhost:4000"
}else {
  API_ROOT = "https://animatch-nyan-api.herokuapp.com"
  CLIENT_ROOT = "https://animatch-nyan.herokuapp.com"
}

function FormDialog(props){
  const id = props.id
  const setUserInfo = props.setUserInfo
  const API_ROOT = props.API_ROOT
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(props.name)
  const [age, setAge] = React.useState(props.age || "")
  const [twitter_id, setTwitter_Id] = React.useState(props.twitter_id)
  const [gender, setGender] = React.useState(props.gender || "")
  const [profile, setProfile] = React.useState(props.profile || "")
  const token = localStorage.getItem('x-auth-token')
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        編集
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">基本情報の設定</DialogTitle>
        <DialogContent>
          {/* Name */}
          <TextField
            margin="dense"
            value={name}
            id="name"
            label="name"
            type="text"
            onChange={(e) => {
              if(e.target.value.length <= 25)
              setName(e.target.value)
            }}
            fullWidth
          />
          {/* Age */}
          <TextField
            margin="dense"
            value={age.toString()}
            id="age"
            label="age"
            type="text"
            onChange={(e) => {
              if(e.target.value === "") setAge("")
              if(parseInt(e.target.value) <= 117)
              setAge(parseInt(e.target.value))
            }}
          />
          {/* Gender */}
          <TextField
            margin="dense"
            value={gender}
            id="gender"
            label="gender"
            type="text"
            onChange={(e) => {
              if(e.target.value.length <= 15) setGender((e.target.value))
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            value={twitter_id}
            id="twitter_id"
            label="twitter_id"
            type="text"
            onChange={(e) => {
              if(e.target.value.length <= 20) setTwitter_Id((e.target.value))
            }}
            fullWidth
          />
          <TextField
            value={profile}
            id="profile"
            label="profile"
            type="text"
            multiline
            rows={20}
            onChange={(e) => {
              if(e.target.value.length <= 520) setProfile((e.target.value))
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          {loading?
            <CircularProgress />
            :
            <Button onClick={async ()=>{
              setLoading(true)
              await axios.put(API_ROOT + '/api/v1/users/edit/name/' + id.toString(),
                {name: name},
                {
                  headers: {
                    'x-auth-token': token
                  }
                }).catch((res)=>{console.log(res.error)})

              await axios.put(API_ROOT + '/api/v1/users/edit/age/' + id.toString(),
                {age: age},
                {
                  headers: {
                    'x-auth-token': token
                  }
                }).catch((res)=>{console.log(res.error)})

              await axios.put(API_ROOT + '/api/v1/users/edit/gender/' + id.toString(),
                {gender: gender},
                {
                  headers: {
                    'x-auth-token': token
                  }
                }).catch((res)=>{console.log(res.error)})

              await axios.put(API_ROOT + '/api/v1/users/edit/twitter_id/' + id.toString(),
                {twitterIdStr: twitter_id},
                {
                  headers: {
                    'x-auth-token': token
                  }
                }).catch((res)=>{console.log(res.error)})

              await axios.put(API_ROOT + '/api/v1/users/edit/profile/' + id.toString(),
                {profile: profile},
                {
                  headers: {
                    'x-auth-token': token
                  }
                }).catch((res)=>{console.log(res.error)})

              axios.get(API_ROOT + '/api/v1/users/showInfo/' + id, {
                headers: {
                  'x-auth-token': token
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
              handleClose()
              setLoading(false)
            }
            } color="primary">
              登録
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog