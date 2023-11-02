import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    DialogContentText
} from '@mui/material'
import { fetchData } from '../../components/FetchData'
import { ContactUrl } from '../../services/ApiUrls'

export const DialogModal = (props: any) => {
    const { onClose, open, modalDialog, modalTitle, id, DeleteItem } = props
    const [deleteItem, setDeleteItem] = useState(false)

    // useEffect(() => {
    //     if (deleteItem) {
    //         onClose(deleteItem)
    //     }
    // }, [deleteItem])

    // const deleteId = () => {
    //     fetchData(`${ContactUrl}/${id}/`, 'DELETE', null as any, Header)
    //         .then((res: any) => {
    //             console.log('delete:', res);
    //             if (!res.error) {
    //                 onClose(res?.message)
    //             }
    //             if (res.error) {

    //             }
    //         })
    //         .catch(() => {
    //         })
    // }
    console.log(id, 'id')
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
                    onClick={()=>DeleteItem()}
                    style={{ textTransform: 'capitalize', backgroundColor: '#3E79F7', color: 'white', height: '30px' }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
