import React, { ReactElement, SetStateAction} from 'react'
import DocViewer, {DocViewerRenderers} from '@cyntler/react-doc-viewer'
import Dialog from '@mui/material/Dialog'
import { DialogActions, DialogContent } from '@mui/material'
import Button from '@mui/material/Button'
import "@cyntler/react-doc-viewer/dist/index.css";

export type Props = {
    fileuri : string
    open: boolean
    type : string
    setOpen : React.Dispatch<SetStateAction<boolean>>
}

export function DocxView({ fileuri, open, type, setOpen }: Props): ReactElement {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose = {() => setOpen(false)}
                fullScreen={true}
            >
                <DialogContent id='test'>
                    <DocViewer 
                        documents={[{
                            uri : fileuri,
                            fileType : type,
                            fileName : "preview"
                        }]}

                        pluginRenderers={DocViewerRenderers}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DocxView