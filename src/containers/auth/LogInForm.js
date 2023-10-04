import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { UseForm } from "../../components/UseForm";
import { fetchData } from "../../components/FetchData";
import { LoginUrl } from "../../components/ApiUrls";
import "../../css/auth.css";


export const LogInForm = () => {
  const [errors, setErrors] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(true);
  let navigate = useNavigate();

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const submitCallBack = () => {
    fetchData(`${LoginUrl}/`, "POST", JSON.stringify(val), headers)
    .then((data) => {
      if (!data.error) {
        localStorage.setItem("Token", data.tokens.access_token);
        setMsg(data.error);
      }
      if (data.error) {
        setError(data.error);
        setErrors(data.errors);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  
  useEffect(() => {
    if (!msg && localStorage.getItem("Token")) {
      navigate("/company");
    }
  }, [msg]);

  return (
    <div>
      {errors ? <Alert severity="error">{errors}</Alert> : null}
      <form className="form" onSubmit={onSubmit}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h6">
              <span style={{ color: "red" }}>*</span>
              Email
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="primary" />
                  </InputAdornment>
                )
              }}
              size="small"
              error={errors.email}
              helperText={
                error
                ? `${errors.email instanceof Array ? errors.email[0] : ""}`
                : "Please Enter Your Email"
              }
              type="email"
              name="email"
              variant="outlined"
              value={val.email}
              onChange={onChange}
              required
              autoFocus
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <span style={{ color: "red" }}>*</span>
              Password
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      color="primary">
                      {
                       showPassword ?
                        <VisibilityOff color="primary" /> :
                        <Visibility color="primary" />
                      }
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
                : "Please Enter Your Password"
              }
              type={ showPassword ? "text" : "password" }
              name="password"
              variant="outlined"
              value={ val.password }
              onChange={ onChange }
              required
              autoFocus
              className="passwordField"
            />
          </Grid>
          <Grid item sx={{mb: 1}}>
            <Link href="/forgotpassword" variant="body2"
              underline="none"
            >
              Forgot password?
            </Link>
          </Grid>
          <Button
            style={{ marginLeft: "22px" }}
            type="submit"
            color="primary"
            variant="contained"
            className="form__custom-button">
            Log in
          </Button>
        </Grid>
      </form>
    </div>
  );
};
