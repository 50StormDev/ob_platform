import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changePath } from '../../../store/reducers/Account';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import backImage from '../../../img/mountain1.jpg';
import Trade from './Trade';
import Navbar from '../Navbar'
import Copyright from '../../Copyright';
import AccountBrookers from '../Account/AccountBrookers';


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

export default function Dashboard() {
  const classes = useStyles();
  const account = useSelector(state => state.account)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(changePath(""))
  // }, [dispatch])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            {account.path === "" && <AccountBrookers/>}
            {account.path !== "" && <Trade/>}
            <Copyright style={{color:"white"}}/>
        </Container>
      </main>
    </div>
  );
}
