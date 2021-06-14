import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from "react-router-dom";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import  {makeStyles} from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import API from '../API';
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  dialog: {
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    float: 'right',
  },

}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function AcceptMentee({id, productName, detail0, price, profileType}) {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

    var user, uid;
    user = firebase.auth().currentUser;
    if (user!=null){
    uid = user.uid;
    }

  const sendValue = () => {
    API.patch(profileType+'/advertisment?ida='+id+'&idt='+uid)
    .then(function(result){
        console.log(result);
        history.push("/");
    })
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialog} >
            Accept mentee's advert
        </DialogTitle>
        <DialogContent dividers>
        <Alert severity="success">
        <AlertTitle><strong>{productName}</strong></AlertTitle>
        Description: {detail0}<br/>
        The price is <strong>{price}</strong><br/>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={sendValue}
        >
        Accept
        </Button>
        </Alert>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AcceptMentee