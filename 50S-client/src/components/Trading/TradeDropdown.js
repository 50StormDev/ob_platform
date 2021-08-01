import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    selection: {
        background: "#d8d8d8",
        margin: "14px 0"
    }
});



export default function TradeDropdown(props){
    const classes = useStyles();    
    

    return (
        <div className={classes.selection}>
            <InputLabel id="demo-controlled-open-select-label">{props.title}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                fullWidth
                id="demo-controlled-open-select"
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                // value={age}
                // onChange={handleChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem></MenuItem>
            </Select>
        </div>
    )
}