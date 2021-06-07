import React, {useState}  from 'react';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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


export default function AdvertismentsCard({productName, detail0, price}) {
    const classes = useStyles();


    return(
        <Card className={classes.root}>
        <CardActionArea>
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom component="h5" variant="body1">
                {productName}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="h2">
                {detail0}<br/>
            </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button
                variant="contained"
                className={classes.button}
                endIcon={<AddShoppingCartIcon />}
                color="secondary">
                { new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price) }
            </Button>
            </CardActions>
        </Card>
    );
}