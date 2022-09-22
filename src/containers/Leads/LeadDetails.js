import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Link,
  Button,
  Avatar,
  Divider,
  TextField
} from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';

import { fetchData } from "../../components/FetchData";
import { LeadUrl } from "../../components/ApiUrls";
import { Label } from "./Label";
import { DetailsPageAppbar } from '../../components/DetailsPageAppbar';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const LeadDetails = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [lead, setLead] = useState([]);
  const [editLead, SetEditLead] = ([state.edit]);

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `jwt ${localStorage.getItem("Token")}`,
    org: 3,
  };

  useEffect(() => {
    fetchData(`${LeadUrl}/${state.leadId}/`, "GET", null, headers)
    .then((data) => {
      if (!data.error) {
        setLead(data.lead_obj)
      }
    })
    .catch((error) => {
    });
  }, []);

  const editHandle = () => {
    navigate('/leads/edit-leads', { state: { data: lead, editLead: editLead } });
  }

  const backbtnHandle = () => {
    navigate('/leads');
  }

  const module= "Lead";
  const crntPage= "Lead Title";
  const backBtn = "Back To Lead";

  return (
    <div style={{ width: "100%" }}>
      <div>
       <DetailsPageAppbar backbtnHandle={ backbtnHandle } editHandle={ editHandle } backBtn={ backBtn } crntPage={ crntPage } module={ module }/>
      </div>
      <div style={{ padding: "10px", marginTop: "5px", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "65%", paddingBottom: "20px" }}>
          <Card style={{ paddingBottom: "20px" }}>
            {/* leads Information */}
            <div>
              <div style={{ padding: "20px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Lead Information
                </div>
                <div style={{ color: "gray", fontSize: "12px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-end',textTransform:"capitalize" }}>
                    created on {formatDate(lead && lead.created_on)} &nbsp; by   &nbsp;
                    <span>
                      <Avatar src="/broken-image.jpg"
                        style={{
                        height: "20px",
                        width: "20px"
                        }}
                      />
                      &nbsp;
                    </span>
                    &nbsp;
                   { lead && lead.created_by && lead.created_by.user_details.first_name } 
                   { lead && lead.created_by && lead.created_by.user_details.last_name }
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "row", marginTop: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>
                  A free online library of 54 methods description
                  <div>
                    {
                      lead.assigned_to && lead.assigned_to.map((assignItem) => (
                      assignItem.user_details.profile_pic ?
                      <Avatar alt="Remy Sharp" src={ assignItem.user_details.profile_pic } />
                       : <Avatar alt="Remy Sharp" size="small" style={{ backgroundColor: deepOrange[500], color: "white", textTransform: "capitalize", marginTop: "5px", marginLeft: "10px" }}>
                        { assignItem.user_details.first_name.charAt(0) }
                      </Avatar>
                      ))
                    }
                  </div>
                </div>
                <div>
                  {
                    lead.tags && lead.tags ? lead.tags.map((tagData) => (
                      <Label tags={ tagData } />
                    )) : ""
                  }
                </div>
              </div>
              <div style={{ padding: "13px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Expected close date</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead.employee_close_date ? lead.employee_close_date : "12/02/1991" }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Contact Name</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead && lead.contacts }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Organization Name</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead.organization_name ? lead.organization_name : "Micropyramid informatics pvt. ltd" }</div>
                </div>
              </div>
              <div style={{ padding: "20px", marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Pipeline</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead.pipeline ? lead.pipeline : "------" }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Probability</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead.probability ? lead.probability : "---------" }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>website</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    <Link>{ lead && lead.website }</Link>
                  </div>
                </div>
              </div>
              <div style={{ padding: "13px", marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Industry</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead && lead.industry }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>SkypeID</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    <Link>
                      { lead && lead.skype_ID }
                    </Link>
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>&nbsp;</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>&nbsp;</div>
                </div>
              </div>
            </div>
            {/* Contact details */}
            <div style={{ marginTop: "15px" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Contact Details
                </div>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>First Name</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.first_name }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Last Name</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.last_name }</div>
                 </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Job Title</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{ lead && lead.title }</div>
                </div>
              </div>
              <div style={{ padding: "20px", marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Email Address</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    <Link>
                      { lead && lead.email } 
                      { < StarIcon style={{ fontSize: "12px", fill: "yellow" }} /> }
                    </Link>
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Mobile Number</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>  
                    { lead && lead.phone } 
                    { < StarIcon style={{ fontSize: "12px", fill: "yellow" }} /> }<br></br>
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}></div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                  </div>
                </div>
              </div>
            </div>
            {/* Address details */}
            <div style={{ marginTop: "15px" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Address Details
                </div>
              </div>
              <div style={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Address Lane</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.address_line }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Street</div>
                  <div style={{ fontSize: "12px", color: "gray" }}> { lead && lead.street }</div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>City</div>
                  <div style={{ fontSize: "12px", color: "gray" }}> { lead && lead.city }</div>
                </div>
              </div>
              <div style={{ padding: "20px", marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Pincode</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.postcode }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>State</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.state }
                  </div>
                </div>
                <div style={{ width: "32%" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "rgb(26, 51, 83)" }}>Country</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    { lead && lead.country }
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div style={{ marginTop: "12px" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Description
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "gray",padding:"10px" }}>
                { lead && lead.description }
              </p>
            </div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "red" }}>
                  Lost Reason
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "gray",padding:"10px" }}>
                {/* {lead && lead.description} */}
              </p>
            </div>
          </Card>
        </div>
        <div style={{ width: "34%", marginLeft: "10px" }}>
          <div>
            <Card >
              <div style={{ padding: "10px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Attachments
                </div>
                <div style={{ color: "#3E79F7", fontSize: "14px", fontWeight: "bold" }}>
                  {/* Add Social #1E90FF */}
                  <Button
                    type="submit"
                    variant="text"
                    size="small"
                    startIcon={ <AddIcon style={{ fill: "#3E79F7" }} /> }
                    style={{ textTransform: "capitalize", fontWeight: "bold", fontSize: "13px" }}>
                    Add Attachments
                  </Button>
                </div>
              </div>
              <div style={{ padding: "10px", marginTop: "15px" }}>
                { lead && lead.lead_attachment }
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "15px" }}>
            <Card >
              <div style={{ padding: "10px", borderBottom: "1px solid lightgray", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgb(26, 51, 83)" }}>
                  Notes
                </div>
              </div>
              <div style={{ padding: "10px", marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Avatar src="/broken-image.jpg"
                      style={{
                        height: "30px",
                        width: "30px"
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "13px", marginLeft: "10px", marginRight: "10px", textAlign: "justify" }}>
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
                </div>
              </div>
              <div style={{ padding: "10px" }}>Attachments</div>
              <div style={{ paddingLeft: "10px", paddingBottom: "10px", paddingRight: "10px", width: "100%", marginBottom: "10px" }}>
                <div style={{
                  border: "1px solid gray",
                  paddingBottom: "10px",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                }}> 
                 <TextField fullWidth label="Add Note"
                  id="fullWidth"
                  InputProps={{ disableUnderline: true }} />
                </div>
              </div>
              <div style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", width: "100%", marginBottom: "10px" }}>
                <form>
                  <div style={{
                    border: "1px solid gray",
                    padding: "8px",
                    borderRadius: "5px"
                  }}>
                    <TextField fullWidth label="Add Note"
                      id="fullWidth" style={{ marginBottom: "30px" }}
                      InputProps={{ disableUnderline: true }} />
                    <Divider light style={{ marginTop: "30px" }} />
                    <div className='bottom-box' style={{ display: 'flex', justifyContent: "space-between", paddingBotton: "10px", paddingTop: "9px" }}>
                      <div >
                        <Button
                         component="label"> 
                         { <AttachFileIcon style={{ fill: "	gray" }} /> }
                         <input
                          type="file"
                          hidden
                         />
                        </Button>
                     </div>
                      <div >
                        <Button variant="contained" size="small" style={{ backgroundColor: "#C0C0C0", marginRight: "3px" }}>
                          Cancel
                        </Button>
                        <Button variant="contained" size="small" style={{ backgroundColor: "#1F51FF", marginRight: "3px" }}>
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}