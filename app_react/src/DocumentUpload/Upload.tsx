import React, { ReactElement, useState} from "react";
import {uploadAction} from "./util"

export default function Upload() : ReactElement {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            uploadAction(selectedFile, selectedFile.name);
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div>
            <h1>Upload document</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} /> <br />
                <input type="submit" value="Upload" />
            </form>
        </div>
    );
}