import React, {useState}  from 'react';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AcceptMentee from './AcceptMentee';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1200,
      boxShadow: theme.shadows[1],
      '&:hover': {
        boxShadow: theme.shadows[6],
      },
    },
    button: {
      marginLeft: 'auto !important',
    },
    cardContent: {
      minHeight: 55,
    }
}));



export default function AdvertismentsCard({id, productName, detail0, price, profileType}) {
    const classes = useStyles();
    const [target, value] = useState(false);
    let popWindow = (
      <>
        <AcceptMentee id={id} productName={productName} detail0={detail0} price={price} profileType={profileType}/>
      </>
    )

    const advertButtonHandler = () => {
      if(profileType === "trainer")
      value(true);
    };

    return(
        <Card className={classes.root}>
        <CardActionArea>
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom component="h6" variant="body1" >
            {<EmojiPeopleIcon />} {productName}
            </Typography>
            <Typography variant="caption" component="h2">
                Description: {detail0}<br/>
            </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button
              variant="contained"
              className={classes.button}
              endIcon={<AddShoppingCartIcon />}
              color="secondary"
              onClick={advertButtonHandler}>
              { new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price) }
            </Button>
            </CardActions>
            {target?popWindow : ""}
        </Card>
    );
}