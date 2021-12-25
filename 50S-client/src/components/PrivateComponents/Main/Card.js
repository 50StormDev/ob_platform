import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { changePath } from '../../../store/reducers/Account';
import { push } from 'connected-react-router';
import { setBrooker } from '../../../store/reducers/currentUser';


const useStyles = makeStyles({
  logo: {
    width: '240px',
    height: '240px',
    textAlign: 'center',
    background: '#3f43624f',
    borderRadius: '45px',
    border: '1px solid',
    borderColor: '#0000007d'
  },
  media: {
    height: '200px',
    width: '200px',
    margin: "8%",
  }
});

export default function BrookerCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  function chooseBrooker(){
    dispatch(changePath(props.brooker_name))
    dispatch(setBrooker(props.brooker_name))
    dispatch(push('/Trading'))
  }
  return (
    <Card className={classes.logo}>
      <CardActionArea  onClick={chooseBrooker}>
        <CardMedia
          className={classes.media}
          image={props.brooker_img}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
  );
}