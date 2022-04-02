import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { changePath } from '../../../store/reducers/Account';
import Divider from '@material-ui/core/Divider';
import ExpensesItem from './ExpensesItem';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  List,
  Grid
  
} from '@material-ui/core';
import { 
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '100px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '3px'
  },
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function handleGoBack(){
    dispatch(changePath(""))
  }

  function handleCreate(){
    dispatch(changePath("create"))
  }

  return (
    <div className={classes.root}>
    <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
            Expenses
        </Typography>
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead style={{backgroundColor: "#1b1f2f"}}>
            <TableRow>
              <TableCell  style={{color: "#fff"}}>Thing</TableCell>
              <TableCell align="left" style={{color: "#fff"}}>Price</TableCell>
              <TableCell align="right" style={{color: "#fff"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <ExpensesItem name="aluguel" balance="35.000"/>
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
    </div>
  );
}