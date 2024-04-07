import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const CustomProgressDialog = ({open, text }) => {
//const CustomProgressDialog = ({ open }) => {
  // State to manage the visibility of the dialog
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);


  // Function to handle closing the dialog
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogContent>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress />
      <Typography variant="body1" component="div" color="textSecondary" style={{ marginTop: 10 }}>
        {text}
      </Typography>
    </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomProgressDialog;