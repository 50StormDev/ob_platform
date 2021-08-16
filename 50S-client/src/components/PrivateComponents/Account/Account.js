import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import backImage from '../../../img/mountain1.jpg';
import Navbar from '../Navbar'
import Copyright from '../../Copyright';
import { useDispatch, useSelector } from 'react-redux';
import AccountForm from './AccountForm';
import AccountBrookers from './AccountBrookers';
import AccountList from './AccountList'

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
  }, 
  header_text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 'xxx-large',
    marginBottom: '60px'
  },
  brookers: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

export default function Account() {
  const classes = useStyles();

  const account = useSelector(state => state.account)


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            

            {account.path ==="" && <AccountBrookers/>}

            <AccountList/>
            <AccountForm/>
            <Copyright style={{color:"white"}}/>
        </Container>
      </main>
    </div>
  );
}