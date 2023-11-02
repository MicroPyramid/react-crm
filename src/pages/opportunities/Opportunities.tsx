
// import React, { SyntheticEvent, useEffect, useState } from 'react'
// import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper } from '@mui/material'

// // import { Spinner } from '../../../components/Spinner';
// // import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
// import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
// import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
// import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";

// import { CustomTab, CustomToolbar, StyledTableCell } from '../../styles/CssStyled';
// import { fetchData } from '../../components/FetchData';
// import { OpportunityUrl } from '../../services/ApiUrls';
// import { DialogModal } from '../../components/DialogModal';
// // import { DeleteModal } from '../../components/DeleteModal';
// // import { AntSwitch, CustomTab, CustomToolbar, StyledTableCell, StyledTableRow } from '../../../styles/CssStyled';
// // import { fetchData } from '../../../components/FetchData';
// // import { ContactUrl, OpportunityUrl } from '../../../components/ApiUrls';
// // import { getComparator, stableSort } from '../../../components/Sorting';
// // import { DeleteModal } from '../../../components/DeleteModal';


// export default function Opportunities() {
//   // const [opportunity, setOpportunity] = useState([])
//   const [value, setValue] = useState('Open')
//   const [initial, setInitial] = useState(true)
//   const [openOffset, setOpenOffset] = useState(0)
//   const [openValue] = useState(1)
//   const [closeOffset, setCloseOffset] = useState(0)
//   const [closeValue, setCloseValue] = useState(1)
//   const [opportunityId, setOpportunityId] = useState('')
//   const [isDelete, setIsDelete] = useState(false)
//   const [page, setPage] = useState(0)
//   const [values, setValues] = useState(10)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [loader, setLoader] = useState(true)
//   const [order] = useState('asc')
//   const [orderBy] = useState('calories')


//   const handleChangeTab = (e: SyntheticEvent, val: any) => {
//     setValue(val)
//   }
//   const handleChangePage = (event: any, newPage: any) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event: any) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//     setValues(parseInt(event.target.value, 10))
//   }


//   const headers = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Authorization: `jwt ${localStorage.getItem('Token')}`,
//     org: localStorage.getItem('org')
//   }

//   const getOpportunity = () => {
//     fetchData(`${OpportunityUrl}/?offset=${value === 'Open' ? openOffset : closeOffset}`, 'GET', null as any, headers)
//       .then((data: any) => {
//         if (!data.error) {
//           if (initial) {
//             //   setOpportunity(...opportunity, {
//             //     opportunityObj: data.opportunities,
//             //     offset: data.opportunities.offset,
//             //     opportunities_count: data.opportunities_count,
//             //     opportunitiesId: data.opportunities.id,
//             //     accounts_list: data.accounts_list,
//             //     contacts_list: data.contacts_list,
//             //     currency: data.currency,
//             //     lead_source: data.lead_source,
//             //     stage: data.stage,
//             //     tags: data.tags,
//             //     accountId: data.accounts_list.id,
//             //     accountName: data.opportunities.length > 0 &&
//             //       data.opportunities && data.opportunities.account
//             //       ? data.opportunities.account.name
//             //       : ''
//             //   })
//             setOpenOffset(initial ? 0 : openOffset)
//             setCloseOffset(initial ? 0 : closeOffset)
//             setInitial(false)
//             setLoader(false)
//           } else {
//             if (value === 'Open') {
//               // setOpportunity({
//               //   opportunityObj: data.opportunities,
//               //   opportunities_count: data.opportunities_count,
//               //   opportunitiesId: data.opportunities.id,
//               //   accounts_list: data.accounts_list,
//               //   contacts_list: data.contacts_list,
//               //   currency: data.currency,
//               //   lead_source: data.lead_source,
//               //   stage: data.stage,
//               //   tags: data.tags
//               // })
//               setOpenOffset(initial ? 0 : openOffset)
//               setLoader(false)
//             }
//             if (value === 'Close' || initial) {
//               // setOpportunity({
//               //   opportunityObj: data.opportunities,
//               //   opportunities_count: data.opportunities_count,
//               //   opportunitiesId: data.opportunities.id,
//               //   close_opportunities_count: data.offset,
//               //   accounts_list: data.accounts_list,
//               //   contacts_list: data.contacts_list,
//               //   currency: data.currency,
//               //   lead_source: data.lead_source,
//               //   stage: data.stage,
//               //   tags: data.tags,
//               //   accountId: data.accounts_list.id,
//               //   accountName: data.opportunities.account.name
//               // })
//               setCloseOffset(initial ? 0 : closeOffset)
//               setLoader(false)
//             }
//           }
//         }
//       })
//       .catch(() => {
//       })
//   }

