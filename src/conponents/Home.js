import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

function Home(props){
  return (
    <Container maxWidth="md">
      <Box my={3} textAlign="center">
        <Typography variant="h1" style={{fontSize:52}} gutterBottom>Animatch(仮)</Typography>
        <Typography variant="body1">アニメオタクとしてのプロフィールをかけるサイト。(工事中)</Typography>
        <Typography variant="body1">お気に入りや視聴中のアニメを登録したり、感想を投稿することも可能!(予定)</Typography>
        <Typography variant="body1">{props.value}</Typography>
      </ Box>
    </Container>
  )
}

export default Home

