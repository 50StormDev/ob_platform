import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  menu_link: {
    padding: '0'
  }
});

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export const mainListItems = (
  <div>
    <ListItemLink href="/Profile" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </ListItemLink>
    <ListItemLink href="/Dashboard" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </ListItemLink>
    <ListItemLink href="/Trading" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <TrendingUpIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Trading" />
      </ListItem>
    </ListItemLink>
    <ListItemLink href="/Finance" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Finance" />
      </ListItem>
    </ListItemLink>
    <ListItemLink href="/Account" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <DonutSmallIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </ListItemLink>
    <ListItemLink bottom href="/signInSide" style={{padding:'0'}}>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon style={{color:'#6a7b94'}}/>
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </ListItemLink>

  </div>
);

