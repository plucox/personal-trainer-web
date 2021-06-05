import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Target from './Target';
import InputAdornment from '@material-ui/core/InputAdornment';


export default function ProfileDetails() {
  // const [state, setState] = React.useState({
  //   mentee: false,
  //   trainer: true,
  // });

  // const [result, value] = React.useState(
  //     <Target />
  //   );
  
  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  //   if(state.mentee === true) {
  //     value(
  //       <Target />
  //     )
  //   } else {
  //     value()
  //   }
  // };
  

  return (
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
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            id="bio"
            name="bio"
            label="Enter your bio"
            fullWidth
          />
        </Grid>
      </Grid>
      {/* <br/>
        <Typography variant="h6" gutterBottom>
          Choose your profile type
        </Typography>
      <Grid container spacing={3}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Mentee</Grid>
          <Grid item >
            <Switch 
              checked={state.mentee}
              onChange={handleChange}
              name="mentee"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item>Trainer</Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          {result}
        </Grid>
      </Grid>
      <br/>
        <Typography variant="h6" gutterBottom sm={12}>
          Set your dimensions
        </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="neck"
            name="neck"
            label="Neck"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="arm"
            name="arm"
            label="Arm"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="forearm"
            name="forearm"
            label="Forearm"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="wrist"
            name="wrist"
            label="Wrist"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="chest"
            name="chest"
            label="Chest"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="waist"
            name="waist"
            label="Waist"
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
            fullWidth
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}