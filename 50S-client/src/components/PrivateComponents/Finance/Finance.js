import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import FinanceDeposit from './Finance-Deposit';
import FinanceWithdraw from './Finance-Withdraw';
import FinanceHistory from './Finance-History'

import {
  Box,
  AppBar,
  Typography,
  Container,
  Tabs,
  Tab
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    opacity:'1'
  },
  table:{
    backgroundColor:'#1b1f2f'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <AppBar className={classes.table} position="static">
            <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            >
            <LinkTab label="Deposit" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Withdraw" href="/trash" {...a11yProps(1)} />
            <LinkTab label="History" href="/spam" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <FinanceDeposit/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FinanceWithdraw/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <FinanceHistory/>
        </TabPanel>
      </Container>
    </React.Fragment>
        

  );
}
