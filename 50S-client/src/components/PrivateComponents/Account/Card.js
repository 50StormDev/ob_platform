import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { changePath } from '../../../store/reducers/Account';


const useStyles = makeStyles({
  root: {
    width: "220px",
    textAlign: 'center'
    
  },
  media: {
    height: 140,
    margin: "15px",
    display: "block",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
});

export default function BrookerCard(props) {
  const classes = useStyles();
  const [brooker, setbrooker] = useState({
    brooker: ""
  })
  const dispatch = useDispatch();
  function chooseBrooker(){
    
    dispatch(changePath())
  }
  return (
    <Card className={classes.root}>
      <CardActionArea  onClick={chooseBrooker}>
        <CardMedia
          className={classes.media}
          image={props.brooker_img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.brooker_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}