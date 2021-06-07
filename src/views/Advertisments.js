import React, {useState, useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    const [advertismentList, setAdvertismentList] = useState(
        [{
            "_id": "60b604184b470713f2764bdc",
            "active": true,
            "price": 1200.0,
            "description": "",
            "dietGoals": 1
        }]
    );


    useEffect(() =>{
        API.get('mentee/advertisment/all?idg='+target).then(function(result){
            setAdvertismentList(result.data);
        }).catch(() => {
            console.error("There are no ads with the given id");
          });
    },[target]);

    const handleTargetChange = (event) => {
      setTarget(event.target.value);
    };

    var user, uid;
    user = firebase.auth().currentUser;
    if (user!=null){
    uid = user.uid;
    }


    const sendValue = () => {
        // API.post(profileType+'/dimensions?id='+uid, {
        // //   "neck": neckRef.current.value,
        // //   "arm": armRef.current.value,
        // //   "forearm": forearmRef.current.value,
        // //   "wrist": wristRef.current.value,
        // //   "chest": chestRef.current.value,
        // //   "waist": waistRef.current.value
        // }).then(function(result){
        //     console.log(result);
        //     // history.push("/");
        // })
        console.log(advertismentList[0].email);


      };

    return (
    
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
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
                    {advertismentList.map(({price, description},index) => (
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item key={index} xs={12}>
                                <AdvertismentsCard
                                productName={ "nazwa" }
                                price={Number(price).toFixed(2)}
                                detail0={description}
                                />
                            </Grid>
                        </Grid>
                    ))}
                {/* {profileType==="mentee" ? selectTarget : ''} */}
                <div className={classes.buttons}>
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={sendValue}
                    >
                    Save
                    </Button>
                </div>
                </React.Fragment>
        </React.Fragment>
        </React.Fragment>
    </Paper>
    </main>
    </React.Fragment>
    );
}