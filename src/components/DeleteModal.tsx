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
                    fontSize: '18px',
                    padding: '15px',
                    width: '420px',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >{modalTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{
                    fontSize: '16px', ml: -1, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
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
