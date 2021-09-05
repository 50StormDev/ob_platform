import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AccountItem from './AccountItem';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button, 
  Grid
  
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '100px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '3px'
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const profile = useSelector(state => state.profile)
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
    <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
            Accounts
        </Typography>
      <List component="nav" aria-label="main mailbox folders">
      {profile.data.accounts.map(item =>
        <React.Fragment>
          <AccountItem id={item._id} name={item.account_name} balance={item.balance}/>
          <Divider/>
        </React.Fragment>
        
        )
      }
        
        
      </List>
      <Grid item style={{ marginTop: 16 }}>
        <Button
            variant="contained"
            color="primary"
            type="submit"
        >
            Create Account
        </Button> 
      </Grid>
      
    </Paper>
    </div>
  );
}
