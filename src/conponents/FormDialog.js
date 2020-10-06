import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"

function FormDialog(props){

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(props.name)
  const [age, setAge] = React.useState(props.age || "")
  const [twitter_id, setTwitter_Id] = React.useState(props.twitter_id)
  const [gender, setGender] = React.useState(props.gender || "")

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
            fullWidth
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={()=>{
            console.log("Clicked! ")
            console.log("name: ", name)
            console.log("Age: ", age)
            console.log("Gender: ", gender)
            console.log("twitter_id: ", twitter_id)
            handleClose()}
          } color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog