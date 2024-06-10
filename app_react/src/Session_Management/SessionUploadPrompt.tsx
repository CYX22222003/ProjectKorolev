import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Upload from "../utils/Document_Upload/Upload";
import { getLocalStorage } from "../utils/localStorageManager";

type SessionDocumentUploadFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientName: string;
  setPatientName: React.Dispatch<React.SetStateAction<string>>;
  sessionName: string;
  setSessionName: React.Dispatch<React.SetStateAction<string>>;
};

export function SessionUploadForm({
  open,
  setOpen,
  patientName,
  setPatientName,
  sessionName,
  setSessionName,
}: SessionDocumentUploadFormProps): ReactElement {
  const handleClose = () => {
    setOpen(false);
    setSessionName("");
    setPatientName("");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}
        fullScreen={true}
      >
        <DialogContent>
          <Upload
            containerName={`${getLocalStorage("PersonAIUsername", "")}/${patientName}/${sessionName}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
