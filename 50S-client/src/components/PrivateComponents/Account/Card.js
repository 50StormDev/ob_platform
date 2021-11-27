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
  const [brooker, setbrooker] = useState({
    brooker: ""
  })
  const dispatch = useDispatch();
  function chooseBrooker(){
    
    dispatch(changePath(props.brooker_name))
  }
  return (
    <Card className={classes.logo}>
      <CardActionArea  onClick={chooseBrooker}>
        <CardMedia
          className={classes.media}
          image={props.brooker_img}
          title="Contemplative Reptile"
        />
        <svg>

        </svg>
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.brooker_name}
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}