import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import { RegisterUrl } from "../../components/ApiUrls";
import { UseForm } from "../../components/UseForm";
import { fetchData } from "../../components/FetchData";
import "../../css/auth.css";

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(true);

  useEffect(() => {
    if (!msg) {
      window.open("/login", "_self");
    }
  }, [msg]);

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const submitCallBack = () => {
    fetchData(`${RegisterUrl}/`, "POST", JSON.stringify(val), headers)
    .then((data) => {
      if (!data.error) {
        setMsg(data.error);
        alert(data.message);
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

  return (
    <div>
      {errors ? <Alert severity="error">{errors}</Alert> : null}
      <form className="form" onSubmit={onSubmit}>
        <Grid container direction="column" >
          <Grid item>
            <Typography variant="h6">Name</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              error={ errors.first_name }
              helperText={
              error
              ? `${errors.first_name instanceof Array
                ? errors.first_name[0]
                : ""
              }`
              : "please enter your name"
              }
              type="text"
              name="first_name"
              variant="outlined"
              value={ val.first_name }
              onChange={ onChange }
              autoFocus
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Organisation</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupAddIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              error={ errors.org_name }
              helperText={
              error
                ? `${errors.org_name instanceof Array ? errors.org_name[0] : ""
                }`
                : "please enter your name"
              }
              type={ showPassword ? "text" : "password" }
              name="org_name"
              variant="outlined"
              value={ val.org_name }
              onChange={ onChange }
              autoFocus
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              error={ errors.email }
              helperText={
                error
                ? `${errors.email instanceof Array ? errors.email[0] : ""}`
                : "please enter your name"
              }
              type="email"
              name="email"
              variant="outlined"
              value={ val.email }
              onChange={ onChange }
              autoFocus
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Password</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={ () => setShowPassword(!showPassword) }
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              error={ errors.password }
              helperText={
                error
                ? `${errors.password instanceof Array ? errors.password[0] : ""
                }`
                : "please enter your password"
              }
              type={ showPassword ? "text" : "password" }
              name="password"
              variant="outlined"
              value={ val.password }
              onChange={ onChange }
              autoFocus
              className="passwordField"
            />
          </Grid>
          <Button
            type="submit"
            color="primary"
            style={{ marginTop: "20px" }}
            variant="contained"
            className="form__custom-button">
            Sumbit
          </Button>
        </Grid>
      </form>
    </div>
  );
};
