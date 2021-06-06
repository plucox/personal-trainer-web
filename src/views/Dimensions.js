import React, {useEffect, useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Target from './Target';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import API from '../API';
import firebase from "firebase/app";
import { useHistory } from 'react-router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function Dimensions() {
  const classes = useStyles();
  const neckRef = useRef();
  const armRef = useRef();
  const forearmRef = useRef();
  const wristRef = useRef();
  const chestRef = useRef();
  const waistRef = useRef();
  const history = useHistory();
  const [target, setTarget] = React.useState("Maintenance");
  const [profileType, setProfileType] = useState();
  const [dimensions, setDimensions] = useState(null)

  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  let selectTarget = (
    <>
    <React.Fragment>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Target</InputLabel>
            <Select
                labelId="target"
                id="target"
                value={target ? target : " "}
                onChange={handleTargetChange}
            >
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Reduction">Reduction</MenuItem>
                <MenuItem value="Gain">Gain</MenuItem>
            </Select>
        </FormControl>
     </React.Fragment>
    </>
  )

  var user, uid;
  user = firebase.auth().currentUser;
  if (user!=null){
  uid = user.uid;
  }
  

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
  }, []);

  const sendValue = () => {
    API.post(profileType+'/dimensions?id='+uid, {
      "neck": neckRef.current.value,
      "arm": armRef.current.value,
      "forearm": forearmRef.current.value,
      "wrist": wristRef.current.value,
      "chest": chestRef.current.value,
      "waist": waistRef.current.value
    }).then(function(result){
        console.log(result);
        // history.push("/");
    })
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Set your dimensions
          </Typography>
          <React.Fragment>
              <React.Fragment>
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                    <TextField
                      id="neck"
                      name="neck"
                      label="Neck"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={neckRef}
                    />
                    </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="arm"
                      name="arm"
                      label="Arm"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={armRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="forearm"
                      name="forearm"
                      label="Forearm"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={forearmRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="wrist"
                      name="wrist"
                      label="Wrist"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={wristRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="chest"
                      name="chest"
                      label="Chest"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={chestRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="waist"
                      name="waist"
                      label="Waist"
                      type="number"
                      InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                      fullWidth
                      inputRef={waistRef}
                    />
                  </Grid>
                </Grid>
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