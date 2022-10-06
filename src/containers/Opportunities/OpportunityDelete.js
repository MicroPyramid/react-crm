import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from '@mui/material'

export const OpportunityDelete = (props) => {
  // const [opportunity, setOpportunity] = useState([])

  return (
    <Dialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => props.onClose()} open={props.isDelete}
    >
      <DialogTitle
        style={{
          padding: '15px',
          width: '500px',
          color: 'black'
        }}
      >
        Are you sure want to delete this Opportunity ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: '14px' }}>
          {props.opportunityId.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onClose()}
          style={{ textTransform: 'capitalize' }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => props.onDelete(props.opportunityId.id)}
          style={{
            textTransform: 'capitalize',
            backgroundColor: '#3E79F7',
            color: 'white',
            height: '30px'
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
