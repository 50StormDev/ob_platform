import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { changePath } from '../../../store/reducers/Account';
import Divider from '@material-ui/core/Divider';
import Trade from './Trade';
import TradingItem from './TradingAccountItem';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  List,
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
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const [trade, setTrade] = useState({status:false})
  
  function openTrade(){
    setTrade({status:true})
  }

  return (
    <div className={classes.root}>
    {trade.status === false ? <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
            Accounts
        </Typography>
      <List component="nav" aria-label="main mailbox folders">
      { profile.data.accounts.map(item =>
        <React.Fragment>
          <TradingItem openTrade={openTrade} id={item._id} name={item.account_name} balance={item.status}/>
          <Divider/>
        </React.Fragment>
        )
      }
      </List>  
    </Paper> : <Trade/>
    }
    </div>
  );
}

