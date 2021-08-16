import React from 'react';
import Card from './Card';
import Container from '@material-ui/core/Container';
import PocketOption_img from '../../../img/pocketOption.png'
import HighLow_img from '../../../img/highLow.png'
import Quotex_img from '../../../img/quotex.png'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  header_text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 'xxx-large',
    marginBottom: '60px'
  },
  brookers: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

export default function AccountBrookers(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <h1 className={classes.header_text}>Account</h1>
            <Container className={classes.brookers}>
              <Card brooker_img= {PocketOption_img} brooker_name="PocketOption"/>
              <Card brooker_img= {HighLow_img} brooker_name="HighLow"/>
              <Card brooker_img= {Quotex_img} brooker_name="Quotex"/>
            </Container>
        </React.Fragment>
    )
}