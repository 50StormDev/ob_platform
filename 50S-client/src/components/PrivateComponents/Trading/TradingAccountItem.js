import React from 'react';
import { useSelector} from 'react-redux';
import { 
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
     Button
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
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead style={{backgroundColor: "#1b1f2f"}}>
            <TableRow>
              <TableCell  style={{color: "#fff"}}>Account</TableCell>
              <TableCell align="left" style={{color: "#fff"}}>Status</TableCell>
              <TableCell align="left" style={{color: "#fff"}}>Progress</TableCell>
              <TableCell align="left" style={{color: "#fff"}}>Trade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.profile.map((item) => (
              <TableRow >
                <TableCell align="left">{item.account_name}</TableCell>
                <TableCell align="left">Incomplete</TableCell>
                <TableCell align="left">20%</TableCell>
                <TableCell align="left"><Button onClick={props.openTrade}variant="outlined">Trade</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
