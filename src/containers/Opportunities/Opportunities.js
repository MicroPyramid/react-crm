import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Tabs,
  Tab,
  Button,
  AppBar,
  TableBody,
  Table,
  Card,
  Typography,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { styled } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {getComparator, stableSort} from "../../components/Sorting";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { fetchData } from "../../components/FetchData";
import { OpportunitiesUrl } from "../../components/ApiUrls";
import { OpportunityDelete } from './OpportunityDelete';
import { Tags } from '../../components/Tags';
import { Spinner } from "../../components/Spinner";

const AntTabs = styled(Tabs)({
  border: 'none',
  borderBottom: "none",
  height: "3px",
  marginTop: "33px",
  marginLeft: "16px",
  overflow: "hidden",
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) =>
  <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    marginRight: theme.spacing(1),
    color: 'white',
    borderRadius: '5px',
    backgroundColor: "rgb(34, 61, 96)",
    fontWeight:"bold",
    paddingTop:"1px",
    marginTop:"1px",
    '&:hover': {
    color: '#40a9ff',
    opacity: 1,
    },
    '&.Mui-selected': {
    color: '#1890ff',
    backgroundColor: "#F0F7FF",
    fontWeight:"bold"
    },
    '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
    },
  }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
  backgroundColor: "#F2F2F7",
  },
  '&:last-child td, &:last-child th': {
  border: 0,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'website',
    numeric: false,
    disablePadding: false,
    label: 'Website',
  },
  {
    id: 'created_by',
    numeric: true,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Country',
  },
  {
    id: 'tags',
    numeric: true,
    disablePadding: false,
    label: 'Tags',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

export const Opportunities = () => {
  const [opportunity, setOpportunity] = useState([]);
  const [value, setValue] = useState(0);
  const [initial, setInitial] = useState(true);
  const [openOffset, setOpenOffset] = useState(0);
  const [openValue, setOpenValue] = useState(1);
  const [closeOffset, setCloseOffset] = useState(0);
  const [closeValue, setCloseValue] = useState(1);
  const [opportunityId, setOpportunityId] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setValues(parseInt(event.target.value, 10))
  };

  const handleChangeTabPanel = (event, newValue) => {
    setValue(newValue);
  };

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `jwt ${localStorage.getItem("Token")}`,
    org: 3,
  };

  const getOpportunity = () => {
    fetchData(`${OpportunitiesUrl}/?offset=${value === 0 ? openOffset : closeOffset}`, "GET", null, headers)
    .then((data) => {
      if (!data.error) {
        if (initial) {
          setOpportunity(...opportunity, {
            opportunityObj: data.opportunities,
            offset: data.opportunities.offset,
            opportunities_count: data.opportunities_count,
            opportunitiesId: data.opportunities.id,
            accounts_list: data.accounts_list,
            contacts_list: data.contacts_list,
            currency: data.currency,
            lead_source: data.lead_source,
            stage: data.stage,
            tags: data.tags,
            accountId: data.accounts_list.id,
            accountName: data.opportunities.length > 0 &&
            data.opportunities && data.opportunities.account ?
            data.opportunities.account.name : ""
          })
          setOpenOffset(initial ? 0 : openOffset);
          setCloseOffset(initial ? 0 : closeOffset);
          setInitial(false);
          setLoader(false);
        } else {
          if (value == 0) {
            setOpportunity({
              opportunityObj: data.opportunities,
              opportunities_count: data.opportunities_count,
              opportunitiesId: data.opportunities.id,
              accounts_list: data.accounts_list,
              contacts_list: data.contacts_list,
              currency: data.currency,
              lead_source: data.lead_source,
              stage: data.stage,
              tags: data.tags,
            })
            setOpenOffset(initial ? 0 : openOffset);
            setLoader(false);
          }
          if (value == 1 || initial) {
            setOpportunity({
              opportunityObj: data.opportunities,
              opportunities_count: data.opportunities_count,
              opportunitiesId: data.opportunities.id,
              close_opportunities_count: data.offset,
              accounts_list: data.accounts_list,
              contacts_list: data.contacts_list,
              currency: data.currency,
              lead_source: data.lead_source,
              stage: data.stage,
              tags: data.tags,
              accountId: data.accounts_list.id,
              accountName:data.opportunities.account.name
            });
            setCloseOffset(initial ? 0 : closeOffset);
            setLoader(false);
          }
        }
      }
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    getOpportunity()
  }, [closeOffset, openOffset]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onDelete = (id) => {
    fetchData(`${OpportunitiesUrl}/${id}/`, "delete", null, headers)
    .then((data) => {
      if (!data.error) {
        getOpportunity()
        setIsDelete(false)
      }
    })
    .catch((error) => {
    });
  }

  const next = () => {
    if (value == 0 && opportunity.opportunities_count > 0) {
      setOpenOffset(values)
      setValues(values + rowsPerPage)
    } else if (value == 1 && opportunity.close_opportunities_count > closeOffset + 10) {
      setCloseOffset(closeOffset + 10)
      setCloseValue(closeValue + 10)
    }
  }

  const previous = () => {
    if (value == 0 && openOffset > 0) {
      setOpenOffset(openOffset -rowsPerPage)
      setValues(values - rowsPerPage)
    } else if (value == 1 && closeOffset > 0) {
      setCloseOffset(closeOffset - 10)
      setCloseValue(openValue - 10)
    }
  }

  const onAddHandle = () => {
    navigate('/opportunities/add-opportunities', {
      state: {
        stage: opportunity.stage,
        lead_source: opportunity.lead_source,
        currency: opportunity.currency,
        contacts_list: opportunity.contacts_list,
        tags: opportunity.tags,
        accounts_list: opportunity.accounts_list,
        accountId: opportunity.accountId
      }
    })
  }

  const deleteItemBox = (deleteId) => {
    setOpportunityId(deleteId)
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  const opportunitiesHandle = (opportunities) => {
    navigate('/opportunities/opportunities-details', {
      state:
      {
        opportunitiesDetails: opportunities.id,
        stage: opportunity.stage,
        lead_source: opportunity.lead_source,
        currency: opportunity.currency,
        contacts_list: opportunity.contacts_list,
        tags: opportunity.tags,
        accounts_list: opportunity.accounts_list,
      }
    });
  }
  
  const EditBtnHandle = (opportunities) => {
    navigate('/opportunities/opportunities-edit', {
      state: {
        opportunities: opportunities,
        opportunitiesId: opportunities.id,
        stage: opportunity.stage,
        lead_source: opportunity.lead_source,
        currency: opportunity.currency,
        contacts_list: opportunity.contacts_list,
        tags: opportunity.tags,
        accounts_list: opportunity.accounts_list,
        accountName:opportunity.accountName
      }
    });
  }
  return (
    <div>
      <AppBar style={{
        backgroundColor: "#1A3353", 
        height: "44px",
        justifyContent: "center", 
        width: "100%",
        marginTop: '-3px', 
        boxShadow: "none",
        overflow: "hidden"
        }} position="static">
        <div style={{
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between",
          }}>
          <AntTabs 
            value={value} 
            onChange={handleChangeTabPanel}
            aria-label="basic tabs example"
            sx={{ borderBottom: "none" }}>
            <AntTab label="Open" {...a11yProps(0)} />
            <AntTab label="Close" {...a11yProps(1)} />
          </AntTabs>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{
              display: "flex", 
              flexDirection: "row", 
              alignItems: "center",
              justifyContent: "space-evenly"
              }}>
              {/* <Button style={{ backgroundColor: "	rgb(34 61 96)", }}>
                {<FilterAltIcon style={{ fill: "white" }} onClick={createSortHandlerBtn(headCells[0].id)} />}
              </Button> */}
              <TablePagination
                style={{ display: "flex", flexDirection: "row" }}
                rowsPerPageOptions={ [10, 20, 30, 40, 50] }
                component="div"
                labelRowsPerPage={ 'Records Per Page' }
                count={ value === 0 ? opportunity.opportunities_count : "5" }
                rowsPerPage={ rowsPerPage }
                page={ page }
                size="small"
                sx={{
                ".MuiTablePagination-displayedRows": {
                  display: "none",
                },
                "	.MuiTablePagination-actions": {
                  display: 'none'
                },
                ".MuiTablePagination-selectLabel": {
                  marginTop: "4px",
                  marginLeft:"-15px"
                },
                ".MuiTablePagination-select": {
                  color: "black",
                  marginRight: "0px",
                  marginLeft:"-12px",
                  marginTop:"-6px"
                },
                ".MuiSelect-icon":{
                  color:"black",
                  marginTop: "-5px",
                },
              backgroundColor: "white",
              borderRadius: 1,
              height: '10%',
              overflow: "hidden",
              p: 0,
              m: 0,
              width: '37%',
              pb: 5,
              color: "black"
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Button style={{
                backgroundColor: "white",
                color: "#1A3353", 
                textTransform: "lowercase",
                borderRadius:"5px",
                }} size="small">
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: "whitesmoke", fill: "#1A3353",mr:1 }}  />
                <Typography sx={{ mt: 0, textTransform: "lowercase", fontSize: "15px", color:"#1A3353", }}> 
                  {
                    value == 0 ?
                    `${openOffset + 1} to  ${opportunity.opportunities_count > 0 ? values : 0}`
                    :
                    `${closeOffset + 1} to ${opportunity.close_opportunities_count > closeOffset + 10 ? closeOffset + 10 : 0}`
                  }
                </Typography>
                <ChevronRightIcon onClick={ next } sx={{ backgroundColor: "whitesmoke", fill: "#1A3353" }}/>
              </Button>
              <Button
                onClick={ onAddHandle }
                type="submit"
                variant="contained"
                size="small"
                startIcon={ <AddCircleOutlineIcon style={{ fill: "white" }} /> }
                style={{
                textTransform: "capitalize",
                fontWeight: "bold", 
                fontSize: "13px",
                backgroundColor: "rgb(28 16 215)", 
                marginRight: "6px"
                }} >
                Add Opportunity
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
      <div style={{ padding: "2px", }}>
        <TabPanel value={value} index={0}>
          <Card >
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow style={{ color: "#1A3353" }}>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Name</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Account</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Assigned To</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Stage</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Created On</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Tags</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Lead Source</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {
                    opportunity.opportunityObj && opportunity.opportunityObj ? stableSort(opportunity.opportunityObj && opportunity.opportunityObj, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                      <StyledTableRow key={index} >
                        <StyledTableCell align="left" onClick={() => opportunitiesHandle(item)} style={{ color: "#1A3353",cursor:"pointer" }}>{item.name}</StyledTableCell>
                        <StyledTableCell align="left">
                          {
                            item.account ? item.account.name : "--"
                          }
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Avatar src="/broken-image.jpg"
                            style={{
                              height: "30px",
                              width: "30px"
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left"
                          style={{ textTransform: "lowercase", color: "#1A3353" }}>
                          { item.stage }
                        </StyledTableCell>
                        <StyledTableCell align="left"
                          style={{ color: "#1A3353" }}> 
                          { item.created_on_arrow }
                        </StyledTableCell>
                        <StyledTableCell align="left" >
                          <div style={{ display: "flex" }}>
                            {
                              item.tags ? item.tags.map((tagData) => (
                                <Tags tags={tagData}
                                />
                              )):"--"
                            }
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="left"
                          style={{ textTransform: "lowercase", color: "#1A3353" }} >
                          { item.lead_source }
                        </StyledTableCell>
                        <StyledTableCell align="left" >
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            <div onClick={() => EditBtnHandle(item)}>
                              { <EditIcon style={{ fill: "#1A3353", cursor: "pointer" }} /> }
                            </div>
                            <div onClick={() => deleteItemBox(item)}>
                              { <DeleteOutlineIcon style={{ fill: "#1A3353" ,cursor:"pointer"}} /> }
                            </div>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                    : null
                  }
                </TableBody>
              </Table>
            </TableContainer>
            {
              isDelete ? <OpportunityDelete opportunityId={opportunityId} isDelete={isDelete}
              onClose={onclose}
              onDelete={onDelete}
              /> : ""
            }
          </Card>
        </TabPanel>
        { loader && <Spinner/> }
      </div>
    </div>
  )
};
const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
};

