import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer} />
          <h1>{profile.totalBalance}</h1>
          <h1>{profile.totalProfit}</h1>
          <h1>{profile.total_loss}</h1>
          <h1>{profile.total_win}</h1>
      </Container>
    </React.Fragment>     
  );
}
