import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SnackbarCustom = ({
  open,
  duration = 4000,
  handleClose,
  children,
  type = "success",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {children}
      </Alert>
    </Snackbar>
  );
};
