import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  List,
  ListItemAvatar,
  AvatarGroup,
  Button,
  TablePagination,
  // FormControl,
  // MenuItem,
  // Select,
  // OutlinedInput,
  Typography,
  Card
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { makeStyles } from '@mui/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { deepOrange } from '@mui/material/colors'
// import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

import { getComparator, stableSort } from '../../components/Sorting'
import { LeadUrl } from '../../components/ApiUrls'
import { fetchData } from '../../components/FetchData'
import '../Leads/lead_css.css'
import { Label } from './Label'
import { AlertDelete } from '../../components/AlertDelete'
import { Spinner } from '../../components/Spinner'

const staticImg = 'https://cdn.vox-cdn.com/thumbor/ElnzjjbS376s3BFUCnFrsyjBArA=/0x86:706x557/1400x1050/filters:focal(0x86:706x557):format(png)/cdn.vox-cdn.com/assets/738480/stevejobs.png'
// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ]

// const ITEM_HEIGHT = 48
// const ITEM_PADDING_TOP = 8

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// }

const useStyles = makeStyles({
  card: {
    padding: '5px',
    border: '1px solid lightgray',
    paddingRight: '10px',
    height: '70px'
  }
})

// const headCells = [
//   {
//     id: 'title',
//     numeric: false,
//     disablePadding: false,
//     label: 'Title'
//   },
//   {
//     id: 'website',
//     numeric: false,
//     disablePadding: false,
//     label: 'Website'
//   },
//   {
//     id: 'created_by',
//     numeric: true,
//     disablePadding: false,
//     label: 'Created By'
//   },
//   {
//     id: 'country',
//     numeric: true,
//     disablePadding: false,
//     label: 'Country'
//   },
//   {
//     id: 'tags',
//     numeric: true,
//     disablePadding: false,
//     label: 'Tags'
//   },
//   {
//     id: 'actions',
//     numeric: true,
//     disablePadding: false,
//     label: 'Actions'
//   }
// ]

