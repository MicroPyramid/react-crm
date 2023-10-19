import React, { SyntheticEvent, useState } from 'react'
import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, MenuItem, Select } from '@mui/material'
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
// import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
// import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
// import { fetchData } from '../../components/FetchData';
// import { CasesUrl } from '../../components/ApiUrls';
// import { CustomTab, CustomToolbar, StyledTableCell, StyledTableRow } from '../../../../react-crm-2.0/src/styles/CssStyled';
import { getComparator, stableSort } from '../../components/Sorting';
import { Priority } from './Priority';
import { Fa500Px, FaEdit } from 'react-icons/fa';
import { fetchData } from '../../components/FetchData';
import { CasesUrl } from '../../services/ApiUrls';
import { CustomTab, CustomToolbar, FabLeft, FabRight, StyledTableCell } from '../../styles/CssStyled';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { DialogModal } from '../../components/DialogModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
// import { DeleteModal } from '../../components/DeleteModal';



export default function Cases() {
  const [value, setValue] = useState('Open');
  const [loading, setLoading] = useState(true);

  const [casesData, setCasesData] = useState([])
  const [initial, setInitial] = useState(true)
  const [values, setValues] = useState(10)
  const [openOffset, setOpenOffset] = useState(0)
  const [closeOffset, setCloseOffset] = useState(0)
  const [openValue] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const [contact, setContact] = useState('')
  const [loader, setLoader] = useState(true)
  const [closeValue, setCloseValue] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order] = useState('asc')
  const [orderBy] = useState('calories')
  const [casesId, setCasesId] = useState('')

  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [isSelectedId, setIsSelectedId] = useState<boolean[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setValue(val)
  }
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setValues(parseInt(event.target.value, 10))
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const getCases = () => {
    fetchData(`${CasesUrl}/?offset=${value === 'Open' ? openOffset : closeOffset}`, 'GET', null as any, headers)
      .then((data: any) => {
        if (!data.error) {
          if (initial) {
            // Object.assign({}, data, { cases: data.cases })
            setCasesData(Object.assign({}, casesData,
              {
                cases: data.cases,
                cases_count: data.cases_count,
                priority: data.priority,
                status: data.status,
                type_of_case: data.type_of_case,
                ids: data.cases[0].name
              }))
            setOpenOffset(initial ? 0 : openOffset)
            setCloseOffset(initial ? 0 : closeOffset)
            setInitial(false)
            setLoader(false)
          } else {
            if (value === 'Open') {
              //   setCasesData({
              //     cases: data.cases,
              //     cases_count: data.cases_count
              //   })
              setOpenOffset(initial ? 0 : openOffset)
              setLoader(false)
            }
            if (value === 'Close' || initial) {
              //   setCasesData({
              //     cases: data.cases,
              //     cases_count: data.cases_count
              //   })
              setCloseOffset(initial ? 0 : closeOffset)
              setLoader(false)
            }
          }
        }
      })
      .catch(() => {
      })
  }

  //   useEffect(() => {
  //     getCases()
  //   }, [closeOffset, openOffset])

  const onDelete = (id: any) => {
    fetchData(`${CasesUrl}/${id}/`, 'delete', null as any, headers)
      .then((data) => {
        if (!data.error) {
          getCases()
          setIsDelete(false)
        }
      })
      .catch(() => {
      })
  }

  //   const next = () => {
  //     if (value === 'Open' && casesData.cases_count > 0) {
  //       setOpenOffset(values)
  //       setValues(values + rowsPerPage)
  //     }
  //   }

  const previous = () => {
    if (value === 'Open' && openOffset > 0) {
      setOpenOffset(openOffset - rowsPerPage)
      setValues(values - rowsPerPage)
    } else if (value === 'Close' && closeOffset > 0) {
      setCloseOffset(closeOffset - 10)
      setCloseValue(openValue - 10)
    }
  }

  const onAddHandle = () => {
    // navigate('/cases/add-cases', {
    //   state: {
    //     priority: casesData.priority,
    //     type_of_case: casesData.type_of_case,
    //     status: casesData.status
    //   }
    // })
  }

  const deleteItemBox = (deleteId: any) => {
    setCasesId(deleteId)
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  const casesHandle = (cases: any) => {
    // navigate('/cases/case-details', {
    //   state:
    //   {
    //     casesId: cases.id
    //   }
    // })
  }

  const EditBtnHandle = (opportunities: any) => {
    // navigate('/cases/edit-case', {
    //   state: {
    //     priority: casesData.priority,
    //     status: casesData.status,
    //     type_of_case: casesData.type_of_case,
    //     opportunities,
    //     opportunitiesId: opportunities.id
    //   }
    // })
  }
  const recordsList = [10, 20, 30, 40, 50]
  return (
    <Box sx={{ mt: '60px' }}>
      <CustomToolbar>
        <Tabs defaultValue={value} onChange={handleChangeTab} sx={{ mt: '26px' }}>
          <CustomTab value="Open" label="Open"
            sx={{
              backgroundColor: value === 'Open' ? '#F0F7FF' : '#223d60',
              color: value === 'Open' ? '#3f51b5' : 'white',
            }}></CustomTab>
          <CustomTab value="Closed" label="Closed"
            sx={{
              backgroundColor: value === 'Closed' ? '#F0F7FF' : '#223d60',
              color: value === 'Closed' ? '#3f51b5' : 'white',
              ml: '5px',
            }}
          ></CustomTab>
        </Tabs>

        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
                        <Typography sx={{ position: 'absolute', top: '9px', left: '36px', fontSize: '15px', zIndex: 1 }}>Records Per Page</Typography>
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
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'right',
                                },
                                PaperProps: {
                                    style: {
                                        width: '40px',
                                        minWidth: '40px'
                                    },
                                },
                            }}
                        >
                            {recordsList?.length && recordsList.map((item: any) => (
                                <MenuItem key={item} value={item} sx={{ ml: '-5px' }}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
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
                        // onClick={onAddAccount}
                        className={'add-button'}
                    >
                        Add Cases
                    </Button>
                </Stack>
      </CustomToolbar>
      
      <Box sx={{ padding: '10px', marginTop: '5px' }}>
        <TableContainer component={Paper}>
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow style={{ color: '#1A3353' }}>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Account
                </StyledTableCell>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Status
                </StyledTableCell>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Priority
                </StyledTableCell>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Created On
                </StyledTableCell>
                <StyledTableCell style={{
                  fontWeight: 'bold',
                  fontSize: '13p',
                  color: '#1A3353'
                }}
                >
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {
                    casesData.cases &&
                      casesData.cases
                      ? stableSort(casesData.cases &&
                        casesData.cases, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align='left' style={{ textTransform: 'capitalize', cursor: 'pointer' }} onClick={() => casesHandle(item)}>
                              {
                                item.name ? item.name : '--'
                              }
                            </StyledTableCell>
                            <StyledTableCell align='left' style={{ textTransform: 'capitalize', color: '#1A3353' }}>--
                              {
                        item && item.account.name ? item.account.name: "--"
                        }
                            </StyledTableCell>
                            <StyledTableCell align='left' style={{ textTransform: 'capitalize', color: '#1A3353' }}>
                              {
                                item.status ? item.status : '--'
                              }
                            </StyledTableCell>
                            <StyledTableCell align='left' style={{ textTransform: 'capitalize', color: '#1A3353' }}>
                              {
                                item.priority ? <Priority priorityData={item.priority} /> : '--'
                              }
                            </StyledTableCell>
                            <StyledTableCell align='left' style={{ color: '#1A3353' }}> {item.created_on_arrow}</StyledTableCell>
                            <StyledTableCell align='left'>
                              <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                                <div onClick={() => EditBtnHandle(item)}>
                                    <EditIcon style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                    <FaEdit style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                    </div>
                                <div onClick={() => deleteItemBox(item)}>
                                    <DeleteOutlineIcon style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                    <Fa500Px style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                    </div>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                      ))
                      : null
                  } */}
            </TableBody>
          </Table>
        </TableContainer>
        {
          isDelete
            ? <DialogModal
              // <DeleteModal
              casesId={casesId} isDelete={isDelete}
              onClose={onclose}
              onDelete={onDelete}
            />
            : ''
        }
      </Box>
    </Box>
  )
}
