import React from 'react';
import Card from './Card';
import Container from '@material-ui/core/Container';
import PocketOption_img from '../../../img/Pocket.svg'
import HighLow_img from '../../../img/HighLow.svg'
import Quotex_img from '../../../img/Quotex.svg'
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
  }, 
  brooker_logo: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',

    background: '#2F3661',
    borderRadius: '45px',
  }
}));

export default function AccountBrookers(props) {
    const classes = useStyles();
   
    return (
        <React.Fragment>
            <Container className={classes.brookers}>
              <Card className={classes.brooker_logo} brooker_img= {PocketOption_img} brooker_name="PocketOption"/>
              <Card className={classes.brooker_logo} brooker_img= {HighLow_img} brooker_name="HighLow"/>
              <Card className={classes.brooker_logo} brooker_img= {Quotex_img} brooker_name="Quotex"/>
            </Container>
        </React.Fragment>
    )
}