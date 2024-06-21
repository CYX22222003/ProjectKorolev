import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//modified from sample elements in https://mui.com/material-ui/react-snackbar/

type ToastProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

export default function MySnackbar({ open, setOpen, message }: ToastProps) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="info" size="small" onClick={handleClose}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
