import * as React from 'react';
import { useEffect, useState } from 'react';
import { atom, useAtom } from "jotai";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { showErrorAlertDialog } from '../config/AppConfig';
import Typography from '@mui/material/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowErrorAlertDialog = ({status, title, content}) => {
//export default function ShowErrorAlertDialog(status, title ,content) {
  const [open, setOpen] = useState(status);
  const [getDialogStatus, setErrorDialog] = useAtom(showErrorAlertDialog);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  
  useEffect(() => {
    setOpen(status);
  }, [status]);


  const handleClose = () => {
    setErrorDialog(false)
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  return (
    <React.Fragment>
    
      <Dialog
       fullWidth={fullWidth}
       maxWidth={maxWidth}
        open={open} onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> <Typography variant="h6" component="div" color="textPrimary" style={{ marginTop: 10 }}>
        {title}
      </Typography></DialogTitle>
        <DialogContent>
        <Typography variant="body1" component="div" color="textSecondary" style={{ marginTop: 10 }}>
        {content}
      </Typography>
          {/* <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ShowErrorAlertDialog;