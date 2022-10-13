import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Tabs,
  Tab,
  Button,
  AppBar,
  TableBody,
  Table,
  Card,
  Typography
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/system'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
// import FilterAltIcon from '@mui/icons-material/FilterAlt'
import TablePagination from '@mui/material/TablePagination'

import { fetchData } from '../../components/FetchData'
import { CasesUrl } from '../../components/ApiUrls'
import { Priority } from './Priority'
import { getComparator, stableSort } from '../../components/Sorting'
import { DeleteCases } from './DeleteCases'
import { Spinner } from '../../components/Spinner'

const AntTabs = styled(Tabs)({
  border: 'none',
  borderBottom: 'none',
  height: '3px',
  marginTop: '33px',
  marginLeft: '16px',
  overflow: 'hidden',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff'
  }
})

const AntTab = styled((props) =>
  <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  marginRight: theme.spacing(1),
  color: 'white',
  borderRadius: '5px',
  backgroundColor: 'rgb(34, 61, 96)',
  fontWeight: 'bold',
  paddingTop: '1px',
  marginTop: '1px',
  '&:hover': {
    color: '#40a9ff',
    opacity: 1
  },
  '&.Mui-selected': {
    color: '#1890ff',
    backgroundColor: '#F0F7FF',
    fontWeight: 'bold'
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff'
  }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F2F2F7'
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: false,
//     label: 'Name'
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

export const Cases = (props) => {
  const [casesData, setCasesData] = useState([])
  const [value, setValue] = useState(0)
  const [initial, setInitial] = useState(true)
  const [openOffset, setOpenOffset] = useState(0)
  const [closeOffset, setCloseOffset] = useState(0)
  const [casesId, setCasesId] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(0)
  const [values, setValues] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order] = useState('asc')
  const [orderBy] = useState('calories')
  const [setCloseValue] = useState(0)
  const [openValue] = useState(0)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setValues(parseInt(event.target.value, 10))
  }

  const handleChangeTabPanel = (event, newValue) => {
    setValue(newValue)
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const getCases = () => {
    fetchData(`${CasesUrl}/?offset=${value === 0 ? openOffset : closeOffset}`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          if (initial) {
            setCasesData(...casesData, {
              cases: data.cases,
              cases_count: data.cases_count,
              priority: data.priority,
              status: data.status,
              type_of_case: data.type_of_case,
              ids: data.cases[0].name
            })
            setOpenOffset(initial ? 0 : openOffset)
            setCloseOffset(initial ? 0 : closeOffset)
            setInitial(false)
            setLoader(false)
          } else {
            if (value === 0) {
              setCasesData({
                cases: data.cases,
                cases_count: data.cases_count
              })
              setOpenOffset(initial ? 0 : openOffset)
              setLoader(false)
            }
            if (value === 1 || initial) {
              setCasesData({
                cases: data.cases,
                cases_count: data.cases_count
              })
              setCloseOffset(initial ? 0 : closeOffset)
              setLoader(false)
            }
          }
        }
      })
      .catch(() => {
      })
  }

  useEffect(() => {
    getCases()
  }, [closeOffset, openOffset])

  const onDelete = (id) => {
    fetchData(`${CasesUrl}/${id}/`, 'delete', null, headers)
      .then((data) => {
        if (!data.error) {
          getCases()
          setIsDelete(false)
        }
      })
      .catch(() => {
      })
  }

  const next = () => {
    if (value === 0 && casesData.cases_count > 0) {
      setOpenOffset(values)
      setValues(values + rowsPerPage)
    }
  }

  const previous = () => {
    if (value === 0 && openOffset > 0) {
      setOpenOffset(openOffset - rowsPerPage)
      setValues(values - rowsPerPage)
    } else if (value === 1 && closeOffset > 0) {
      setCloseOffset(closeOffset - 10)
      setCloseValue(openValue - 10)
    }
  }

  const onAddHandle = () => {
    navigate('/cases/add-cases', {
      state: {
        priority: casesData.priority,
        type_of_case: casesData.type_of_case,
        status: casesData.status
      }
    })
  }

  const deleteItemBox = (deleteId) => {
    setCasesId(deleteId)
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  const casesHandle = (cases) => {
    navigate('/cases/case-details', {
      state:
      {
        casesId: cases.id
      }
    })
  }

  const EditBtnHandle = (opportunities) => {
    navigate('/cases/edit-case', {
      state: {
        priority: casesData.priority,
        status: casesData.status,
        type_of_case: casesData.type_of_case,
        opportunities,
        opportunitiesId: opportunities.id
      }
    })
  }

  // const createSortHandlerBtn = (property) => (event) => {
  //   setOrderBy(order)
  //   handleRequestSort(event, property)
  // }

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc'
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(property)
  // }

  return (
    <div>
      <AppBar
        style={{
          backgroundColor: '#1A3353',
          height: '44px',
          justifyContent: 'center',
          width: '100%',
          marginTop: '-3px',
          boxShadow: 'none',
          overflow: 'hidden'
        }} position='static'
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        >
          <AntTabs
            value={value} onChange={handleChangeTabPanel}
            aria-label='basic tabs example'
            sx={{ borderBottom: 'none' }}
          >
            <AntTab label='Open' {...a11yProps(0)} />
            <AntTab label='Close' {...a11yProps(1)} />
          </AntTabs>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}
            >
              <TablePagination
                style={{ display: 'flex', flexDirection: 'row' }}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                component='div'
                labelRowsPerPage='Records Per Page'
                count={value === 0 ? casesData.cases_count : '5'}
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
                  color: 'black'
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Button
                style={{
                  backgroundColor: 'white',
                  color: '#1A3353',
                  textTransform: 'lowercase',
                  borderRadius: '5px'
                }}
                size='small'
              >
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: 'whitesmoke', fill: '#1A3353', mr: 1 }} />
                <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353' }}>{
                  value === 0
                    ? `${openOffset + 1} to 
                    ${casesData.cases_count > 0
                      ? values
                      : 0}`
                    : `${closeOffset + 1} to
                     ${casesData.cases_count > closeOffset + 10
                      ? closeOffset + 10
                      : 0}`
                }
                </Typography>
                <ChevronRightIcon onClick={next} sx={{ backgroundColor: 'whitesmoke', fill: '#1A3353', ml: 1 }} />
              </Button>
              <Button
                onClick={onAddHandle}
                type='submit'
                variant='contained'
                size='small'
                startIcon={<AddCircleOutlineIcon style={{ fill: 'white' }} />}
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  backgroundColor: 'rgb(28 16 215)',
                  marginRight: '6px'
                }}
              >
                Add Cases
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
      <div style={{ padding: '10px', marginTop: '5px' }}>
        <TabPanel value={value} index={0}>
          <Card>
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
                  {
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
                              {/* {
                        item && item.account.name ? item.account.name: "--"
                        } */}
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
                                <div onClick={() => EditBtnHandle(item)}><EditIcon style={{ fill: '#1A3353', cursor: 'pointer' }} /></div>
                                <div onClick={() => deleteItemBox(item)}><DeleteOutlineIcon style={{ fill: '#1A3353', cursor: 'pointer' }} /></div>
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
              isDelete
                ? <DeleteCases
                  casesId={casesId} isDelete={isDelete}
                  onClose={onclose}
                  onDelete={onDelete}
                />
                : ''
            }
          </Card>
        </TabPanel>
        {loader && <Spinner />}
      </div>
    </div>
  )
}
const TabPanel = (props) => {
  const { children, value, index } = props
  return <div>{value === index && <div>{children}</div>}</div>
}
