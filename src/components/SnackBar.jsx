import React from 'react';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';

const SnackbarComponent = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();

  const displaySnackbar = () => {
    enqueueSnackbar(message, { variant });
  };

  // You can also add more customization options here,
  // such as duration, action buttons, etc.

  return (
    <div>
      {/* Component content, this could be a button or any other trigger */}
      <Button onClick={displaySnackbar}>Show Snackbar</Button>
    </div>
  );
};

export default SnackbarComponent;