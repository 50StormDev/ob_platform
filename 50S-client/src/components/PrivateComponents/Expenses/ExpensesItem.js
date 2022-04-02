import React from 'react';
import { useSelector } from 'react-redux';
import { 
    ListItemIcon,
    TableCell,
    TableRow
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { removeAccount, detailAccount } from '../../../store/reducers/Account';
import { unwrapResult } from '@reduxjs/toolkit';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';

export default function AccountItem(props){
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  function handleRemove(e){
    e.preventDefault();
    if(props.name !== "Personal Account"){
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
    } else {
      alert("You can't delete your Pesonal Account!")
    }
  }
  function handleDetail(e){
    e.preventDefault();
    dispatch(detailAccount({
      path:"http://localhost:5000/account",
      account_id: props.id
    }))
    .then(unwrapResult).then(res => {
      console.log(res.info)
      dispatch(removeError())
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })
  }
    return (
      <TableRow >
        <TableCell align="left">{props.name}</TableCell>
        <TableCell align="left">$ {props.balance}</TableCell>
        <TableCell align="right">
          <ListItemIcon>
            <EditIcon onClick={handleDetail}/>
          </ListItemIcon>
          <ListItemIcon>
            <DeleteIcon onClick={handleRemove}/>
          </ListItemIcon>
        </TableCell>
      </TableRow>
    )
}