//   // useEffect(() => {
//   //   getOpportunity()
//   // }, [closeOffset, openOffset])

//   // const handleRequestSort = (event, property) => {
//   //   const isAsc = orderBy === property && order === 'asc'
//   //   setOrder(isAsc ? 'desc' : 'asc')
//   //   setOrderBy(property)
//   // }

//   const onDelete = (id: any) => {
//     fetchData(`${OpportunityUrl}/${id}/`, 'delete', null as any, headers)
//       .then((data) => {
//         if (!data.error) {
//           getOpportunity()
//           setIsDelete(false)
//         }
//       })
//       .catch(() => {
//       })
//   }

//   // const next = () => {
//   //   if (value === 'Open' && opportunity?.opportunities_count > 0) {
//   //     setOpenOffset(values)
//   //     setValues(values + rowsPerPage)
//   //   } else if (value === 'Close' && opportunity?.close_opportunities_count > closeOffset + 10) {
//   //     setCloseOffset(closeOffset + 10)
//   //     setCloseValue(closeValue + 10)
//   //   }
//   // }

//   const previous = () => {
//     if (value === 'Open' && openOffset > 0) {
//       setOpenOffset(openOffset - rowsPerPage)
//       setValues(values - rowsPerPage)
//     } else if (value === 'Close' && closeOffset > 0) {
//       setCloseOffset(closeOffset - 10)
//       setCloseValue(openValue - 10)
//     }
//   }

//   const onAddOpportunity = () => {
//     //   navigate('/opportunities/add-opportunities', {
//     //     state: {
//     //       stage: opportunity.stage,
//     //       lead_source: opportunity.lead_source,
//     //       currency: opportunity.currency,
//     //       contacts_list: opportunity.contacts_list,
//     //       tags: opportunity.tags,
//     //       accounts_list: opportunity.accounts_list,
//     //       accountId: opportunity.accountId
//     //     }
//     //   })
//   }

//   const deleteItemBox = (deleteId: any) => {
//     setOpportunityId(deleteId)
//     setIsDelete(!isDelete)
//   }

//   const onclose = () => {
//     setIsDelete(!isDelete)
//   }

//   const opportunitiesHandle = (opportunities: any) => {
//     //   navigate('/opportunities/opportunities-details', {
//     //     state:
//     //     {
//     //       opportunitiesDetails: opportunities.id,
//     //       stage: opportunity.stage,
//     //       lead_source: opportunity.lead_source,
//     //       currency: opportunity.currency,
//     //       contacts_list: opportunity.contacts_list,
//     //       tags: opportunity.tags,
//     //       accounts_list: opportunity.accounts_list
//     //     }
//     //   })
//   }

//   const EditBtnHandle = (opportunities: any) => {
//     //   navigate('/opportunities/opportunities-edit', {
//     //     state: {
//     //       opportunities,
//     //       opportunitiesId: opportunities.id,
//     //       stage: opportunity.stage,
//     //       lead_source: opportunity.lead_source,
//     //       currency: opportunity.currency,
//     //       contacts_list: opportunity.contacts_list,
//     //       tags: opportunity.tags,
//     //       accounts_list: opportunity.accounts_list,
//     //       accountName: opportunity.accountName
//     //     }
//     //   })
//   }
//   return (
//     <Box sx={{
//       mt: '60px'
//       // , width: '1376px'
//     }}>
//       <CustomToolbar>
//         <Tabs defaultValue={value} onChange={handleChangeTab} sx={{ mt: '27px' }}>
//           <CustomTab value="Open" label="Open"
//             sx={{
//               backgroundColor: value === 'Open' ? '#F0F7FF' : '#223d60',
//               color: value === 'Open' ? '#3f51b5' : 'white',
//             }}></CustomTab>
//           <CustomTab value="Closed" label="Closed"
//             sx={{
//               backgroundColor: value === 'Closed' ? '#F0F7FF' : '#223d60',
//               color: value === 'Closed' ? '#3f51b5' : 'white',
//               ml: '5px',
//             }}
//           ></CustomTab>
//         </Tabs>

