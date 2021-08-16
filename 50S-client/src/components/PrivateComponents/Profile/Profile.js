import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import backImage from '../../../img/mountain1.jpg';
import Navbar from '../Navbar'
import Copyright from '../../Copyright';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `url(${backImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: 'top',
    height:'100%',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();


  // State to be render at the page 
  const [profile, setProfile] = useState({
    totalBalance: null,
    totalProfit: null,
    total_loss: null,
    total_win: null
  });
  const currentProfile = useSelector((state) => state.profile)
  useEffect(() => {
    setProfile(currentProfile.data) 
  }, [dispatch])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <h1>{profile.totalBalance}</h1>
        <h1>{profile.totalProfit}</h1>
        <h1>{profile.total_loss}</h1>
        <h1>{profile.total_win}</h1>
        <Container maxWidth="lg" className={classes.container}>
            <Copyright />
        </Container>
      </main>
    </div>
  );
}
