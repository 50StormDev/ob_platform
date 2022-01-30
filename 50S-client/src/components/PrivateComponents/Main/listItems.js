import React, { useEffect, useState, useRef }from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const useStyles = makeStyles({
  menu_link: {
    padding: '16px 16px'
  },
  icon: {
    color: "#6a7b94"
  }
});

function MainListItems() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const logoutClicked = useRef(false)
  const [access, setAccess] = useState(true)

  
  useEffect(()=> {
    if(logoutClicked.current) {
      localStorage.clear()
      dispatch(push("/SignInSide"))
    } else {
      logoutClicked.current = true
    }
  },[dispatch, access])
  return (
    <div>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Profile"))}>
          <ListItemIcon>
            <AccountCircleIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Dashboard"))}>
          <ListItemIcon>
            <DashboardIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Salary"))}>
          <ListItemIcon>
            <CalendarTodayIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Salary" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Salary"))}>
          <ListItemIcon>
            <LocalGroceryStoreIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Trading"))}>
          <ListItemIcon>
            <CandlestickChartIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Trading" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Finance"))}>
          <ListItemIcon>
            <MonetizationOnIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Finance" />
        </ListItem>
        <ListItem button className={classes.menu_link} onClick={()=> dispatch(push("/Account"))}>
          <ListItemIcon>
            <DonutSmallIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem> 
        <ListItem button className={classes.menu_link} onClick={() => setAccess(false)}>
          <ListItemIcon>
            <ExitToAppIcon className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Log Out"/>
        </ListItem>


    </div>
  )
}


export default MainListItems





