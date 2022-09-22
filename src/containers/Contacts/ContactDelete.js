import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from "@mui/material";

export const ContactDelete = (props) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => props.onClose()} open={props.isDelete}>
      <DialogTitle
        style={{
          padding: "15px",
          width: "500px",
          color: "black"
        }}>
        Are you sure want to delete this Contact?
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: "14px" }}>
          {props.contact.first_name}
          {props.contact.last_name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onClose()}
          style={{ textTransform: "capitalize" }}>
          Cancel
        </Button>
        <Button
          onClick={() => props.onDelete(props.contact.id) }
          style={{ textTransform: "capitalize", backgroundColor: "#3E79F7", color: "white", height: "30px" }}>
          Yes
        </Button>
    </DialogActions>
    </Dialog >
  )
}