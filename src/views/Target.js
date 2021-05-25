import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Target() {
    const classes = useStyles();
    const [target, setTarget] = React.useState("Maintenance");
    const handleTargetChange = (event) => {
      setTarget(event.target.value);
    };

    return (
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
    );
}