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
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
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
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function SetProfile() {
  const classes = useStyles();
  const firstNameRef = useRef();
  const surNameRef = useRef();
  const ageRef = useRef();
  const bioRef = useRef();
  const history = useHistory();
  var user, uid;
  user = firebase.auth().currentUser;
  if (user!=null){
  uid = user.uid;
  }
  const [profileType, setProfileType] = useState();

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
  });

  const sendValue = () => {
    API.post(profileType+'/profile?id='+uid, {
      "firstname": firstNameRef.current.value,
      "surname": surNameRef.current.value,
      "age": ageRef.current.value,
      "bio": bioRef.current.value
    }).then(function(result){
        console.log(result);
        history.push("/");
    })
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Profile details
          </Typography>
          <React.Fragment>
              <React.Fragment>
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Set Profile
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        inputRef={firstNameRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="surname"
                        name="surname"
                        label="Surname"
                        fullWidth
                        autoComplete="family-name"
                        inputRef={surNameRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        fullWidth
                        inputRef={ageRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextField
                        id="bio"
                        name="bio"
                        label="Enter your bio"
                        fullWidth
                        inputRef={bioRef}
                      />
                    </Grid>
                  </Grid>
                  </React.Fragment>
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
        </Paper>
      </main>
    </React.Fragment>
  );
}