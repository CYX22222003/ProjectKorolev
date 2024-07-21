import { downloadFileFromBrowser } from "../utils/Document_Upload/documentManager"

export function downloadTranscription(script : string) {
    const newFile : Blob = new Blob([script], {
        type: "text/plain"
    })

    downloadFileFromBrowser(newFile);
}