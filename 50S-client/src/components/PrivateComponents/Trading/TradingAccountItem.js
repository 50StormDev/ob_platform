import React from 'react';
import { useSelector} from 'react-redux';
import { 
    ListItem,
    ListItemIcon,
    ListItemText, Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeAccount } from '../../../store/reducers/Account';
import { unwrapResult } from '@reduxjs/toolkit';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';
import Trade from './Trade';

export default function AccountItem(props){
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  function handleRemove(e){
    e.preventDefault();
    dispatch(removeAccount({
      path:"http://localhost:5000/account",
      profile_id: profile.data.id,
      account_id: props.id
    }))
    .then(unwrapResult).then(res => {
      dispatch(refreshAccount(res.list))
      dispatch(removeError())
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })
  }
    return (
        <ListItem>
          <ListItemText primary={props.name} />
          <ListItemText primary={props.balance}/>
          <ListItemIcon>
             <Button onClick={props.openTrade}variant="outlined">Trade</Button>
          </ListItemIcon>
        </ListItem>
    )
}