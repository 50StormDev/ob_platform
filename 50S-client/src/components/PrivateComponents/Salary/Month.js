import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
  Box,
  Paper,
  Typography,
  Grid
} from '@material-ui/core';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (

    <Grid>
        <Typography>March</Typography>
        <Box sx={{ flexGrow: 4 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={0.5}>
                <FormRow />
                </Grid>
                <Grid container item spacing={0.5}>
                <FormRow />
                </Grid>
                <Grid container item spacing={0.5}>
                <FormRow />
                </Grid>
                <Grid container item spacing={0.5}>
                <FormRow />
                </Grid>
            </Grid>
        </Box>
    </Grid>
    
  );
}