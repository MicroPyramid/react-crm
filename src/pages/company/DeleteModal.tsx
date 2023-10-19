import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    DialogContentText
} from '@mui/material'

export const DeleteModal = (props: any) => {
    const { onClose, open, modalDialog, modalTitle, id, DeleteItem } = props
    // const [deleteItem, setDeleteItem] = useState(false)

    // console.log(id, 'id')
    return (
        <Dialog
            onClose={() => onClose()}
            open={open}
        >
            <DialogTitle
                sx={{
                    padding: '15px',
                    width: '500px',
                    color: 'black'
                }}
            >{modalTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ fontSize: '14px' }}>
                    {modalDialog}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onClose()}
                    style={{ textTransform: 'capitalize' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => DeleteItem()}
                    style={{ textTransform: 'capitalize', backgroundColor: '#3E79F7', color: 'white', height: '30px' }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
