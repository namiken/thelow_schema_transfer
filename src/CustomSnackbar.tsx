import { IconButton, Snackbar } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const CustomSnackbar = (props: {
  snackbarText: string | undefined;
  setSnackbarText: any;
  autoHideDuration?: number;
}) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          props.setSnackbarText(undefined);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={!!props.snackbarText}
      autoHideDuration={props.autoHideDuration ?? 3000}
      onClose={() => {
        props.setSnackbarText(undefined);
      }}
      message={props.snackbarText}
      action={action}
    />
  );
};
