import React, { useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    DialogContentText
} from '@mui/material'
import { fetchData, Header } from '../../components/FetchData'
import { LeadUrl } from '../../services/ApiUrls'

export const DialogModal = (props: any) => {
    const { onClose, open, modalDialog, modalTitle, id } = props

    useEffect(() => {


    }, [id])

    const deleteId = () => {
        fetchData(`${LeadUrl}/${id}/`, 'DELETE', null as any, Header)
            .then((res: any) => {
                console.log('delete:', res);
                if (!res.error) {
                }
                if (res.error) {

                }
            })
            .catch(() => {
            })
    }
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
                    onClick={deleteId}
                    style={{ textTransform: 'capitalize', backgroundColor: '#3E79F7', color: 'white', height: '30px' }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
