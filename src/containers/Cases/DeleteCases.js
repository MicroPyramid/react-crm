import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from "@mui/material";

export const DeleteCases = (props) => {
  
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => props.onClose()}
      open={props.isDelete}>
      <DialogTitle
        style={{
          padding: "15px",
          width: "500px",
          color: "black"
        }}>Are you sure want to delete this Cases ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: "14px" }}>
          {props.casesId.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onClose()}
          style={{ textTransform: "capitalize" }}>Cancel</Button>
        <Button
          onClick={() => props.onDelete(props.casesId.id)}
          style={{
            textTransform: "capitalize",
            backgroundColor: "#3E79F7",
            color: "white",
            height: "30px"
          }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}