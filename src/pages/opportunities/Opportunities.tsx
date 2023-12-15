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
import { OpportunityUrl } from '../../services/ApiUrls';
import { DeleteModal } from '../../components/DeleteModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { EnhancedTableHead } from '../../components/EnchancedTableHead';


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
  }, [currentPage, recordsPerPage]);

  const getOpportunities = async () => {
    const Header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Token'),
      org: localStorage.getItem('org')
    }
    try {
      const offset = (currentPage - 1) * recordsPerPage;
      await fetchData(`${OpportunityUrl}/?offset=${offset}&limit=${recordsPerPage}`, 'GET', null as any, Header)
        // fetchData(`${OpportunityUrl}/`, 'GET', null as any, Header)
        .then((res) => {
          // console.log(res, 'Opportunity')
          if (!res.error) {
            setOpportunities(res?.opportunities)
            // setOpenOpportunities(res?.open_leads?.open_leads)
            // setOpenOpportunitiesCount(res?.open_leads?.leads_count)
            // setClosedOpportunities(res?.close_leads?.close_leads)
            // setClosedOpportunitiesCount(res?.close_leads?.leads_count)
            setTotalPages(Math.ceil(res?.opportunities_count / recordsPerPage));
            setContacts(res?.contacts_list)
            setAccount(res?.accounts_list)
            setCurrency(res?.currency)
            setLeadSource(res?.lead_source)
            setStage(res?.stage)
            setTags(res?.tags)
            setTeams(res?.teams)
            setUsers(res?.users)
            setCountries(res?.countries)
            setLoading(false)
          }
        })
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setTab(val)
  }

  const onAddOpportunity = () => {
    if (!loading) {
      navigate('/app/opportunities/add-opportunity', {
        state: {
          detail: false,
          contacts: contacts || [], leadSource: leadSource || [], currency: currency || [], tags: tags || [], account: account || [], stage: stage || [], users: users || [], teams: teams || [], countries: countries || []
        }
      })
    }
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
    const Header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Token'),
      org: localStorage.getItem('org')
    }
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
  const handlePreviousPage = () => {
    setLoading(true)
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setLoading(true)
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleRecordsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    setRecordsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
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
            onChange={(e: any) => handleRecordsPerPage(e)}
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
            <FabLeft onClick={handlePreviousPage} disabled={currentPage === 1}>
              <FiChevronLeft style={{ height: '15px' }} />
            </FabLeft>
            <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', textAlign: 'center' }}>
              {currentPage} to {totalPages}
              {/* {renderPageNumbers()} */}
            </Typography>
            <FabRight onClick={handleNextPage} disabled={currentPage === totalPages}>
              <FiChevronRight style={{ height: '15px' }} />
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
                  headCells={headCells}
                />
                <TableBody>
                  {
                    opportunities?.length > 0
                      ? stableSort(opportunities, getComparator(order, orderBy)).map((item: any, index: any) => {
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => {
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
                              className='tableCell-link'
                              onClick={() => opportunityDetail(item.id)}
                            >
                              {item?.name ? item?.name : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.account ? item?.account?.name : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.assigned_to ? <Avatar src={item?.assigned_to} alt={item?.assigned_to} /> : '----'}
                              {/* <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                  <Avatar src={item?.lead?.created_by?.profile_pic} alt={item?.lead?.created_by?.email} /><Stack sx={{ ml: 1 }}>{item?.lead?.account_name ? item?.lead?.account_name : '---'}</Stack>
                                </Stack> */}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.stage ? item?.stage : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.created_on_arrow ? item?.created_on_arrow : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.tags?.length ? item?.tags.map((tag: any, i: any) => <Stack sx={{ mr: 0.5 }}> <Label tags={tag} /></Stack>) : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
                              {item?.lead_source ? item?.lead_source : '---'}
                            </TableCell>
                            <TableCell className='tableCell'>
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
