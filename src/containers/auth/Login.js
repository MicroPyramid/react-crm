import React from "react";
import { useNavigate } from "react-router";
import {
  Grid,
  Typography,
  Link
} from "@mui/material";

import img_logo from "../../assets/images/auth/img_logo.png";
import img_BG from "../../assets/images/auth/img_BG.jpg";
import img_login from "../../assets/images/auth/img_login.png";
import { LogInForm } from "./LogInForm";
import "../../css/auth.css";
import { Signin } from "./Signin";

export const LogIn = () => {
  let navigate = useNavigate();

  function LoginSuccess(){
    navigate("/company");
  }
  return (
    <div style={{ marginRight: "-8px" }}>
      <Grid container xs={12} direction="row" justifyContent="center"
        sx={{
          mt: -2,
          mb: -2,
          mr: -2,
          height: "691px",
          overflow: "hidden",
          position: 'fixed'
        }}>
        <Grid
          container
          item
          xs={7}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ height: "724px", overflow: "hidden" }}>
          <Grid item>
            <Grid>
              <img src={img_logo} alt="register_logo" className="register-logo" />
            </Grid>
            <Typography variant="h5"
              style={{ fontWeight: "bolder" }}>Sign In
            </Typography>
            <Typography variant="subtitle1">
              Don't have an account yet?
              <Link href="/register" underline="none">
                Sign Up
              </Link>
            </Typography>
            <Grid item
              sx={{ mt: 4 }}>
              <LogInForm />
            </Grid>
            <Grid item sx={{ mt:2, alignItems:"center", alignContent:"center" }}>
              <Typography sx={{ml:15}}>Or</Typography>
              <Grid item sx={{ mt:1, ml:6 }}>
              <Signin LoginSuccess={LoginSuccess}/>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={ 5 } sx={{ mb: 0, height: "730px", mr: 0, overflow: "hidden" }}>
          <img
            src={img_BG}
            alt="register_image"
            className="register-ad-bg-image"
          />
          <div
            className="register-ad-text">
            <h3>Welcome to BottleCRM</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              <br></br>Sunt
              consequatur itaque qui, aliquid id provident delectus.
            </p>
            <img
              src={img_login}
              alt="register_ad_image"
              className="register-ad-image"
            />
            <footer className="register-footer">
              www.bottlecrm.com | About Us | Contact Us
            </footer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
