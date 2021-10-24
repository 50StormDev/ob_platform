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
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.profit}>Profit ${props.profit}</h3>
                </Grid>
                <Grid item xs={6} sm={6} >
                    <h3 className={classes.loss}>Stop: ${props.loss}</h3>
                </Grid>
            </Grid>
            
        </Box>
            
    )
}