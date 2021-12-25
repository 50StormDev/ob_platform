import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import clsx from 'clsx';
import Menu from './listItems';
import { makeStyles } from '@material-ui/core/styles';
import PocketOption_img from '../../../img/Pocket.svg'
import HighLow_img from '../../../img/HighLow.svg'
import Quotex_img from '../../../img/Quotex.svg'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton, 
  Badge,
  Typography
} from '@material-ui/core'

var moment = require('moment')

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#1b1f2f'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#1b1f2f',
    color: '#fff'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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
  fixedHeight: {
    height: 190,
  },
  brooker: {
    height: "2em",
    width: "2em"
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const notification = currentUser.notification
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [clockState, setClockState] = useState({now:"", ends: moment(new Date()).add(30, 'm')});
  useEffect(() => {
    setInterval(() => {
      var now = moment(new Date()); //todays date
      var end = clockState.ends;
      var duration = moment.duration(end.diff(now));
        setClockState(prev => {
          return {
            ...prev,
            now: `${duration._data.hours}:${duration._data.minutes}:${duration._data.seconds}`
          }
        })
    }, 1000)
  }, [])  

  const brooker = () => {
    switch (currentUser.brooker) {
      case "PocketOption":
        return PocketOption_img
      case "HighLow":
        return HighLow_img
      case "Quotex":
        return Quotex_img
      default:
        break;
    }
  }

  return (
    <React.Fragment>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            50 Storm Platform
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {clockState.now}
          </Typography>
          <IconButton onClick={()=> dispatch(push("/Main"))}>
            <img className={classes.brooker} alt={currentUser.brooker} src={brooker()}/>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={notification.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{color:'white'}}/>
          </IconButton>
        </div>
        <Divider />
        <List>
          <Menu/>
        </List>
        <Divider />
      </Drawer>
    </React.Fragment>
  );
}
