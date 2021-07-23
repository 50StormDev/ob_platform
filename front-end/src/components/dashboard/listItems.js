import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { positions } from '@material-ui/system';

const useStyles = makeStyles({
  link: {
    padding: '0'
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
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
    
    <ListItem button>
      <ListItemIcon>
        <DonutSmallIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItem>
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

