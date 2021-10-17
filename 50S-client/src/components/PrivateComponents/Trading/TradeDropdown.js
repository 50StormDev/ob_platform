import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Grid, InputLabel, Select, Divider} from '@material-ui/core';

const useStyles = makeStyles({
    selection: {
        background: "#ffff",
        margin: "14px 0"
    }
});

export default function TradeDropdown(props){

    function handleChange(e){
        const { value } = e.target
        props.handlePair(value)
    }
    const classes = useStyles();    
    return (
        <div className={classes.selection}>
            <InputLabel id="demo-controlled-open-select-label">{props.title}</InputLabel>
            <Grid item xs={12}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Choose account
                </InputLabel>
                <Select
                fullWidth
                name="account"
                label="Select Strategy"
                required
                onChange={handleChange}
                formControlProps={{ fullWidth: true }}
                >
                {/* Polulate whith strategy name and id */}
                {props.items.currencies.map(item => 
                    <MenuItem value={item}>{item}</MenuItem>
                )}
                <Divider/>
                {props.items.commodities.map(item => 
                    <MenuItem value={item}>{item}</MenuItem>
                )
                }
                </Select>
            </Grid>
        </div>
    )
}