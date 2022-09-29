import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { ForgotPasswordUrl } from "../../components/ApiUrls";
import { UseForm } from "../../components/UseForm";
import { fetchData } from "../../components/FetchData";
import "../../css/auth.css";

export const ForgotPasswordForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);
  const [tab, setTab] = useState(1);

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const submitCallBack = () => {
    fetchData(`${ForgotPasswordUrl}/`, "POST", JSON.stringify(val), headers)
    .then((data) => {
      if (!data.error) {
        setMsg(true);
      }
      if (data.error) {
        setError(data.error);
        setErrors(data.errors);
      }
    })
    .catch((error) => {
    });
  };
  
  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  const { callback } = props;

  useEffect(() => {
    if (msg) {
      setTab(2);
      callback(2);
    }
  }, [msg]);

  return (
    <div>
      {tab === 1 ? (
        <Grid container direction="column">
          { error ? <Alert severity="error">{ errors }</Alert> : null }
          <form className="form" onSubmit={ onSubmit }>
            <Grid item>
              <Typography component="h5" variant="h6">
                <span style={{color:"red"}}>*</span>Email
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
                error={ val.errors }
                helperText={
                error
                ? `${errors.email instanceof Array ? errors.email[0] : ""}`
                : "Enter Your Email Address We Will Send You Password Link."
                }
                type="email"
                name="email"
                variant="outlined"
                value={ val.email }
                onChange={ onChange }
                sx={{ borderRadius:"2px" }}
                required
                autoFocus
              />
            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "30px", width:"360px" }}>
              Submit
            </Button>
          </form>
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
};