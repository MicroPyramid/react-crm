import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, TableCell, IconButton, Checkbox, Tooltip, TableSortLabel, alpha, MenuItem, Select, Avatar, Fab, Container, TextField } from '@mui/material'
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiChevronUp } from "@react-icons/all-files/fi/FiChevronUp";
import { CustomTab, CustomToolbar, FabLeft, FabRight } from '../../styles/CssStyled';
import { getComparator, stableSort } from '../../components/Sorting';
import { FaAd, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { fetchData } from '../../components/FetchData';
import { AccountsUrl, Header } from '../../services/ApiUrls';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../components/DeleteModal';
import { Tags } from '../../components/Tags';
import { Spinner } from '../../components/Spinner';
import styled from '@emotion/styled';
import '../../styles/style.css';

interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'user_name',
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
    }, {
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
export default function Accounts() {
    const navigate = useNavigate()

    const [tab, setTab] = useState('open');
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('Website')
    const [initial, setInitial] = useState(true)
    const [openOffset, setOpenOffset] = useState(0)
    const [openValue] = useState(1)
    const [closeOffset, setCloseOffset] = useState(0)
    const [setCloseValue] = useState(1)
    const [deleteItems, setDeleteItems] = useState([])
    const [page, setPage] = useState(0)
    const [values, setValues] = useState(10)
    const [dense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [deleteItemId, setDeleteItemId] = useState('')
    const [loader, setLoader] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false);

    const [contacts, setContacts] = useState([])
    const [status, setStatus] = useState([])
    const [source, setSource] = useState([])
    const [companies, setCompanies] = useState([])
    const [tags, setTags] = useState([])
    const [users, setUsers] = useState([])
    const [countries, setCountries] = useState([])
    const [industries, setIndustries] = useState([])
    const [leads, setLeads] = useState([])
    const [teams, setTeams] = useState([])

    const [openAccounts, setOpenAccounts] = useState<Item[]>([])
    const [openAccountsCount, setOpenAccountsCount] = useState(0)
    const [openAccountsOffset, setOpenAccountsOffset] = useState(0)
    const [closedAccounts, setClosedAccounts] = useState<Item[]>([])
    const [closedAccountsCount, setClosedAccountsCount] = useState(0)
    const [closedAccountsOffset, setClosedAccountsOffset] = useState(0)
    const [deleteRowModal, setDeleteRowModal] = useState(false)

    const [selected, setSelected] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [isSelectedId, setIsSelectedId] = useState<boolean[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        getAccounts()
    }, [])

    const handleChangeTab = (e: SyntheticEvent, val: any) => {
        setTab(val)
    }

    const getAccounts = () => {
        fetchData(`${AccountsUrl}/?offset=${tab === "open" ? openOffset : closeOffset}`, 'GET', null as any, Header)
            .then((res: any) => {
                if (!res.error) {
                    console.log(res, 'accounts')
                    if (initial) {
                        setOpenAccounts(res?.active_accounts?.open_accounts)
                        // setOpenAccountsCount(res?.active_accounts?.active_users_count)
                        setOpenAccountsOffset(res?.active_accounts?.offset)
                        setClosedAccounts(res?.closed_accounts?.close_accounts)
                        // setClosedAccountsCount(res?.closed_accounts?.close_accounts_count)
                        setClosedAccountsOffset(res?.closed_accounts?.offset)
                        setContacts(res?.contacts)
                        setIndustries(res?.industries)
                        setUsers(res?.users)
                        setStatus(res?.status)
                        setCountries(res?.countries)
                        setLeads(res?.leads)
                        setTags(res?.tags)
                        setTeams(res?.teams)
                    }
                }
            })
            .catch((error: any) => console.error('error', error))
    }

    const accountDetail = (accountId: any) => {
        navigate(`/app/accounts/account-details`, { state: { accountId, detail: true ,contacts: contacts || [], status: status || [], tags: tags || [], users: users || [], countries: countries || [], teams: teams || [], leads: leads || []} })
    }

    const next = () => {
        // if (tab === 0 &&
        //   accountData.accountLength > 0) {
        //   setOpenOffset(values)
        //   setValues(values + rowsPerPage)
        // } else if (tab === 1 &&
        //   accountData.closed_accounts_length > closeOffset + 10) {
        //   setCloseOffset(closeOffset + 10)
        //   setCloseValue(closeValue + 10)
        // }
    }

    const previous = () => {
        // if (tab === 0 && openOffset > 0) {
        //   setOpenOffset(openOffset - rowsPerPage)
        //   setValues(values - rowsPerPage)
        // } else if (tab === 1 && closeOffset > 0) {
        //   setCloseOffset(closeOffset - 10)
        //   setCloseValue(openValue - 10)
        // }
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

    const deleteItemBox = (deleteId: any) => {
        setDeleteItemId(deleteId)
        setIsDelete(!isDelete)
    }

    const onclose = () => {
        setIsDelete(!isDelete)
    }

    const onDelete = (id: any) => {
        fetchData(`${AccountsUrl}/${id}/`, 'delete', null as any, Header)
            .then((data) => {
                if (!data.error) {
                    getAccounts()
                    setIsDelete(false)
                }
            })
            .catch(() => {
            })
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 7) : 0

    const onAddAccount = () => {
        navigate('/app/accounts/add-account', {
            state: {
                detail: false,
                contacts: contacts || [], status: status || [], tags: tags || [], users: users || [], countries: countries || [], teams: teams || [], leads: leads || []
            }
        })
    }
    const deleteRow = (id: any) => {
        setSelectedId(id)
        setDeleteRowModal(!deleteRowModal)
    }



    const EditItem = (accountId: any) => {
        getAccountDetail(accountId)
    }

    const deleteRowModalClose = () => {
        setDeleteRowModal(false)
        setSelectedId([])
    }
    const deleteItem = () => {
        fetchData(`${AccountsUrl}/${selectedId}/`, 'DELETE', null as any, Header)
            .then((res: any) => {
                console.log('delete:', res);
                if (!res.error) {
                    deleteRowModalClose()
                    getAccounts()
                }
            })
            .catch(() => {
            })
    }

    const handleSelectAllClick = () => {
        if (tab === 'open') {
            if (selected.length === openAccounts.length) {
                setSelected([]);
                setSelectedId([]);
                setIsSelectedId([]);
            } else {
                const newSelectedIds = openAccounts.map((account) => account.id);
                setSelected(newSelectedIds);
                setSelectedId(newSelectedIds);
                setIsSelectedId(newSelectedIds.map(() => true));
            }
        } else {
            if (selected.length === closedAccounts.length) {
                setSelected([]);
                setSelectedId([]);
                setIsSelectedId([]);
            } else {
                const newSelectedIds = closedAccounts.map((account) => account.id);
                setSelected(newSelectedIds);
                setSelectedId(newSelectedIds);
                setIsSelectedId(newSelectedIds.map(() => true));
            }
        }

    };

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

    const getAccountDetail = (id: any) => {
        fetchData(`${AccountsUrl}/${id}/`, 'GET', null as any, Header)
            .then((res) => {
                console.log(res, 'resDetail');
                if (!res.error) {
                    const data = res?.account_obj
                    navigate('/app/accounts/edit-account', {
                        state: {
                            value: {
                                // email: data?.email,
                                // name: data?.name,
                                // role: data?.role,
                                // phone: data?.phone,
                                // alternate_phone: data?.alternate_phone,
                                // address_line: data?.address?.address_line,
                                // street: data?.address?.street,
                                // city: data?.address?.city,
                                // state: data?.address?.state,
                                // pincode: data?.address?.postcode,
                                // country: data?.address?.country,
                                // profile_pic: data?.user_details?.profile_pic,
                                // has_sales_access: data?.has_sales_access,
                                // has_marketing_access: data?.has_marketing_access,
                                // is_organization_admin: data?.is_organization_admin,
                            }, accountId: id, edit: true
                        }
                    })
                }
            })
    }
    const handleDelete = (id: any) => {
        console.log(id, 's;ected')
    }
    const modalDialog = 'Are You Sure You want to delete this Account?'
    const modalTitle = 'Delete Account'

    const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]

    // const selectClasses = selectOpen ? 'select-opened' : '';
    // console.log(!!(selectedId?.length === 0), 'asd');

    return (
        <Box sx={{ mt: '60px' }}>
            <CustomToolbar>
                <Tabs defaultValue={tab} onChange={handleChangeTab} sx={{ mt: '26px' }}>
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
                </Tabs>

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
                        onClick={onAddAccount}
                        className={'add-button'}
                    >
                        Add Account
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
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={tab === 'open' ? openAccounts?.length : closedAccounts?.length}
                                    numSelectedId={selectedId}
                                    isSelectedId={isSelectedId}
                                />
                                {tab === 'open' ?
                                    <TableBody>
                                        {
                                            openAccounts?.length > 0
                                                ? stableSort(openAccounts, getComparator(order, orderBy))
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
                                                                    onClick={() => accountDetail(item.id)}
                                                                >
                                                                    {item?.name ? item?.name : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.website ? item?.website : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                                                        <Avatar src={item?.lead?.created_by?.profile_pic} alt={item?.lead?.created_by?.email} /><Stack sx={{ ml: 1 }}>{item?.lead?.account_name ? item?.lead?.account_name : '---'}</Stack>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.lead?.country ? item?.lead?.country : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.tags?.length ? item?.tags.map((tag: any, i: any) => <Stack sx={{ mr: 0.5 }}> Tags(tag)</Stack>) : '---'}
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
                                                : <TableRow> <TableCell colSpan={6}><Spinner /></TableCell></TableRow>
                                        }
                                        {
                                            // emptyRows > 0 && (
                                            //     <TableRow
                                            //         style={{
                                            //             height: (dense ? 33 : 53) * emptyRows
                                            //         }}
                                            //     >
                                            //         <TableCell colSpan={6} />
                                            //     </TableRow>
                                            // )

                                        }
                                    </TableBody> :
                                    <TableBody>
                                        {
                                            closedAccounts?.length > 0
                                                ? stableSort(closedAccounts, getComparator(order, orderBy))
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
                                                                    onClick={() => accountDetail(item.id)}
                                                                >
                                                                    {item?.name ? item?.name : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.website ? item?.website : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                                                        <Avatar src={item?.lead?.created_by?.profile_pic} alt={item?.lead?.created_by?.email} /><Stack sx={{ ml: 1 }}>{item?.lead?.account_name ? item?.lead?.account_name : '---'}</Stack>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.lead?.country ? item?.lead?.country : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.tags?.length ? item?.tags.map((tag: any, i: any) => <Stack sx={{ mr: 0.5 }}> Tags(tag)</Stack>) : '---'}
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
                                                : <TableRow> <TableCell colSpan={6}><Spinner /></TableCell></TableRow>
                                        }
                                    </TableBody>
                                }

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
