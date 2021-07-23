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

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'action', label: 'Deposit / Withdraw', minWidth: 170 },
  { id: 'account', label: 'Account', minWidth: 100 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
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

const rows = [
  createData('20/7/2021', 'Deposit', 1324171354, 1000),
  createData('21/7/2021', 'Withdraw', 1324171354, 300),
  createData('20/7/2021', 'Deposit', 1324171354, 5000),
  createData('20/7/2021', 'Deposit', 1324171354, 6000),
  createData('20/7/2021', 'Deposit', 1324171354, 3000),
  createData('20/7/2021', 'Deposit', 1324171354, 1000),
  createData('21/7/2021', 'Withdraw', 1324171354, 2300),
  createData('21/7/2021', 'Withdraw', 1324171354, 500),
  createData('21/7/2021', 'Withdraw', 1324171354, 600),
  createData('21/7/2021', 'Withdraw', 1324171354, 3000),
  
];

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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