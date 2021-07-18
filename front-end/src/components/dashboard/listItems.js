import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TrendingUpIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Trading" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MonetizationOnIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Finance" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DonutSmallIcon style={{color:'#6a7b94'}}/>
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItem>
  </div>
);

