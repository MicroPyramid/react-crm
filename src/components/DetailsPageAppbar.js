import React from 'react';
import {
  AppBar,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
  breadcrumbs: {
    color: "white"
  }
})

export function DetailsPageAppbar(props) {

  const classes = useStyles();
  const { backbtnHandle, editHandle, module, crntPage, backBtn } = props;

  return (
    <AppBar style={{ backgroundColor: "#1A3353", height: "44px", justifyContent: "center", width: "100%", marginTop: "-3px", boxShadow: "none" }} position="static">
      <div className="breadcomContainer">
        <div role="presentation" style={{ marginLeft: "10px" }}>
          <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Link underline="hover" color="lightgray" fontSize={"13px"} href="/">
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="lightgray"
              fontSize={"13px"}
              onClick={ backbtnHandle }
              style={{ cursor: "pointer" }}>
              { module }
            </Link>
            <Link style={{color:"white"}} underline="none" fontSize={ "13px" }>{ crntPage }</Link>
          </Breadcrumbs>
        </div>
        <div className="saveClose">
          <div style={{ marginRight: "5px" }}>
            <Button
              size="small"
              onClick={ backbtnHandle }
              startIcon={<ArrowBackIosNewIcon style={{ fill: "#1A3353" }} />}
              style={{ textTransform: "capitalize", fontSize: "12px", backgroundColor: "whitesmoke", color: "#1A3353" }}>
              {backBtn}
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={editHandle}
              startIcon={<EditIcon style={{ fill: "white" }} />}
              style={{ textTransform: "capitalize", fontWeight: "bold", fontSize: "13px" }}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </AppBar>
  )
}