//         <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//           <Box
//             sx={{ mr: '-253px' }}
//           // sx={{ mr:'10px',display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems:'center',color: 'white'}}
//           >
//             {/* <CustomTablePagination */}
//             <TablePagination
//               style={{ display: 'flex', flexDirection: 'row' }}
//               rowsPerPageOptions={[10, 20, 30, 40, 50]}
//               component='div'
//               labelRowsPerPage='Records Per Page'
//               // count={value === 'Open' ? opportunity?.opportunities_count : '5'}
//               count={5}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               size='small'
//               sx={{
//                 '.MuiTablePagination-toolbar': {
//                   paddingRight: '220px',
//                   // paddingLeft: '18px',
//                   minHeight: '30px',

//                 },
//                 '.MuiTablePagination-displayedRows': {
//                   display: 'none'
//                 },
//                 '.MuiTablePagination-actions': {
//                   display: 'none'
//                 },
//                 '.MuiTablePagination-selectLabel': {
//                   marginTop: '4px',
//                   marginLeft: '-15px',
//                   mb: '8px'
//                 },
//                 '.MuiTablePagination-select': {
//                   color: 'black',
//                   marginRight: '0px',
//                   marginLeft: '-12px',
//                   marginTop: '-3px'
//                 },
//                 '.MuiSelect-icon': {
//                   color: 'black',
//                   marginTop: '-2px'
//                 },
//                 backgroundColor: 'white',
//                 borderRadius: 1,
//                 height: '10%',
//                 overflow: 'hidden',
//                 p: 0,
//                 m: 0,
//                 width: '39%',
//                 pb: 5,
//                 color: 'black',
//                 mr: 1
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Box>
//           <Button
//             size='small'
//             sx={{
//               backgroundColor: 'white',
//               textTransform: 'lowercase',
//               borderRadius: '7px',
//               mr: 1,
//               color: 'black',
//               '&:hover': {
//                 backgroundColor: 'white'
//               }
//             }}
//           >
//             <FiChevronLeft
//               //  onClick={previous}
//               style={{ backgroundColor: 'whitesmoke', color: '#1A3353', marginRight: 1 }} />
//             <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', mr: 1 }}>
//               1 to 0
//               {/* {
//           value === 0
//             ? `${openOffset + 1} to ${leads.open_lead_count > 0 ? valued : 0}`
//             : `${closeOffset + 1} to ${leads.close_lead_count > closeOffset + 10 ? closeOffset + 10 : 0}`
//         } */}
//             </Typography>
//             <FiChevronRight
//               //  onClick={next}
//               style={{ backgroundColor: 'whitesmoke', color: '#1A3353' }} />
//           </Button>
//           <Button
//             variant='contained'
//             startIcon={<FiPlus color='#1976d2' style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '10px', marginTop: '-1px' }} />}
//             //   onClick={onAddOpportunity}
//             sx={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px', color: 'white', mr: '-13px' }}
//           >
//             Add Opportunity
//           </Button>
//         </Stack>
//       </CustomToolbar>
//       <Box sx={{ padding: '10px', marginTop: '5px' }}>
//         <TableContainer component={Paper}>
//           <Table aria-label='customized table'>
//             <TableHead>
//               <TableRow style={{ color: '#1A3353' }}>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Name</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Account</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Assigned To</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Stage</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Created On</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Tags</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Lead Source</StyledTableCell>
//                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Action</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* {
//                     opportunity.opportunityObj && opportunity.opportunityObj
//                       ? stableSort(opportunity.opportunityObj && opportunity.opportunityObj, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
//                         <StyledTableRow key={index}>
//                           <StyledTableCell align='left' onClick={() => opportunitiesHandle(item)} style={{ color: '#1A3353', cursor: 'pointer' }}>{item.name}</StyledTableCell>
//                           <StyledTableCell align='left'>
//                             {
//                             item.account ? item.account.name : '--'
//                           }
//                           </StyledTableCell>
//                           <StyledTableCell align='left'>
//                             <Avatar
//                               src='/broken-image.jpg'
//                               style={{
//                                 height: '30px',
//                                 width: '30px'
//                               }}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell
//                             align='left'
//                             style={{ textTransform: 'lowercase', color: '#1A3353' }}
//                           >
//                             {item.stage}
//                           </StyledTableCell>
//                           <StyledTableCell
//                             align='left'
//                             style={{ color: '#1A3353' }}
//                           >
//                             {item.created_on_arrow}
//                           </StyledTableCell>
//                           <StyledTableCell align='left'>
//                             <div style={{ display: 'flex' }}>
//                               {
//                               item.tags
//                                 ? item.tags.map((tagData) => (
//                                   <Tags tags={tagData} />
//                                 ))
//                                 : '--'
//                             }
//                             </div>
//                           </StyledTableCell>
//                           <StyledTableCell
//                             align='left'
//                             style={{ textTransform: 'lowercase', color: '#1A3353' }}
//                           >
//                             {item.lead_source}
//                           </StyledTableCell>
//                           <StyledTableCell align='left'>
//                             <div style={{ display: 'flex', flexDirection: 'row' }}>
//                               <div onClick={() => EditBtnHandle(item)}>
//                                 <EditIcon style={{ fill: '#1A3353', cursor: 'pointer' }} />
//                               </div>
//                               <div onClick={() => deleteItemBox(item)}>
//                                 <DeleteOutlineIcon style={{ fill: '#1A3353', cursor: 'pointer' }} />
//                               </div>
//                             </div>
//                           </StyledTableCell>
//                         </StyledTableRow>
//                       ))
//                       : null
//                   } */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {
//           isDelete
//             ? <DialogModal
//               // <DeleteModal
//               opportunityId={opportunityId} isDelete={isDelete}
//               onClose={onclose}
//               onDelete={onDelete}
//             />
//             : ''
//         }
//       </Box>
//     </Box>
//   )
// }
import { Avatar, AvatarGroup, Box, Button, Card, List, Stack, Tab, TablePagination, Tabs, Toolbar, Typography, Link, Select, MenuItem, TableContainer, Table, TableSortLabel, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, Container } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { CustomTab, CustomToolbar, FabLeft, FabRight, StyledTableCell, StyledTableRow } from '../../styles/CssStyled';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../components/FetchData';
import { getComparator, stableSort } from '../../components/Sorting';
import { Label } from '../../components/Label';

