import React from "react";
import Typography from "@material-ui/core/Typography";

function Home(){
  return (
    <Typography variant="h6" noWrap>
      <h1 style={{fontSize: "52px", margin: "0 auto"}}>AniProf(仮)</h1>
      <p>Twitterでログインして、アニメオタクとしてのプロフィールをかけるサイト</p>
      <p>お気に入りや視聴中のアニメを登録したり、感想を投稿することも可能!(予定)</p>
    </Typography>
  )
}

export default Home