export const LeadList = (props) => {
  const [leads, setLeads] = useState([])
  const [valued, setValued] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [value, setValue] = useState(0)
  const [initial, setInitial] = useState(true)
  const [openOffset, setOpenOffset] = useState(0)
  const [openValue, setOpenValue] = useState(1)
  const [closeOffset, setCloseOffset] = useState(0)
  const [closeValue, setCloseValue] = useState(1)
  // const [personName, setPersonName] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [lead, setLead] = useState('')
  const [storeData, SetStoreData] = useState([])
  const [order] = useState('asc')
  const [orderBy] = useState('calories')
  const [loader, setLoader] = useState(true)
  const classes = useStyles()
  // const theme = useTheme()
  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setValued(parseInt(event.target.value, 10))
  }

  // const handleChangeTabPanel = (event, newValue) => {
  //   setValue(newValue)
  // }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const getLeads = () => {
    fetchData(`${LeadUrl}/`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          SetStoreData(data)
          if (initial) {
            setLeads(...leads, {
              open: data.open_leads.open_leads,
              open_lead_count: data.open_leads.leads_count,
              status: data.status,
              source: data.source,
              users: data.users,
              tags: data.tags,
              industries: data.industries,
              close: data.close_leads.close_leads,
              close_lead_count: data.close_leads.leads_count,
              contacts: data.contacts
            })
            setLoader(false)
            setOpenOffset(initial ? 0 : openOffset)
            setCloseOffset(initial ? 0 : closeOffset)
            setInitial(false)
          } else {
            if (value === 0) {
              setLeads({
                open: data.open_leads.open_leads,
                open_lead_count: data.open_leads.leads_count,
                status: data.status,
                source: data.source,
                users: data.users,
                industries: data.industries,
                close: data.close_leads.close_leads,
                close_lead_count: data.close_leads.leads_count,
                contacts: data.contacts
              })
              setOpenOffset(initial ? 0 : openOffset)
            }
            if (value === 1 || initial) {
              setLeads({
                open: data.open_leads.open_leads,
                open_lead_count: data.open_leads.leads_count,
                status: data.status,
                source: data.source,
                users: data.users,
                industries: data.industries,
                close: data.close_leads.close_leads,
                close_lead_count: data.close_leads.leads_count,
                contacts: data.contacts
              })
              setCloseOffset(initial ? 0 : closeOffset)
            }
          }
        }
      })
      .catch(() => {
      })
  }

  useEffect(() => {
    getLeads()
  }, [closeOffset, openOffset])

  // const createSortHandlerBtn = (property) => (event) => {
  //   setOrderBy(order)
  //   handleRequestSort(event, property)
  // }

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc'
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(property)
  // }

  const onDelete = (leadID) => {
    fetchData(`${LeadUrl}/${leadID}/`, 'delete', null, headers)
      .then((data) => {
        if (!data.error) {
          getLeads()
          setIsDelete(false)
        }
      })
      .catch(() => {
      })
  }

  const toggleDelete = (lead) => {
    setLead(lead)
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  const next = () => {
    if (value === 0 && leads.open_lead_count > 0) {
      setOpenOffset(valued)
      setValued(valued + rowsPerPage)
    } else if (value === 1 && leads.close_lead_count > closeOffset + 10) {
      setCloseOffset(closeOffset + 10)
      setCloseValue(closeValue + 10)
    }
  }

  const previous = () => {
    if (value === 0 && openOffset > 0) {
      setOpenOffset(openOffset - 10)
      setOpenValue(openValue - 10)
    } else if (value === 1 && closeOffset > 0) {
      setCloseOffset(closeOffset - 10)
      setCloseValue(openValue - 10)
    }
  }

  const handleChangeTab = (e, val) => {
    setValue(val)
  }

  const onAddHandle = () => {
    navigate('/leads/add-leads', { state: { status: leads.status, source: leads.source, industry: leads.industries, users: leads.users, tags: leads.tags, contacts: leads.contacts } })
  }

  const TabsList = styled(TabsListUnstyled)`
  min-width: 50px;
  background-color: #1A3353;
  display: flex;
  padding-top:10px;
  padding-left:5px
  `

  const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: rgb(34, 61, 96);
  width:7%;
  padding: 7px 15px;
  margin-top:4px;
  margin-left:5px;
  justify-content:center;
  border: none;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  align-items:center;
  height:34px;
  &:focus {
  color: #fff;
  border-radius: 3px;
  outline-offset: 2px;
  }
  &.${tabUnstyledClasses.selected} {
  background-color: #F0F7FF;
  color: #3f51b5; 
  font-weight: bold;
  }
  &.${buttonUnstyledClasses.disabled} {
  background-color:#3E79F7;
  opacity: 0.5;
  cursor: not-allowed;
  }
  `

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const leadHandle = (leadItem) => {
    navigate('/leads/lead-details', { state: { leadId: leadItem.id, edit: storeData, value } })
  }

  return (
    <div style={{ width: '100%', marginTop: '-3px', boxShadow: 'none' }}>
      <TabsUnstyled defaultValue={value} onChange={handleChangeTab}>
        <TabsList>
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
          <div style={{
            height: '30px',
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            justifyItems: 'flex-end'
          }}
          >
            <div className='paginationContainer'>
              <TablePagination
                style={{ display: 'flex', flexDirection: 'row' }}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                component='div'
                labelRowsPerPage='Records Per Page'
                count={value === 0 ? leads.open_lead_count : leads.close_lead_count}
                rowsPerPage={rowsPerPage}
                page={page}
                size='small'
                sx={{
                  '.MuiTablePagination-displayedRows': {
                    display: 'none'
                  },
                  '.MuiTablePagination-actions': {
                    display: 'none'
                  },
                  '.MuiTablePagination-selectLabel': {
                    marginTop: '4px',
                    marginLeft: '-15px'
                  },
                  '.MuiTablePagination-select': {
                    color: 'black',
                    marginRight: '0px',
                    marginLeft: '-12px',
                    marginTop: '-6px'
                  },
                  '.MuiSelect-icon': {
                    color: 'black',
                    marginTop: '-5px'
                  },
                  backgroundColor: 'white',
                  borderRadius: 1,
                  height: '10%',
                  overflow: 'hidden',
                  p: 0,
                  m: 0,
                  width: '39%',
                  pb: 5,
                  color: 'black',
                  mr: 1
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Button
                size='small'
                sx={{
                  backgroundColor: 'white',
                  textTransform: 'lowercase',
                  borderRadius: '7px',
                  mr: 1,
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353', mr: 1 }} />
                <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', mr: 1 }}>
                  {
                    value === 0
                      ? `${openOffset + 1} to ${leads.open_lead_count > 0 ? valued : 0}`
                      : `${closeOffset + 1} to ${leads.close_lead_count > closeOffset + 10 ? closeOffset + 10 : 0}`
                  }
                </Typography>
                <ChevronRightIcon onClick={next} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353' }} />
              </Button>
              {/* <div>
                <FormControl sx={{ mr: 1, width: 100, color: "#1A3353" }}>
                  <Select
                    className='select'
                    multiple
                    displayEmpty
                    value={personName}
                    style={{
                    height: "32px",
                    color: "#1A3353",
                    fontSize: "13px",
                    backgroundColor: "white",
                    width: "90px",
                    borderRadius: "6px"
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <p>Sort By</p>;
                      }
                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                    </MenuItem>
                    {
                      names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div> */}
              <div>
                <Button
                  variant='contained'
                  startIcon={<AddCircleOutlinedIcon style={{ fill: 'white' }} />}
                  onClick={onAddHandle}
                  style={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px', mr: 2, color: 'white' }}
                >
                  Add Lead
                </Button>
              </div>
            </div>
          </div>
        </TabsList>
        <TabPanel value={value} index={0}>
          <div style={{ padding: '10px', marginTop: '5px' }}>
            {
              leads.open && leads.open
                ? stableSort(leads.open && leads.open, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <List
                    key={index}
                    sx={{
                      bgcolor: 'background.paper',
                      marginBottom: '-17px',
                      paddingTop: '0px',
                      boxShadow: 'none'
                    }}
                  >
                    <div style={{ padding: '10px', marginTop: '1px' }}>
                      <Card className={classes.card} style={{ boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ color: '#1A3353', fontSize: '13px', fontWeight: 'bold', padding: '10px', cursor: 'pointer' }} onClick={() => leadHandle(item)}>
                            {item.title}
                          </div>
                          <div
                            onClick={() => toggleDelete(item)}
                          >
                            <DeleteOutlineIcon color='inherit' style={{ fill: 'inherit', cursor: 'pointer' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ width: '80%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '10px' }}>
                            <div style={{ color: 'gray', fontSize: '12px', textTransform: 'capitalize', paddingBottom: '40px' }}>
                              {`${(item.country !== null) ? item.country : ''} source-${item.source !== null ? item.source : ''} status-${(item.status !== null) ? item.status : ''} Jan 9, 2014 `}
                            </div>
                            {
                              item.tags.map((tagData, index) => (
                                <Label tags={tagData} key={index} />
                              ))
                            }
                            {
                              item.assigned_to.map((assignItem, index) => (
                                assignItem.user_details.profile_pic
                                  ? <Avatar alt='Remy Sharp' src={assignItem.user_details.profile_pic} />
                                  : <Avatar alt='Remy Sharp' size='small' style={{ backgroundColor: deepOrange[500], color: 'white', textTransform: 'capitalize', marginTop: '-20px', marginLeft: '10px' }}>
                                    {assignItem.user_details.first_name.charAt(0)}
                                  </Avatar>
                              ))
                            }
                          </div>
                          <div style={{ color: 'gray', fontSize: '12px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            created on {formatDate(item.created_on)} by   &nbsp;<span>
                              {
                                item.created_by.user_details.profile_pic !== null
                                  ? <Avatar
                                    alt='Remy Sharp' src={staticImg}
                                    style={{
                                      height: '20px',
                                      width: '20px'
                                    }}
                                  />
                                  : <Avatar
                                    src='/broken-image.jpg'
                                    style={{
                                      height: '20px',
                                      width: '20px',
                                      marginTop: '-4px'
                                    }}
                                  />
                              }
                              &nbsp;
                            </span> &nbsp;&nbsp;{item.created_by.user_details.first_name}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </List>
                ))
                : ''
            }
            {
              isDelete
                ? <AlertDelete
                  lead={lead}
                  isDelete={isDelete}
                  onClose={onclose}
                  onDelete={onDelete}
                />
                : ''
            }
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ padding: '10px', marginTop: '5px' }}>
            {
              leads.close
                ? leads.close.map((item, i) => (
                  <List
                    key={i}
                    sx={{
                      bgcolor: 'background.paper',
                      marginBottom: '-17px',
                      paddingTop: '0px'
                    }}
                  >
                    <div style={{ padding: '10px', marginTop: '1px' }}>
                      <Card className={classes.card} sx={{ boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ color: '#5B5C63 ', fontSize: '13px', fontWeight: 'bold', textTransform: 'capitalize', padding: '10px', cursor: 'pointer' }} onClick={() => leadHandle(item)}>
                            {item.title}
                          </div>
                          <div onClick={() => toggleDelete(item)}>
                            <DeleteOutlineIcon color='inherit' style={{ fill: 'inherit', cursor: 'pointer' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ width: '80%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '10px' }}>
                            <div style={{ color: 'gray', fontSize: '12px', textTransform: 'capitalize', paddingBottom: '40px' }}>
                              {`${(item.country !== null) ? item.country : ''} source-${item.source !== null ? item.source : ''} status-${(item.status !== null) ? item.status : ''} Jan 9, 2014 `}
                            </div>
                            {
                              item.tags.map((tagData) => (
                                <Label tags={tagData} />
                              ))
                            }
                            <ListItemAvatar>
                              <AvatarGroup max={item.assigned_to.length}>
                                {
                                  item.assigned_to.map((assignItem) => (
                                    assignItem.user_details.profile_pic
                                      ? <Avatar alt='Remy Sharp' src={assignItem.user_details.profile_pic} />
                                      : <Avatar alt='Remy Sharp' size='small' style={{ backgroundColor: deepOrange[500], color: 'white', textTransform: 'capitalize', marginBottom: '70px', marginTop: '-20px', marginLeft: '3px' }}>
                                        {assignItem.user_details.first_name.charAt(0)}
                                      </Avatar>
                                  ))
                                }
                              </AvatarGroup>
                            </ListItemAvatar>
                          </div>
                          <div style={{ color: 'gray', fontSize: '12px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            created on {formatDate(item.created_on)} by   &nbsp;<span>
                              {
                                item.created_by.user_details.profile_pic !== null
                                  ? <Avatar
                                    alt='Remy Sharp' src={staticImg}
                                    style={{
                                      height: '20px',
                                      width: '20px'
                                    }}
                                  />
                                  : <Avatar
                                    src='/broken-image.jpg'
                                    style={{
                                      height: '20px',
                                      width: '20px',
                                      marginTop: '-4px'
                                    }}
                                  />
                              }
                              &nbsp;
                            </span> &nbsp;&nbsp;{item.created_by.user_details.first_name}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </List>
                ))
                : ''
            }
            {
              isDelete
                ? <AlertDelete
                  lead={lead} isDelete={isDelete}
                  onClose={onclose}
                  onDelete={onDelete}
                />
                : ''
            }
          </div>
        </TabPanel>
        {loader &&
          <Spinner />}
      </TabsUnstyled>
    </div>
  )
}
const TabPanel = (props) => {
  const { children, value, index } = props
  return <div>{value === index && <div>{children}</div>}</div>
}