import { FaTrashAlt } from 'react-icons/fa';
// import { DeleteModal } from './DeleteModal';
import { Header, OpportunityUrl } from '../../services/ApiUrls';
import { DeleteModal } from '../../components/DeleteModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';


interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  // {
  //   id: '',
  //   numeric: false,
  //   disablePadding: false,
  //   label: ''
  // },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'account',
    numeric: false,
    disablePadding: false,
    label: 'Account'
  },
  {
    id: 'assigned_to',
    numeric: false,
    disablePadding: false,
    label: 'Assigned To'
  },
  {
    id: 'stage',
    numeric: false,
    disablePadding: false,
    label: 'Stage'
  },
  {
    id: 'created_on',
    numeric: false,
    disablePadding: false,
    label: 'Created On'
  },
  {
    id: 'tags',
    numeric: false,
    disablePadding: false,
    label: 'Tags'
  },
  {
    id: 'lead_source',
    numeric: false,
    disablePadding: false,
    label: 'Lead Source'
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: 'Action'
  }
]

function EnhancedTableHead(props: any) {
  const {
    onSelectAllClick, order, orderBy,
    numSelected, rowCount,
    numSelectedId, isSelectedId,
    onRequestSort
  } = props

  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding='checkbox'>
                  <Checkbox
                      onChange={onSelectAllClick}
                      checked={numSelected === rowCount}
                      sx={{ color: 'inherit' }}
                  />
              </TableCell> */}
        {
          headCells.map((headCell) => (
            headCell.label === 'Actions' || headCell.label === 'Tags' ?
              <TableCell
                sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}
                key={headCell.id}
                align={headCell.numeric ? 'left' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}>{headCell.label}</TableCell>
              : <TableCell
                sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}
                key={headCell.id}
                align={headCell.numeric ? 'left' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {
                    orderBy === headCell.id
                      ? (
                        <Box component='span' sx={{ display: 'none' }}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      )
                      : null
                  }
                </TableSortLabel>
              </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

type Item = {
  id: string;
};

export default function Opportunities(props: any) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('open');
  const [loading, setLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const [opportunities, setOpportunities] = useState([])
  const [openOpportunities, setOpenOpportunities] = useState([])
  const [openOpportunitiesCount, setOpenOpportunitiesCount] = useState(0)
  const [closedOpportunities, setClosedOpportunities] = useState([])
  const [closedOpportunitiesCount, setClosedOpportunitiesCount] = useState(0)
  const [contacts, setContacts] = useState([])
  const [tags, setTags] = useState([])
  const [currency, setCurrency] = useState([])
  const [leadSource, setLeadSource] = useState([])
  const [account, setAccount] = useState([])
  const [stage, setStage] = useState([])
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [countries, setCountries] = useState([])

  const [deleteRowModal, setDeleteRowModal] = useState(false)

  const [selectOpen, setSelectOpen] = useState(false);

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [isSelectedId, setIsSelectedId] = useState<boolean[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {
    getOpportunities()
  }, [])

  const getOpportunities = () => {
    fetchData(`${OpportunityUrl}/`, 'GET', null as any, Header)
      .then((res) => {
        console.log(res, 'Opportunity')
        if (!res.error) {
          setOpportunities(res?.opportunities)
          // setOpenOpportunities(res?.open_leads?.open_leads)
          // setOpenOpportunitiesCount(res?.open_leads?.leads_count)
          // setClosedOpportunities(res?.close_leads?.close_leads)
          // setClosedOpportunitiesCount(res?.close_leads?.leads_count)
          setContacts(res?.contacts_list)
          setAccount(res?.accounts_list)
          setCurrency(res?.currency)
          setLeadSource(res?.lead_source)
          setStage(res?.stage)
          setTags(res?.tags)
          setTeams(res?.teams)
          setUsers(res?.users)
          setCountries(res?.countries)
        }
      })

  }

  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setTab(val)
  }

  const onAddOpportunity = () => {
    navigate('/app/opportunities/add-opportunity', {
      state: {
        detail: false,
        contacts: contacts || [], leadSource: leadSource || [], currency: currency || [], tags: tags || [], account: account || [], stage: stage || [], users: users || [], teams: teams || [], countries: countries || []
      }
    })
  }
  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  type SelectedItem = string[];

  const isSelected = (name: string, selected: SelectedItem): boolean => {
    return selected.indexOf(name) !== -1;
  };


  const opportunityDetail = (opportunityId: any) => {
    navigate(`/app/opportunities/opportunity-details`, {
      state: {
        opportunityId, detail: true,
        contacts: contacts || [], leadSource: leadSource || [], currency: currency || [], tags: tags || [], account: account || [], stage: stage || [], users: users || [], teams: teams || [], countries: countries || []
      }
    })
  }

  const deleteRow = (id: any) => {
    setSelectedId(id)
    setDeleteRowModal(!deleteRowModal)
  }
  const deleteRowModalClose = () => {
    setDeleteRowModal(false)
    setSelectedId([])
  }

  const deleteItem = () => {
    fetchData(`${OpportunityUrl}/${selectedId}/`, 'DELETE', null as any, Header)
      .then((res: any) => {
        console.log('delete:', res);
        if (!res.error) {
          deleteRowModalClose()
          getOpportunities()
        }
      })
      .catch(() => {
      })
  }

  // const handleSelectAllClick = () => {
  //   if (tab === 'open') {
  //     if (selected.length === openOpportunities.length) {
  //       setSelected([]);
  //       setSelectedId([]);
  //       setIsSelectedId([]);
  //     } else {
  //       const newSelectedIds = openOpportunities.map((opportunities) => opportunities?.id);
  //       setSelected(newSelectedIds);
  //       setSelectedId(newSelectedIds);
  //       setIsSelectedId(newSelectedIds.map(() => true));
  //     }
  //   } else {
  //     if (selected.length === closedOpportunities.length) {
  //       setSelected([]);
  //       setSelectedId([]);
  //       setIsSelectedId([]);
  //     } else {
  //       const newSelectedIds = closedOpportunities.map((opportunities) => opportunities?.id);
  //       setSelected(newSelectedIds);
  //       setSelectedId(newSelectedIds);
  //       setIsSelectedId(newSelectedIds.map(() => true));
  //     }
  //   }

  // };

  const handleRowSelect = (accountId: string) => {
    const selectedIndex = selected.indexOf(accountId);
    let newSelected: string[] = [...selected];
    let newSelectedIds: string[] = [...selectedId];
    let newIsSelectedId: boolean[] = [...isSelectedId];

    if (selectedIndex === -1) {
      newSelected.push(accountId);
      newSelectedIds.push(accountId);
      newIsSelectedId.push(true);
    } else {
      newSelected.splice(selectedIndex, 1);
      newSelectedIds.splice(selectedIndex, 1);
      newIsSelectedId.splice(selectedIndex, 1);
    }

    setSelected(newSelected);
    setSelectedId(newSelectedIds);
    setIsSelectedId(newIsSelectedId);
  };
  const modalDialog = 'Are You Sure You want to delete selected Opportunity?'
  const modalTitle = 'Delete Opportunity'

  const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]
  const tag = ['account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'leading', 'account', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading']
  return (
    <Box sx={{ mt: '60px' }}>
      <CustomToolbar sx={{ flexDirection: 'row-reverse' }}>
        {/* <Tabs defaultValue={tab} onChange={handleChangeTab} sx={{ mt: '26px' }}>
          <CustomTab value="open" label="Open"
            sx={{
              backgroundColor: tab === 'open' ? '#F0F7FF' : '#284871',
              color: tab === 'open' ? '#3f51b5' : 'white',
            }} />
          <CustomTab value="closed" label="Closed"
            sx={{
              backgroundColor: tab === 'closed' ? '#F0F7FF' : '#284871',
              color: tab === 'closed' ? '#3f51b5' : 'white',
              ml: '5px',
            }}
          />
        </Tabs> */}

        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Select
            value={recordsPerPage}
            onChange={(e: any) => setRecordsPerPage(e.target.value)}
            open={selectOpen}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            className={`custom-select`}
            onClick={() => setSelectOpen(!selectOpen)}
            IconComponent={() => (
              <div onClick={() => setSelectOpen(!selectOpen)} className="custom-select-icon">
                {selectOpen ? <FiChevronUp style={{ marginTop: '12px' }} /> : <FiChevronDown style={{ marginTop: '12px' }} />}
              </div>
            )}
            sx={{
              '& .MuiSelect-select': { overflow: 'visible !important' }
            }}
          >
            {recordsList?.length && recordsList.map((item: any, i: any) => (
              <MenuItem key={i} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ borderRadius: '7px', backgroundColor: 'white', height: '40px', minHeight: '40px', maxHeight: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', mr: 1, p: '0px' }}>
            <FabLeft>
              <FiChevronLeft
                //  onClick={previous}
                style={{ height: '15px' }}
              />
            </FabLeft>
            <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', textAlign: 'center' }}>
              0 to 1
            </Typography>
            <FabRight>
              <FiChevronRight
                style={{ height: '15px' }} />
            </FabRight>
          </Box>
          <Button
            variant='contained'
            startIcon={<FiPlus className='plus-icon' />}
            onClick={onAddOpportunity}
            className={'add-button'}
          >
            Add Opportunity
          </Button>
        </Stack>
      </CustomToolbar>
      <Container sx={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
        <Box sx={{ width: '100%', minWidth: '100%', m: '15px 0px 0px 0px' }}>
          <Paper sx={{ width: 'cal(100%-15px)', mb: 2, p: '0px 15px 15px 15px' }}>
            {/* <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                            <Tooltip title='Delete'>
                                <Button
                                    variant='outlined'
                                    onClick={() => !!(selectedId?.length !== 0) && handleDelete(selectedId)}
                                    startIcon={<FaTrashAlt color='red' style={{ width: '12px' }} />}
                                    size='small'
                                    color='error'
                                    sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: 'red', borderColor: 'darkgrey' }}
                                >
                                    Delete
                                </Button>
                            </Tooltip>
                            {selected.length > 0 ? (
                                <Typography sx={{ flex: '1 1 100%', margin: '5px' }} color='inherit' variant='subtitle1' component='div'>
                                    {selected.length} selected
                                </Typography>
                            ) : (
                                ''
                            )}
                        </Toolbar> */}
            <TableContainer>
              <Table>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  // rowCount={tab === 'open' ? openOpportunities?.length : closedOpportunities?.length}
                  rowCount={opportunities?.length}
                  numSelectedId={selectedId}
                  isSelectedId={isSelectedId}
                />
                <TableBody>
                  {
                    opportunities?.length > 0
                      ? stableSort(opportunities, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => {
                          const labelId = `enhanced-table-checkbox-${index}`
                          const rowIndex = selectedId.indexOf(item.id);
                          return (
                            <TableRow
                              tabIndex={-1}
                              key={index}
                              sx={{ border: 0, '&:nth-of-type(even)': { backgroundColor: 'whitesmoke' }, color: 'rgb(26, 51, 83)', textTransform: 'capitalize' }}
                            >
                              {/* <TableCell
                                                                    padding='checkbox'
                                                                    sx={{ border: 0, color: 'inherit' }}
                                                                    align='left'
                                                                >
                                                                    <Checkbox
                                                                        checked={isSelectedId[rowIndex] || false}
                                                                        onChange={() => handleRowSelect(item.id)}
                                                                        inputProps={{
                                                                            'aria-labelledby': labelId,
                                                                        }}
                                                                        sx={{ border: 0, color: 'inherit' }}
                                                                    />
                                                                </TableCell> */}
                              <TableCell
                                align='left'
                                sx={{ cursor: 'pointer', color: '#3E79F7', textTransform: 'none', border: 0 }}
                                onClick={() => opportunityDetail(item.id)}
                              >
                                {item?.name ? item?.name : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.account ? item?.account?.name : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.assigned_to ? <Avatar src={item?.assigned_to} alt={item?.assigned_to} /> : '----'}
                                {/* <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                  <Avatar src={item?.lead?.created_by?.profile_pic} alt={item?.lead?.created_by?.email} /><Stack sx={{ ml: 1 }}>{item?.lead?.account_name ? item?.lead?.account_name : '---'}</Stack>
                                </Stack> */}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.stage ? item?.stage : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.created_on_arrow ? item?.created_on_arrow : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.tags?.length ? item?.tags.map((tag: any, i: any) => <Stack sx={{ mr: 0.5 }}> <Label tags={tag} /></Stack>) : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item?.lead_source ? item?.lead_source : '---'}
                              </TableCell>

                              <TableCell align='left' sx={{ border: 0 }}>
                                {/* <IconButton>
                                                                        <FaEdit
                                                                            onClick={() => EditItem(item?.id)}
                                                                            style={{ fill: '#1A3353', cursor: 'pointer', width: '18px' }}
                                                                        />
                                                                    </IconButton> */}
                                <IconButton>
                                  <FaTrashAlt
                                    onClick={() => deleteRow(item?.id)}
                                    style={{ fill: '#1A3353', cursor: 'pointer', width: '15px' }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      : <TableRow> <TableCell colSpan={8} sx={{ border: 0 }}><Spinner /></TableCell></TableRow>
                  }
                  {/* {
                    emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: (dense ? 33 : 53) * emptyRows
                            }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )
                  }
 */}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
      <DeleteModal
        onClose={deleteRowModalClose}
        open={deleteRowModal}
        id={selectedId}
        modalDialog={modalDialog}
        modalTitle={modalTitle}
        DeleteItem={deleteItem}
      />
    </Box>
  )
}
