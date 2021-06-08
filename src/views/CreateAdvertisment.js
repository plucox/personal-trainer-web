import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app";
import API from '../API';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import PayPal from '../PayPal/PayPal';
import SuccessPayment from '../PayPal/SuccessPayment';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
        width: 600,
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
      justifyContent: 'flex-start',
      float: 'left',
    },
    buttonpay: {
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

export default function CreateAdvertisment() {
  const classes = useStyles();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const history = useHistory();
  const [target, setTarget] = React.useState(1);
  const [payd, setPayd] = useState(false);
  var user, uid;
  user = firebase.auth().currentUser;
  if (user!=null){
  uid = user.uid;
  }
  const [profileType, setProfileType] = useState();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
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
  },[uid]);

  const sendValue = () => {
    if(priceRef.current.value>0){
    setCheckout(true);
    } else if (priceRef.current.value == 0) {
      API.post('mentee/advertisment?id='+uid, {
        "active": true,
        "price": priceRef.current.value,
        "description": descriptionRef.current.value,
        "dietGoals": target
      }).then(function(result){
          console.log(result);
          setPayd(true);
      })
    }
  };

  const backHandler = () => {
      history.push("/advertisments")
  }

  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Advertisment
          </Typography>
          <React.Fragment>
              <React.Fragment>
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid>
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
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        inputRef={priceRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        inputRef={descriptionRef}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
                <div className={classes.buttons}>
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={backHandler}
                  >
                    Back
                  </Button>
                </div>
                  {checkout ? 
                  (<PayPal price={priceRef.current.value} target={target} description={descriptionRef.current.value} uid={uid} /> ) : 
                  (<div className={classes.buttonpay}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={sendValue}
                  >
                    Pay
                  </Button>
                  </div>)}
                {payd? <SuccessPayment/> : ""}
              </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}