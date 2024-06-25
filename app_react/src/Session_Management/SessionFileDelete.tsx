import React, { SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import { deleteBlob } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";
import MySnackbar from "../Components/SnackBar";

type deleteButtonProps = {
  setFileList: React.Dispatch<SetStateAction<string[]>>;
  fileList: string[];
  fileName: string;
};

export function FileDeleteButton({
  setFileList,
  fileList,
  fileName,
}: deleteButtonProps) {
  const username = getLocalStorage("PersonAIUsername", "");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        onClick={async () => {
          await deleteBlob(username, fileName)
            .then((data: any) => setOpen(true))
            .then((data: any) => {
              const new_fileList = fileList.filter(
                (ele: string) => ele !== fileName,
              );
              setFileList(new_fileList);
            });
        }}
        color="warning"
      >
        Delete File
      </Button>
      <MySnackbar
        open={open}
        setOpen={setOpen}
        message={`${fileName} is deleted`}
      />
    </React.Fragment>
  );
}
