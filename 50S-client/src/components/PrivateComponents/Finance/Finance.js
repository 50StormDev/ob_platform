import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import backImage from '../../../img/mountain1.jpg'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
import Copyright from '../../Copyright';
import FinanceDeposit from './Finance-Deposit';
import FinanceWithdraw from './Finance-Withdraw';
import FinanceHistory from './Finance-History'

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `url(${backImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: 'top',
    height:'100%',
    width: '100%'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    opacity:'1'
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
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <AppBar position="static">
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
            <Copyright />
        </Container>
      </main>
    </div>
  );
}
