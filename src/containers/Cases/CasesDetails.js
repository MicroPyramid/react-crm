import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Link,
  Avatar
} from "@mui/material";

import { fetchData } from "../../components/FetchData";
import { CasesUrl } from "../../components/ApiUrls";
import { Contacts } from './Contacts';
import { DetailsPageAppbar } from "../../components/DetailsPageAppbar";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options)
}
export const CasesDetails = (props) => {
  const [cases, setCases] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `jwt ${localStorage.getItem("Token")}`,
    org: 3,
  };

  useEffect(() => {
    fetchData(`${CasesUrl}/${state.casesId}/`, "GET", null, headers)
    .then((data) => {
      if (!data.error) {
        setCases(...cases, {
          cases_obj: data.cases_obj,
          contacts: data.cases_obj.contacts,
          user_details: data.cases_obj.created_by.user_details,
          cases_Id: data.cases_obj.id,
          priority: data.priority,
          type_of_case: data.type_of_case,
          status: data.status,
        }); 
      }
    })
    .catch((error) => {
    });
  }, [])

  const editHandle = () => {
    navigate('/cases/edit-cases', {
      state: {
        caseId: cases.cases_Id,
        priority: cases.priority,
        type_of_case: cases.type_of_case,
        status: cases.status,
        cases_obj:cases.cases_obj
      }
    })
  }

  const backbtnHandle = () => {
    navigate('/cases')
  }

  const module= "Cases";
  const crntPage= "Cases Title";
  const backBtn = "Back To Cases";

  return (
    <div style={{ width: "100%" }}>
      <div>
        <DetailsPageAppbar backbtnHandle={ backbtnHandle } editHandle={ editHandle } backBtn={ backBtn } crntPage={ crntPage } module={ module }/>
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div style={{ width: "65%", height: "100% " }}>
          <Card >
            {/* Cases Information */}
            <div>
              <div style={{ padding: "10px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)", justifyContent: 'center', textAlign: "center", paddingTop: "20px" }}>
                  Cases Information
                </div>
                <div style={{ color: "gray", fontSize: "12px", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", flexDirection: "row",textTransform:"capitalize" }}>
                      created on &nbsp;
                      {cases.cases_obj && cases.cases_obj.created_on_arrow}
                      &nbsp; by   &nbsp;&nbsp;
                      {
                        cases.user_details && cases.user_details.profile_pic ? cases.user_details.profile_pic :
                        <span style={{ display: "flex", flexDirection: "row" }}>
                          <Avatar src="/broken-image.jpg"
                            style={{
                              height: "20px",
                              width: "20px"
                            }}
                          />&nbsp;
                          &nbsp;
                          {cases.user_details && cases.user_details.first_name ? cases.user_details.first_name : "Ashwin Kumar"}
                          &nbsp; &nbsp;
                        </span>
                      }
                    </div>
                    <div>
                      Last Updated:
                      {cases.cases_obj && cases.cases_obj.created_on_arrow}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                padding: "20px", 
                display: "flex",
                flexDirection: "row",
                marginTop: "10px"
              }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>
                  Cases Title
                </div>
                <div style={{ display: "flex" }}>
                </div>
              </div>
              <div style={{
                padding: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px", 
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Name
                  </div>
                  <div style={{ fontSize: "12px", color: "gray", textTransform: "capitalize" }}>
                    {
                     cases.cases_obj && cases.cases_obj.name ?
                      cases.cases_obj.name : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Status
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                     cases.cases_obj && cases.cases_obj.status ?
                      cases.cases_obj.status : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px", 
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Account
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                     cases.cases_obj && cases.cases_obj.account ?
                      cases.cases_obj.account : "--"
                    }
                  </div>
                </div>
              </div>
              <div style={{
                padding: "20px", 
                marginTop: "15px",
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Priority
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                     cases.cases_obj && cases.cases_obj.priority ?
                      cases.cases_obj.priority : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px", 
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Assigned Users
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                     cases.cases_obj && cases.cases_obj.assigned_to ?
                     cases.cases_obj.assigned_to : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px", 
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Team
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    <Link>
                      {
                       cases.cases_obj && cases.cases_obj.teams ?
                       cases.cases_obj.teams : "--"
                      }
                    </Link>
                  </div>
                </div>
              </div>
              <div style={{
                padding: "20px",
                marginTop: "15px",
                display: "flex",
                flexDirection: "row", 
                justifyContent: "space-between"
              }}>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Type of Case
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                      cases.cases_obj && cases.cases_obj.case_type ?
                      cases.cases_obj.case_type : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Users
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {
                      cases.cases_obj && cases.cases_obj.users ?
                      cases.cases_obj.users : "--"
                    }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Contacts
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "gray",
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    {
                      cases.contacts && cases.contacts ?
                      cases.contacts.map((contact) => (
                      <Contacts contact={contact}/>
                      ))
                      : " --"
                    }
                  </div>
                </div>
              </div>
              <div style={{
                padding: "20px",
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Closed Date
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {cases.cases_obj && cases.cases_obj.closed_on ?
                    cases.cases_obj.closed_on : "---"}
                  </div>
                </div>
                <div >
                </div>
              </div>
            </div>
            {/* Description */}
            <div style={{ marginTop: "15px", maxHeight: "75%" }}>
              <div style={{
                padding: "20px",
                borderBottom: "1px solid lightgray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                <div style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "rgb(26, 51, 83)"
                }}>
                  Description
                </div>
              </div>
              <div style={{ height: "250px" }}>
                <p style={{ 
                fontSize: "13px",
                color: "gray",
                padding: "10px" }}>
                  {
                    cases.cases_obj && cases.cases_obj.description ?
                    cases.cases_obj.description : "---"
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}