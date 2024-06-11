import React, { ReactElement, SetStateAction } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import { SessionFileListFragProps } from "./utils";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

type SessionFileListProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  fileList: string[];
};

export default function SessionFileList({
  open,
  setOpen,
  fileList,
}: SessionFileListProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogContent>
          <SessionFileListFrag fileList={fileList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function SessionFileListFrag({
  fileList,
}: SessionFileListFragProps): ReactElement {
  return (
    <React.Fragment>
      <Title>Session file List</Title>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell>file name</TableCell>
              <TableCell>view AI summary</TableCell>
              <TableCell>download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList.map((fileName: string, index: number) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{fileName}</TableCell>
                  <TableCell>
                    <Link>AI insights</Link>
                  </TableCell>
                  <TableCell>
                    <Link>Download</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
