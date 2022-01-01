import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import {useSelector } from 'react-redux';
import AccountForm from './AccountForm';
import AccountList from './AccountList'

const useStyles = makeStyles((theme) => ({
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
  // css
  const classes = useStyles();
  // get the account
  const account = useSelector(state => state.account)
  const currentUser = useSelector(state => state.currentUser)
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        {currentUser.brooker !=="" &&  <AccountList create={account.path}/>}
        {account.path === "create" && <AccountForm/>}
      </Container>
    </React.Fragment>
        

  );
}