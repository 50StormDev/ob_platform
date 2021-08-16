import React from 'react';
import { 
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


export default function AccountItem(props){
    return (
        <ListItem   
          onClick={() => alert("clicked")}
        >
          <ListItemText primary={props.name} />
            <ListItemIcon>
            <InfoIcon/> 
          </ListItemIcon>
          <ListItemIcon>
             <EditIcon/>
          </ListItemIcon>
          <ListItemIcon>
             <DeleteIcon/>
          </ListItemIcon>
        </ListItem>
    )
}