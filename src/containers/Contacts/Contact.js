import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AvatarGroup,
  Button,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  AppBar,
  Dialog,
  DialogTitle,
  DialogActions,
  TableBody,
  Table,
  Switch,
  Card,
  Link,
  Tabs,
  Tab,
  TablePagination,
  Typography,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import { makeStyles } from '@mui/styles';

import { fetchData } from "../../components/FetchData";
import { ContactUrl } from "../../components/ApiUrls";
import { ContactDelete } from './ContactDelete';
import { getComparator, stableSort } from "../../components/Sorting";
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
    fontWeight: "bold",
    paddingTop: "1px",
    marginTop: "1px",
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      backgroundColor: "#F0F7FF",
      fontWeight: "bold"
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#1A3353",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: "#F2F2F7",
  },
  color: "#1A3353",
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
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
    id: 'first_name',
    numeric: false,
    disablePadding: false,
    label: 'First_name',
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

export const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [initial, setInitial] = useState(true);
  const [value, setValue] = useState(0);
  const [valued, setValued] = useState(10);
  const [openOffset, setOpenOffset] = useState(0);
  const [closeOffset, setCloseOffset] = useState(0);
  const [openValue, setOpenValue] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [contact, setContact] = useState('');
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setValued(parseInt(event.target.value, 10));
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

  const getContacts = () => {
    fetchData(`${ContactUrl}/?offset=${value === 0 ? openOffset : closeOffset}`, "GET", null, headers)
    .then((data) => {
      if (!data.error) {
        if (initial) {
          setContacts(...contacts, {
            contactObj: data.contact_obj_list,
            contacts_count: data.contacts_count
          })
          setLoader(false)
          setInitial(false)
        } else {
          setContacts({
            contactObj: data.contact_obj_list,
            contacts_count: data.contacts_count
          })
        }
      }
    })
  }

  useEffect(() => {
    getContacts()
  }, [closeOffset, openOffset])

  const createSortHandlerBtn = (property) => (event) => {
    setOrderBy(order);
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onDelete = (contactID) => {
    fetchData(`${ContactUrl}/${contactID}/`, "delete", null, headers)
    .then((data) => {
      if (!data.error) {
        getContacts()
        setIsDelete(false)
      }
    })
    .catch((error) => {
    });
  }

  const next = () => {
    if (value == 0 && contacts.contacts_count > 0) {
      setOpenOffset(valued);
      setValued(valued + rowsPerPage);
    }
    else if (value == 1 && opportunity.close_opportunities_count > closeOffset + 10) {
      setCloseOffset(closeOffset + 10);
      setCloseValue(closeValue + 10);
    }
  }

  const previous = () => {
    if (value == 0 && openOffset > 0) {
      setOpenOffset(openOffset - rowsPerPage);
      setValued(valued - rowsPerPage);
    } else if (value == 1 && closeOffset > 0) {
      setCloseOffset(closeOffset - 10);
      setCloseValue(openValue - 10);
    }
  }

  const onAddHandle = () => {
    navigate('/contacts/add-contacts');
  }

  const contactHandle = (contactId) => {
    navigate('/contacts/contact-details', { state: { contactId: contactId.id } });
  }

  const deleteItemBox = (deleteId) => {
    setContact(deleteId);
    setIsDelete(!isDelete);
  }

  const onclose = () => {
    setIsDelete(!isDelete);
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
          <AntTabs value={value} onChange={handleChangeTabPanel}
            aria-label="basic tabs example"
            sx={{ borderBottom: "none" }}>
            <AntTab label="Open" {...a11yProps(0)} />
            <AntTab label="Close" {...a11yProps(1)} />
          </AntTabs>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}>
              {/* <Button style={{ backgroundColor: "	rgb(34 61 96)" }}>
                {<FilterAltOutlinedIcon style={{ fill: "white" }} onClick={createSortHandlerBtn(headCells[0].id)} />}
              </Button> */}
              <TablePagination
                style={{ display: "flex", flexDirection: "row" }}
                rowsPerPageOptions={ [10, 20, 30, 40, 50] }
                component="div"
                labelRowsPerPage={ 'Records Per Page' }
                count={ value === 0 ? contacts.contacts_count : "5" }
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
                    marginLeft: "-15px"
                  },
                  ".MuiTablePagination-select": {
                    color: "black",
                    marginRight: "0px",
                    marginLeft: "-12px",
                    marginTop: "-6px"
                  },
                  ".MuiSelect-icon": {
                    color: "black",
                    marginTop: "-5px",
                  },
                  backgroundColor: "white",
                  borderRadius: 1,
                  height: '10%',
                  overflow: "hidden",
                  p: 0,
                  m: 0,
                  width: '39%',
                  pb: 5,
                  color: "black"
                }}
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }
              />
              <Button style={{
                backgroundColor: "white",
                color: "#1A3353",
                textTransform: "lowercase"
              }} size="small">
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: "whitesmoke", fill: "black", mr: 1 }} style={{ fill: "black" }} />
                <Typography sx={{ mt: 0, textTransform: "lowercase", fontSize: "15px", color: "black", mr: 1 }}>
                   {
                      value == 0 ?
                      `${openOffset + 1} to 
                      ${contacts.contacts_count > 0 ?
                        valued : 0}`
                      :
                      `${closeOffset + 1} to 
                      ${contacts.contacts_count > closeOffset + 10 ?
                      closeOffset + 10 : 0}`
                    }
                </Typography>
                <ChevronRightIcon onClick={ next } sx={{ backgroundColor: "whitesmoke", fill: "black" }} style={{ fill: "black ", color: "black" }} />
              </Button>
              <Button
                onClick={ onAddHandle }
                type="submit"
                variant="contained"
                size="small"
                startIcon={ <AddCircleOutlineIcon style={{ fill: "white" }} /> }
                style={{ textTransform: "capitalize", fontWeight: "bold", fontSize: "13px", marginRight: "6px" }}>
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
      <div style={{ padding: "10px", marginTop: "5px" }}>
        <Card >
          <TableContainer component={ Paper }>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Name</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Email</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Phone Number</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Do Not Call</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "13p", color: "#1A3353" }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  contacts.contactObj && contacts.contactObj ? stableSort(contacts.contactObj && contacts.contactObj, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <StyledTableRow key={ index }>
                      <StyledTableCell align="left" style={{ textTransform: "capitalize", cursor: "pointer" }} onClick={ () => contactHandle(item) }>{ item.first_name + " " + item.last_name }</StyledTableCell>
                      <StyledTableCell align="left"><p style={{ color: "#3E79F7" }}>{ item.primary_email }</p></StyledTableCell>
                      <StyledTableCell align="left" >{ item.mobile_number ? item.mobile_number : "-" }</StyledTableCell>
                      <StyledTableCell align="left">
                        <AntSwitch checked={ item.do_not_call } inputProps={{ 'aria-label': 'ant design' }} />
                      </StyledTableCell>
                      <StyledTableCell align="left" ><DeleteOutlineIcon style={{ fill: "#1976d2", cursor: "pointer" }} onClick={ () => deleteItemBox(item) } /></StyledTableCell>
                    </StyledTableRow>
                  ))
                    : null
                }
              </TableBody>
            </Table>
          </TableContainer>
          {
            isDelete ? <ContactDelete contact={contact} isDelete={isDelete}
              onClose={ onclose }
              onDelete={ onDelete }
            /> : ""
          }
        </Card>
        { loader && <Spinner /> } 
      </div>
    </div>
  );
}
