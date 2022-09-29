import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Link,
  Avatar,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Tags } from '../../components/Tags';

import { fetchData } from "../../components/FetchData";
import { OpportunitiesUrl } from "../../components/ApiUrls";
import { DetailsPageAppbar } from '../../components/DetailsPageAppbar';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const OpportunityDetails = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const theme = useTheme();

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `jwt ${localStorage.getItem("Token")}`,
    org: 'localStorage.getItem("org")'
  };

  useEffect(() => {
    fetchData(`${OpportunitiesUrl}/${state.opportunitiesDetails}/`, "GET", null, headers)
      .then((data) => {
        if (!data.error) {
          setOpportunities(...opportunities, {
            opportunity_obj: data.opportunity_obj,
            tagLabel: data.opportunity_obj.tags,
            account: data.opportunity_obj.account,
            // teams: data.opportunity_obj.teams.name,
            // users: data.opportunity_obj.users.name,
            // contacts: data.opportunity_obj. contacts.name,
            // assigned_to:data.opportunity_obj.assigned_to.first_name,
            user_details: data.opportunity_obj.created_by.user_details,
            user_details: data.opportunity_obj.created_by.user_details
          })
        }
      })
  }, [])

  const editHandle = () => {
    navigate('/opportunities/edit-opportunities',
      {
        state: {
          opportunities: opportunities,
          opportunitiesId: opportunities.id,
          stage: state.stage,
          lead_source: state.lead_source,
          currency: state.currency,
          contacts_list: state.contacts_list,
          tags: state.tags,
          accounts_list: state.accounts_list
        }
      }
    )
  }

  const backbtnHandle = () => {
    navigate('/opportunities')
  }
  const module = "Opportunities";
  const crntPage = "Opportunities Title";
  const backBtn = "Back To Opportunities";

  return (
    <div style={{ width: "100%" }}>
      <div>
        <DetailsPageAppbar backbtnHandle={backbtnHandle} editHandle={editHandle} backBtn={backBtn} crntPage={crntPage} module={module} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div style={{ width: "65%", height: "100% " }}>
          <Card >
            {/* opportunity Information */}
            <div>
              <div style={{
                padding: "10px",
                borderBottom: "1px solid lightgray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                <div style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "rgb(26, 51, 83)",
                  justifyContent: 'center',
                  textAlign: "center",
                  paddingTop: "20px"
                }}>
                  Opportunity Information
                </div>
                <div style={{ color: "gray", fontSize: "12px", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', color: "gray", }}>
                    <div style={{ display: "flex", flexDirection: "row", textTransform: "capitalize" }}>
                      created on &nbsp;
                      {formatDate(opportunities.opportunity_obj && opportunities.opportunity_obj.created_on ? opportunities.opportunity_obj.created_on : "")} by &nbsp;
                      <span>
                        {/* {       
                            opportunities.user_details && opportunities.user_details ? opportunities.user_details.map((userName) => (
                              userName.profile_pic ?
                               <Avatar alt="Remy Sharp" src={userName.profile_pic} />
                               : <Avatar alt="Remy Sharp" size="small" style={{ color: "white", textTransform: "capitalize", marginTop: "5px", marginLeft: "10px" }}>
                                 {userName.first_name.charAt(0)}
                               </Avatar>
                           ))
                           :""
                        } */}
                        <Avatar src="/broken-image.jpg"
                          style={{
                            height: "20px",
                            width: "20px"
                          }}
                        />
                        &nbsp;
                      </span>
                      &nbsp;
                      {opportunities.opportunity_obj && opportunities.opportunity_obj.created_by ? opportunities.opportunity_obj.created_by.user_details.first_name : ""}
                      {opportunities.opportunity_obj && opportunities.opportunity_obj.created_by ? opportunities.opportunity_obj.created_by.user_details.last_name : ""}
                      &nbsp;
                      &nbsp;
                    </div>
                    <div>
                      Last Updated: {opportunities.opportunity_obj && opportunities.opportunity_obj.created_on_arrow ? opportunities.opportunity_obj.created_on_arrow : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "row", marginTop: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "rgb(26, 51, 83)", marginRight: "1px" }}>
                  Opportunity Title
                </div>
                <div style={{ display: "flex", marginTop: "-3px" }}>
                  {
                    opportunities && opportunities.tagLabel ?
                      opportunities.tagLabel.map((tagData) => (
                        <Tags tags={tagData}
                        />
                      ))
                      : " "
                  }
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
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {opportunities.opportunity_obj && opportunities.opportunity_obj.name ? opportunities.opportunity_obj.name : "--"}
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Lead Source
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {opportunities.opportunity_obj && opportunities.opportunity_obj.lead_source ? opportunities.opportunity_obj.lead_source : "--"}
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
                    {opportunities && opportunities.account ? opportunities.account.name : "--"}
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
                    Probability
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {opportunities.opportunity_obj ? opportunities.opportunity_obj.probability : "--"}
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Ammount
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    $ {opportunities.opportunity_obj && opportunities.opportunity_obj.amount ? opportunities.opportunity_obj.amount : "--"}
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
                      {/* {opportunities && opportunities.teams ? opportunities.teams:"--"} */}
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
                    Currency
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {opportunities.opportunity_obj && opportunities.opportunity_obj.currency ? opportunities.opportunity_obj.currency : "--"}
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
                    <Link>
                      {/* {opportunities && opportunities.users ? opportunities.users :"--"} */}
                    </Link>
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
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {/* {opportunities && opportunities.contacts ? opportunities.contacts.name:"--" } */}
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
                    Stage
                  </div>
                  <div style={{ fontSize: "12px", color: "gray", textTransform: "lowercase" }}>
                    {opportunities.opportunity_obj && opportunities.opportunity_obj.stage ? opportunities.opportunity_obj.stage : "--"}
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
                    <Link>
                      {/* {opportunities.assigned_to && opportunities.assigned_to ? opportunities.assigned_to : "--"} */}
                    </Link>
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "rgb(26, 51, 83)"
                  }}>
                    Close Date
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    <Link>
                      {opportunities.opportunity_obj && opportunities.opportunity_obj.closed_on ? opportunities.opportunity_obj.closed_on : '--'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div style={{ marginTop: "15px", maxHeight: "75%" }}>
              <div style={{
                padding: "20px", borderBottom: "1px solid lightgray",
                display: "flex", flexDirection: "row", justifyContent: "space-between"
              }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Description
                </div>
              </div>
              <div style={{ height: "250px" }}>
                <p style={{ fontSize: "13px", color: "gray", padding: "10px" }}>
                  {opportunities.opportunity_obj && opportunities.opportunity_obj.description ? opportunities.opportunity_obj.description : '--'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}