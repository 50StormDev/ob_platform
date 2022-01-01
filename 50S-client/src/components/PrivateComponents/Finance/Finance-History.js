import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../../../store/reducers/Account';
import { unwrapResult } from '@reduxjs/toolkit';
import { addError, removeError } from '../../../store/reducers/error';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'action', label: 'Deposit / Withdraw', minWidth: 170 },
  { id: 'account', label: 'Account', minWidth: 100 },
  { id: 'amount',  label: 'Amount',  minWidth: 170,  align: 'center'}
];

function createData(date, action, account, coin_amount) {
    let amount
    if(action === "Withdraw"){
        amount = '- $' + coin_amount;
    } else {
        amount = '$' + coin_amount;
    }
  return { date, action, account, amount};
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableHead: {
    backgroundColor: '#747892',
    color: 'white'
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const [linha, setLinha] = React.useState({history:[]})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = []
  useEffect(() => {
    dispatch(getHistory({
      path:"http://localhost:5000/account",
      profile_id: profile.data.id,
    }))
    .then(unwrapResult).then(res => {
      res.history.map(item => rows.push(createData(item.transaction_day, item.transaction_action, item.transaction_account, item.transaction_ammount)))
      setLinha({history: rows})
      dispatch(removeError())
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getAccount(id){
    console.log(id)
    let account = profile.data.accounts.filter(item => item._id === id)
    console.log(account)
    return account[0].account_name
  }

  return (
    <React.Fragment> 
        <Paper className={classes.root}>
        <br/>
        <h1 style={{margin:'0 25px 25px'}}>History</h1>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tableHead}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {linha.history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column} align={column.align}>
                        {column.id === "account" ? getAccount(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </React.Fragment>
  );
}