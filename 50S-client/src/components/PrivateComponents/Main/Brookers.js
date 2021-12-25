import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountBrookers from './BrookerList';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Brookers() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Container maxWidth="lg" className={classes.container}>
            <AccountBrookers/>
      </Container>
    </React.Fragment>
  );
}