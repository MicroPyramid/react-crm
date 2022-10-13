import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Tabs,
  Tab,
  TablePagination,
  TableRow,
  // TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Button
} from '@mui/material'
// import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import { DeleteWithCheckBx } from './DeleteWithCheckBx'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { fetchData } from '../../components/FetchData'
import { getComparator, stableSort } from '../../components/Sorting'
import { accountUrl } from '../../components/ApiUrls'
import { Tags } from '../../components/Tags'
import { UserDetails } from './UserDetails'
import { DeleteAccount } from './DeleteAccount'
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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'website',
    numeric: false,
    disablePadding: false,
    label: 'Website'
  },
  {
    id: 'created_by',
    numeric: true,
    disablePadding: false,
    label: 'Created By'
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Country'
  },
  {
    id: 'tags',
    numeric: true,
    disablePadding: false,
    label: 'Tags'
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions'
  }
]

function EnhancedTableHead (props) {
  const {
    onSelectAllClick, order, orderBy,
    numSelected, rowCount,
    numSelectedId, isSelectedId
  } = props

  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property)
  // }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={
              rowCount > 0 && numSelected === rowCount &&
              numSelectedId.length > 0 && isSelectedId.length > 0
            }
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
            sx={{ opacity: 0.5, color: 'inherit' }}
          />
        </TableCell>
        {
          headCells.map((headCell) => (
            <TableCell
              sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}
              key={headCell.id}
              fontWeight='bold'
              align={headCell.numeric ? 'left' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {/* <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            > */}
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                  )
                : null}
              {/* </TableSortLabel> */}
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const EnhancedTableToolbar = (props) => {
  const [isDelete, setIsDelete] = useState(false)
  // const [setValue] = useState('1')
  const { numSelected } = props

  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const onDelete = (id) => {
    fetchData(`${accountUrl}/${id}/`, 'delete', null, headers)
      .then((data) => {
        if (!data.error) {
          props.getAccount()
          setIsDelete(false)
        }
      })
      .catch(() => {
      })
  }
  function deleteHandle () {
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main,
                theme.palette.action.activatedOpacity)
          })
        }}
      >
        {
          numSelected > 0
            ? (
              <Tooltip title='Delete'>
                <Button
                  variant='outlined'
                  onClick={deleteHandle}
                  startIcon={<DeleteIcon color='error' />}
                  color='inherit' sx={{ opacity: 0.7 }}
                >
                  <Typography
                    color='error'
                    sx={{
                      opacity: 1,
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >Delete
                  </Typography>
                </Button>
              </Tooltip>
              )
            : (
              <Tooltip title='Delete'>
                <Button
                  variant='outlined'
                  startIcon={<DeleteIcon color='error' />}
                  color='inherit' sx={{ opacity: 0.7 }}
                >
                  <Typography
                    color='error'
                    sx={{
                      opacity: 1,
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  > Delete
                  </Typography>

                </Button>
              </Tooltip>
              )
        }
        {numSelected > 0
          ? (
            <Typography
              sx={{ flex: '1 1 100%', margin: '5px' }}
              color='inherit'
              variant='subtitle1'
              component='div'
            >
              {numSelected} selected
            </Typography>
            )
          : ''}
      </Toolbar>
      {
        isDelete
          ? <DeleteWithCheckBx
              accountData={props.numSelectedId}
              numSelected={numSelected} isDelete={isDelete}
              onClose={onclose}
              onDelete={onDelete}
              selectedCheckBx={props.isSelectedId}
            />
          : ''
      }
    </div>
  )
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numSelectedId: PropTypes.array.isRequired,
  iSelectedId: PropTypes.number.isRequired
}

function TabPanel (props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export function Account (props) {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('Website')
  const [value, setValue] = useState(0)
  const [initial, setInitial] = useState(true)
  const [closeInitial] = useState([])
  const [openOffset, setOpenOffset] = useState(0)
  const [openValue] = useState(1)
  const [closeOffset, setCloseOffset] = useState(0)
  const [closeValue, setCloseValue] = useState(1)
  const [selected, setSelected] = useState([])
  const [selectedId, setSelectedId] = useState([])
  const [isSelectedId, setIsSelectedId] = useState([])
  const [setDeleteItems] = useState([])
  const [page, setPage] = useState(0)
  const [values, setValues] = useState(10)
  const [dense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [accountData, setAccountData] = useState([])
  const [deleteItemId, setDeleteItemId] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  // const [filterItem, setFilterItem] = useState([])
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const getAccount = () => {
    fetchData(`${accountUrl}/?offset=${value === 0 ? openOffset : closeOffset}`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          if (initial) {
            setAccountData(
              ...accountData, {
                active_accounts: data.active_accounts,
                open_accounts: data.active_accounts.open_accounts,
                accountLength: data.active_accounts.open_accounts.length,
                closed_accounts: data.closed_accounts,
                closed_accounts_length: data.closed_accounts.close_accounts.length,
                close_accounts: data.closed_accounts.close_accounts,
                industries: data.industries,
                tags: data.tags,
                idActiveAccount: data.active_accounts.open_accounts.id,
                per_page: data.active_accounts.open_accounts.per_page
              }
            )
            setLoader(false)
            setOpenOffset(initial ? 0 : openOffset)
            setCloseOffset(initial ? 0 : closeOffset)
            setInitial(false)
          } else {
            if (value === 0) {
              setAccountData({
                active_accounts: data.active_accounts,
                open_accounts: data.active_accounts.open_accounts,
                accountLength: data.active_accounts.open_accounts.length,
                closed_accounts: data.closed_accounts,
                closed_accounts_length: data.closed_accounts.close_accounts.length,
                close_accounts: data.closed_accounts.close_accounts,
                industries: data.industries,
                tags: data.tags,
                idActiveAccount: data.active_accounts.open_accounts.id
              })
              setLoader(false)
              setOpenOffset(initial ? 0 : openOffset)
            }
            if (value === 1 || initial) {
              setAccountData({
                active_accounts: data.active_accounts,
                open_accounts: data.active_accounts.open_accounts,
                accountLength: data.active_accounts.open_accounts.length,
                closed_accounts: data.closed_accounts,
                closed_accounts_length: data.closed_accounts.close_accounts.length,
                close_accounts: data.closed_accounts.close_accounts,
                industries: data.industries,
                tags: data.tags,
                idActiveAccount: data.active_accounts.open_accounts.id
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
    getAccount()
  }, [closeOffset, openOffset])

  const next = () => {
    if (value === 0 && accountData.accountLength > 0) {
      setOpenOffset(values)
      setValues(values + rowsPerPage)
    } else if (value === 1 && accountData.closed_accounts_length > closeOffset + 10) {
      setCloseOffset(closeOffset + 10)
      setCloseValue(closeValue + 10)
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = accountData && accountData.open_accounts.map((n) => n.name)

      const newSelectedDelete = accountData && accountData.open_accounts.map((id) => id)

      const newSelectedDeleteId = accountData && accountData.open_accounts.map((item) => item.id)

      setSelected(newSelecteds)
      setDeleteItems(selected)
      setDeleteItems(newSelecteds)
      setSelectedId(newSelectedDelete)
      setIsSelectedId(newSelectedDeleteId)
      return
    }
    setSelected([])
    setDeleteItems([])
    setSelectedId([])
    setIsSelectedId([])
  }

  const handleClick = (event, name, ids, item) => {
    const selectedWithId = selectedId.indexOf(ids)

    let newItemDelete = []

    if (selectedWithId === -1) {
      newItemDelete = newItemDelete.concat(selectedId, ids)
    } else if (selectedWithId === 0) {
      newItemDelete = newItemDelete.concat(selectedId.slice(1))
    } else if (selectedWithId === selected.length - 1) {
      newItemDelete = newItemDelete.concat(selectedId.slice(0, -1))
    } else if (selectedWithId > 0) {
      newItemDelete = newItemDelete.concat(
        selectedId.slice(0, selectedWithId),
        selectedId.slice(selectedWithId + 1)
      )
    }
    setSelectedId(newItemDelete)
    const selectedWithNewId = isSelectedId.indexOf(item)
    let newItemDeleteId = []
    if (selectedWithNewId === -1) {
      newItemDeleteId = newItemDeleteId.concat(isSelectedId, item)
    } else if (selectedWithNewId === 0) {
      newItemDeleteId = newItemDeleteId.concat(isSelectedId.slice(1))
    } else if (selectedWithNewId === selected.length - 1) {
      newItemDeleteId = newItemDeleteId.concat(isSelectedId.slice(0, -1))
    } else if (selectedWithNewId > 0) {
      newItemDeleteId = newItemDeleteId.concat(
        isSelectedId.slice(0, selectedWithNewId),
        isSelectedId.slice(selectedWithNewId + 1)
      )
    }
    setIsSelectedId(newItemDeleteId)
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
    setDeleteItems(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setValues(parseInt(event.target.value, 10))
  }

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked)
  // }

  const deleteItemBox = (deleteId) => {
    setDeleteItemId(deleteId)
    setIsDelete(!isDelete)
  }

  const onclose = () => {
    setIsDelete(!isDelete)
  }

  const onDelete = (id) => {
    fetchData(`${accountUrl}/${id}/`, 'delete', null, headers)
      .then((data) => {
        if (!data.error) {
          getAccount()
          setIsDelete(false)
        }
      })
      .catch(() => {
      })
  }

  // const createSortHandlerBtn = (property) => (event) => {
  //   setOrderBy(order)
  //   handleRequestSort(event, property)
  // }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (value === 0 ? accountData.accountLength : accountData.closed_accounts_length)) : 0

  const onAddHandle = () => {
    navigate('/accounts/add-accounts', {
      state: {
        tags: accountData.tags,
        industries: accountData.industries
      }
    })
  }

  const accountHandle = (accountId) => {
    navigate('/accounts/account-details', {
      state: {
        accounts: accountId.id
      }
    })
  }

  const EditItemBox = (editData) => {
    navigate('/accounts/edit-accounts', {
      state: {
        editData: editData.id,
        accountData: editData,
        assign_to: editData.assigned_to.user_details,
        tags: editData.tags,
        leads: editData.lead,
        teams: editData.teams
      }
    })
  }

  return (
    <Box>
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
            value={value} onChange={handleChange}
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
                count={value === 0 ? accountData && accountData.open_accounts && accountData.open_accounts.length : accountData.close_accounts.length}
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
                    marginTop: '-5px',
                    marginLeft: '0px'
                  },
                  backgroundColor: 'white',
                  borderRadius: 1,
                  height: '10%',
                  overflow: 'hidden',
                  p: 0,
                  m: 0,
                  width: '37%',
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
                }} size='small'
              >
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: 'whitesmoke', fill: '#1A3353', mr: 1 }} />
                <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353' }}>
                  {
                    value === 0
                      ? `${openOffset + 1} to
                      ${accountData.accountLength > 0
                      ? values
: 0}`
                      : `${closeOffset + 1} to
                      ${closeInitial.closed_accounts_length >
                      closeOffset + 10
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
                Add Accounts
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
      <div>
        <TabPanel value={value} index={0}>
          <Box sx={{ width: '100%', mt: 3 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                numSelectedId={selectedId}
                isSelectedId={isSelectedId}
                getAccount={getAccount}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={value === 0 ? accountData.accountLength : accountData.closed_accounts_length}
                    numSelectedId={selectedId}
                    isSelectedId={isSelectedId}
                  />
                  <TableBody>
                    {
                      accountData && accountData.open_accounts
                        ? stableSort(accountData && accountData.open_accounts, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                            const isItemSelected = isSelected(item.name)

                            const labelId = `enhanced-table-checkbox-${index}`
                            return (
                              <TableRow
                                tabIndex={-1}
                                key={index}
                                sx={{
                                  border: 0,
                                  '&:nth-of-type(even)': {
                                    backgroundColor: '#F2F2F7'
                                  },
                                  color: 'rgb(26, 51, 83)'
                                }}
                              >
                                <TableCell
                                  padding='checkbox'
                                  sx={{ border: 0, color: 'inherit' }}
                                >
                                  <Checkbox
                                    onClick={(event) =>
                                      handleClick(event, item.name, item, item.id)}
                                    checked={isItemSelected}
                                    inputProps={{
                                      'aria-labelledby': labelId
                                    }}
                                    sx={{
                                      border: 0,
                                      color: 'inherit',
                                      opacity: 0.5
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  component='th'
                                  id={labelId}
                                  scope='row'
                                  sx={{ border: 0, color: 'rgb(26, 51, 83)', cursor: 'pointer' }}
                                  onClick={() => accountHandle(item)}
                                >
                                  {item.name}
                                </TableCell>
                                <TableCell
                                  align='left'
                                  sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                >
                                  {item.website ? item.website : '--'}
                                </TableCell>
                                <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
                                  {
                                    item && item.created_by
                                      ? <UserDetails created_by={item.created_by} />
                                      : '--'
                                  }
                                </TableCell>
                                <TableCell
                                  align='left'
                                  sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                >
                                  {item.billing_country ? item.billing_country : '---'}
                                </TableCell>
                                <TableCell
                                  align='left'
                                  sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                >
                                  <div style={{ display: 'flex' }}>
                                    {
                                      item.tags && item.tags.length > 0
                                        ? item.tags.map((tagData) => (
                                          <Tags tags={tagData} />
                                        ))
                                        : '--'
                                    }
                                  </div>
                                </TableCell>
                                <TableCell align='left' sx={{ border: 0 }}>
                                  <IconButton>
                                    <EditIcon onClick={() => EditItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                  </IconButton>
                                  <IconButton>
                                    <DeleteOutlineIcon onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        : ''
                    }
                    {
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {
              isDelete
                ? <DeleteAccount
                    deleteItemId={deleteItemId} isDelete={isDelete}
                    onClose={onclose}
                    onDelete={onDelete}
                  />
                : ' '
            }
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ width: '100%', mt: 3 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                numSelectedId={selectedId}
                isSelectedId={isSelectedId}
                getAccount={getAccount}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={value === 0
                      ? accountData.accountLength
                      : accountData.closed_accounts_length}
                    numSelectedId={selectedId}
                    isSelectedId={isSelectedId}
                  />
                  <TableBody>
                    {
                      value !== 0 && accountData && accountData.close_accounts
                        ? accountData.close_accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                          const isItemSelected = isSelected(item.name)
                          const labelId = `enhanced-table-checkbox-${index}`
                          return (
                            <TableRow
                              tabIndex={-1}
                              key={index}
                              sx={{
                                border: 0,
                                '&:nth-of-type(even)': {
                                  backgroundColor: '#F2F2F7'
                                },
                                color: 'rgb(26, 51, 83)'
                              }}
                            >
                              <TableCell
                                padding='checkbox'
                                sx={{ border: 0, color: 'inherit' }}
                              >
                                <Checkbox
                                  onClick={(event) => handleClick(event, item.name, item, item.id)}
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId
                                  }}
                                  sx={{ border: 0, color: 'inherit', opacity: 0.5 }}
                                />
                              </TableCell>
                              <TableCell
                                component='th'
                                id={labelId}
                                scope='row'
                                padding='none'
                                sx={{ border: 0, color: ' rgb(26, 51, 83)' }}
                              >
                                {item.name}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item.website ? item.website : '--'}
                              </TableCell>
                              <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
                                {
                                item && item.created_by
                                  ? <UserDetails created_by={item.created_by} />
                                  : '--'
                              }
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {item.country ? item.country : '---'}
                              </TableCell>
                              <TableCell
                                align='left'
                                sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                              >
                                {
                                  item.tags.name
                                    ? item.tags.map((tagData) => (
                                      <Tags tags={tagData} />
                                    ))
                                    : '---'
                                }
                              </TableCell>
                              <TableCell align='left' sx={{ border: 0 }}>
                                <IconButton>
                                  <EditIcon style={{ fill: '#1A3353' }} />
                                </IconButton>
                                <IconButton>
                                  <DeleteOutlineIcon onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353' }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )
                        })
                        : ''
                    }
                    {
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {
              isDelete
                ? <DeleteAccount
                    deleteItemId={deleteItemId}
                    isDelete={isDelete}
                    onClose={onclose}
                    onDelete={onDelete}
                  />
                : ' '
            }
          </Box>
        </TabPanel>
        {loader && <Spinner />}
      </div>

    </Box>
  )
}
