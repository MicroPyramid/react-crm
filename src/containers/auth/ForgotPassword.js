import React, { useState } from "react";
import {
  Grid,
  Typography,
  Link
} from "@mui/material";

import img_logo from "../../assets/images/auth/img_logo.png";
import img_BG from "../../assets/images/auth/img_BG.jpg";
import img_forgotPassword from "../../assets/images/auth/img_forgotPassword.png";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import "../../css/auth.css";

export const ForgotPassword = (props) => {
  const [tab, setTab] = useState(1);

  return (
    <div style={{ marginRight: "-6px" }}>
      <Grid container xs={12} direction="row"
        sx={{
          mt: -2,
          mb: -2,
          mr: -2,
          height: "684px",
          overflow: "hidden",
          position: "fixed"
        }}>
        <Grid
          container
          item
          xs={7}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center">
          <Grid item>
            <Grid>
              <img src={img_logo} alt="register_logo" className="register-logo" />
            </Grid>
            <Typography variant="h5">
              {tab === 1 ? `Forgot Password` : `Mailed success`}
            </Typography>
            <Typography variant="subtitle1">
              { 
               tab === 1
                ? ` Remember Password?`
                : `We emailed the instrcutions to your email.`
              }
              <Link href="/login" underline="none">
                Sign In
              </Link>
            </Typography>
            <Grid item
              sx={{ mt: 4 }}>
              <ForgotPasswordForm callback={setTab} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={ 5 } sx={{ mb: 0, mr: 0 }}>
          <img
            src={img_BG}
            alt="register_image"
            className="register-ad-bg-image"
          />
          <div className="register-ad-text">
            <h3>Welcome to BottleCRM</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              <br></br>Sunt
              consequatur itaque qui, aliquid id provident delectus.
            </p>
            <img
              src={ img_forgotPassword }
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
