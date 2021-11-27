import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles({
footer: {
  position: 'fixed',
  left: 0,
  bottom: 0,
  textAlign: 'center',
  width: '100%',
  color: '#ffffffd4',
  margin: '2%'
}
});

export default function Copyright() {
  const classes = useStyles();
  return (
       <React.Fragment >
        <div className={classes.footer}>
          <Box pt={4}>
                <Typography variant="body2" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://material-ui.com/">
                            50 Storm Platform
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
          </Box> 
        </div>
            
       </React.Fragment>
    
  );
}