import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    profit: {
        color: 'green'
    },
    loss: {
        color: 'red'
    }
});

export default function DayLimit(props) {
    const classes = useStyles();
    return(
        <Box component='div'>
            <Grid spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div className={classes.profit}>Profit ${props.profit}</div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div className={classes.loss}>Stop Loss: ${props.loss}</div>
                </Grid>
            </Grid>
            
        </Box>
            
    )
}