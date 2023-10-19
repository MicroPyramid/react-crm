import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from '@mui/material'

export const DialogModal = (props: any) => {
  const { onClose, isDelete, modalDialog } = props
  return (
    <Dialog
      onClose={() => onClose()}
      open={isDelete}
    >
      <DialogTitle
        sx={{
          padding: '15px',
          width: '500px',
          color: 'black'
        }}
      >{modalDialog}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: '14px' }}>
          {/* {props.lead.title} */}
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
          // onClick={() => props.onDelete(props.lead.id)}
          style={{ textTransform: 'capitalize', backgroundColor: '#3E79F7', color: 'white', height: '30px' }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
