import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

export default function Copyright() {
  return (
       <React.Fragment>
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
       </React.Fragment>
    
  );
}