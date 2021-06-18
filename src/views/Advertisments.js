import React, {useState, useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import API from '../API';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
import { useHistory } from 'react-router';
import AdvertismentsCard from './AdvertismentsCard';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Advertisments() {
    const classes = useStyles();
    const [target, setTarget] = React.useState(1);
    const [profileType, setProfileType] = useState();
    const [menteeHaveAdv, setMenteeHaveAdv] = useState(false);
    const history = useHistory();
    const [advertismentList, setAdvertismentList] = useState(
        [{
            "_id": "60b604184b470713f2764bdc",
            "active": true,
            "price": 1200.0,
            "description": "",
            "dietGoals": 1
        }]
    );

    const [menteeAdvertismentList, setMenteeAdvertismentList] = useState({
    "_id": "60b604184b470713f2764bdc",
    "active": true,
    "price": 1200.0,
    "description": "",
    "dietGoals": 1
    });

    var user, uid;
    user = firebase.auth().currentUser;
    if (user!=null){
    uid = user.uid;
    }

    const advertButtonHandler = () => {
        history.push("/createadvertisment");
    }

    let createAdvButton = (
        <>
        <div className={classes.buttons}>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={advertButtonHandler}
            >
            Create Advertisment
            </Button>
        </div>
        </>
    )

    useEffect(() =>{
        API.get('mentee/advertisment/all?idg='+target).then(function(result){
            setAdvertismentList(result.data);
        }).catch(() => {
            console.error("There are no ads with the given id");
          });
        
        API.get('mentee/advertisment?id='+uid).then(function(res){
            setMenteeAdvertismentList(res.data);
            setMenteeHaveAdv(true);
        }).catch(() => {
            console.error("There are no ads with the given mentee id");
            setMenteeHaveAdv(false);
          });

        var status;
        API.get('trainer/profile?id='+uid).then(function(result){
        status=result.status;
        if(status === 200){
        setProfileType("trainer");
        }
        }).catch(() => {
        console.error("didn't detect profile as trainer");
        });

        API.get('mentee/profile?id='+uid).then(function(result){
        status=result.status;
        if(status === 200){
        setProfileType("mentee");
        }
        }).catch(() => {
        console.error("didn't detect profile as mentee");
        });
    },[target]);

    const handleTargetChange = (event) => {
      setTarget(event.target.value);
    };

    return (
    
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      {menteeHaveAdv ? (
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
        My advertisment
        </Typography>
        <React.Fragment>
            <React.Fragment>
                <React.Fragment>
                    <br/>
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item key={1} xs={12}>
                                <AdvertismentsCard
                                productName={menteeAdvertismentList.dietGoals===1 ? "Maintenance" : menteeAdvertismentList.dietGoals===2 ? "Reduction" : "Gain"}
                                id={menteeAdvertismentList._id}
                                price={Number(menteeAdvertismentList.price).toFixed(2)}
                                detail0={menteeAdvertismentList.description}
                                profileType={profileType}
                                />
                            </Grid>
                        </Grid>
                {/* Remember to change profiletype to mentee */}
                {/* {profileType==="mentee" ? createAdvButton : ''} */}
                </React.Fragment>
        </React.Fragment>
        </React.Fragment>
    </Paper>
      ) : ""}
    


    <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
        List of Advertisments
        </Typography>
        <React.Fragment>
            <React.Fragment>
                <React.Fragment>
                    <Grid container spacing={3}>
                        <React.Fragment>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Target</InputLabel>
                                <Select
                                    labelId="target"
                                    id="target"
                                    value={target ? target : " "}
                                    onChange={handleTargetChange}
                                >
                                    <MenuItem value={1}>Maintenance</MenuItem>
                                    <MenuItem value={2}>Reduction</MenuItem>
                                    <MenuItem value={3}>Gain</MenuItem>
                                </Select>
                            </FormControl>
                        </React.Fragment>
                    </Grid>
                    <br/>
                    {advertismentList.map(({_id,price, description},index) => (
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item key={index} xs={12}>
                                <AdvertismentsCard
                                productName={target===1 ? "Maintenance" : target===2 ? "Reduction" : "Gain"}
                                id={_id}
                                price={Number(price).toFixed(2)}
                                detail0={description}
                                profileType={profileType}
                                />
                            </Grid>
                        </Grid>
                    ))}
                {/* Remember to change profiletype to mentee */}
                {profileType==="mentee" ? createAdvButton : ''}
                </React.Fragment>
        </React.Fragment>
        </React.Fragment>
    </Paper>
    
    </main>
    </React.Fragment>
    );
}