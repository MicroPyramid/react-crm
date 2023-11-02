import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, TableCell, IconButton, Checkbox, Tooltip, TableSortLabel, alpha, Select, MenuItem, Container } from '@mui/material'
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { CustomTab, CustomToolbar, FabLeft, FabRight } from '../../styles/CssStyled';
import { getComparator, stableSort } from '../../components/Sorting';
import { FaAd, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { fetchData } from '../../components/FetchData';
import { AccountsUrl, Header, UsersUrl, UserUrl } from '../../services/ApiUrls';
import { DialogModal } from './DeleteModal'
import { useNavigate } from 'react-router-dom';
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
    //     id: 'user_name',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'User Name'
    // },
    // {
    //     id: 'first_name',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'First Name'
    // },
    // {
    //     id: 'last_name',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Last Name'
    // },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email Address'
    }, {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'Mobile Number'
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Role'
    },
    // {
    //     id: 'user_type',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'User Type'
    // },
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
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount && numSelectedId.length > 0 && isSelectedId.length > 0}
                        // onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                        sx={{
                            // opacity: 0.5,
                            color: 'inherit'
                        }}
                    />
                </TableCell> */}
                {
                    headCells.map((headCell) => (
                        headCell.label === 'Actions' ?
                            <TableCell
                                sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}
                                key={headCell.id}
                                align={headCell.numeric ? 'left' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}>{headCell.label}</TableCell>
                            : <TableCell
                                sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}
                                key={headCell.id}
                                // fontWeight='bold'
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
                                                // <Box component='span' sx={{ visuallyHidden }}>
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
//   EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired
//   }
const EnhancedTableToolbar = (props: any) => {
    const [isDelete, setIsDelete] = useState(false)
    // const [setTab] = useState('1')
    const { numSelected } = props

    // const handleChange = (event, newValue) => {
    //   setTab(newValue)
    // }

    const onDelete = (id: any) => {
        fetchData(`${AccountsUrl}/${id}/`, 'delete', null as any, Header)
            .then((data: any) => {
                if (!data.error) {
                    props.getAccount()
                    setIsDelete(false)
                }
            })
            .catch(() => {
            })
    }
    function deleteHandle() {
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
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                <Tooltip title='Delete'>
                    <Button
                        variant='outlined'
                        onClick={numSelected > 0 ? deleteHandle : undefined}
                        startIcon={<FaTrashAlt color='red' style={{ width: '12px' }} />}
                        size='small'
                        color='error'
                        sx={{
                            opacity: 0.7, fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: 'red',
                            borderColor: 'darkgrey'
                        }}
                    >
                        Delete
                    </Button>
                </Tooltip>
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
                    ? <DialogModal
                        // <DeleteModal
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
// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     numSelectedId: PropTypes.array.isRequired,
//     iSelectedId: PropTypes.number.isRequired
//   }
type Item = {
    id: string;
    // Other properties
};
export default function Users() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('active');
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('Website')
    const [initial, setInitial] = useState(true)
    const [openOffset, setOpenOffset] = useState(0)
    const [openValue] = useState(1)
    const [closeOffset, setCloseOffset] = useState(0)
    const [setCloseValue] = useState(1)
    // const [selected, setSelected] = useState([])
    // const [selected, setSelected] = useState<string[]>([]);

    // const [selectedId, setSelectedId] = useState([])
    // const [isSelectedId, setIsSelectedId] = useState([])
    const [deleteItems, setDeleteItems] = useState([])
    const [page, setPage] = useState(0)
    const [values, setValues] = useState(10)
    const [dense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [usersData, setUsersData] = useState([])
    const [deleteItemId, setDeleteItemId] = useState('')
    const [loader, setLoader] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [activeUsers, setActiveUsers] = useState<Item[]>([])
    const [activeUsersCount, setActiveUsersCount] = useState(0)
    const [activeUsersOffset, setActiveUsersOffset] = useState(0)
    const [inactiveUsers, setInactiveUsers] = useState([])
    const [InactiveUsersCount, setInactiveUsersCount] = useState(0)
    const [inactiveUsersOffset, setInactiveUsersOffset] = useState(0)
    const [deleteRowModal, setDeleteRowModal] = useState(false)
    // const [selectedId, setSelectedId] = useState('')

    const [selectOpen, setSelectOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [isSelectedId, setIsSelectedId] = useState<boolean[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        getUsers()
    }, [])

    const handleChangeTab = (e: SyntheticEvent, val: any) => {
        setTab(val)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        setValues(parseInt(event.target.value, 10))
    }

    const getUsers = () => {
        fetchData(`${UsersUrl}/?offset=${tab === "active" ? openOffset : closeOffset}`, 'GET', null as any, Header)
            // fetchData(`${UsersUrl}/`, 'GET', null as any, Header)
            .then((res: any) => {
                if (!res.error) {
                    console.log(res, 'users')
                    if (initial) {
                        setActiveUsers(res?.active_users?.active_users)
                        setActiveUsersCount(res?.active_users?.active_users_count)
                        setActiveUsersOffset(res?.active_users?.offset)
                        setInactiveUsers(res?.inactive_users?.inactive_users)
                        setInactiveUsersCount(res?.inactive_users?.inactive_users_count)
                        setInactiveUsersOffset(res?.inactive_users?.offset)
                        // setUsersData(
                        //   ...usersData, {
                        //     active_users: data.active_users.active_users,
                        //     active_users_count: data.active_users.active_users_count,
                        //     inactive_users_count: data.inactive_users.inactive_users_count,
                        //     inactive_users: data.inactive_users.inactive_users,
                        //     roles: data.roles,
                        //     status: data.status
                        //   }
                        // )
                        // setLoader(false)
                        // setOpenOffset(initial ? 0 : openOffset)
                        // setCloseOffset(initial ? 0 : closeOffset)
                        // setInitial(false)
                    } else {
                        if (tab === 'active') {
                            //   setUsersData(
                            //     ...usersData, {
                            //       active_users: data.active_users.active_users
                            //     })
                            // setOpenOffset(initial ? 0 : openOffset)
                            // setLoader(false)
                        }
                        if (tab === 'Close' || initial) {

                            //   setUsersData(
                            //     ...usersData, {
                            //       active_users: data.active_users.active_users
                            //     })
                            // setCloseOffset(initial ? 0 : closeOffset)
                            // setLoader(false)
                        }
                    }
                }
            })
            .catch((error: any) => console.error('error', error))
    }

    const userDetail = (userId: any) => {
        navigate(`/app/users/user-details`, { state: { userId, detail: true } })
    }
    //   useEffect(() => {
    //     getUsers()
    //   }, [closeOffset, openOffset])

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

    // const handleSelectAllClick = (event: any) => {
    // if (event.target.checked) {
    //     const newSelected = rows.map((n) => n.name);
    //     setSelected(newSelected);
    //     return;
    //   }
    //   setSelected([]);
    // }
    // const selected: string[] = [...];1
    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
        // const selectedIndex = selected.indexOf(name as string);
        // let newSelected: string[] = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        // setSelected(newSelected);
    };



    // const isSelected = (name: string) => selected.indexOf(name) !== -1;

    type SelectedItem = string[];
    const isSelected = (name: string, selected: SelectedItem): boolean => {
        return selected.indexOf(name) !== -1;
    };

    // const visibleRows = React.useMemo(
    //     () =>
    //       stableSort(rows, getComparator(order, orderBy)).slice(
    //         page * rowsPerPage,
    //         page * rowsPerPage + rowsPerPage,
    //       ),
    //     [order, orderBy, page, rowsPerPage],
    //   );
    //   stableSort(usersData && usersData.active_users, getComparator(order, orderBy))
    //                                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item:any, index:any) => {
    //   const handleSelectAllClick = (event:any) => {
    //     if (event.target.checked) {
    //       const newSelecteds = usersData?.active_users?.length && usersData?.active_users.map((n:any) => n.user_details.first_name)


    //       const newSelectedDelete =  usersData?.active_users?.length && usersData?.active_users.map((id:any) => id)

    //       const newSelectedDeleteId =  usersData?.active_users?.length && usersData?.active_users.map((item:any) => item.id)

    //       setSelected(newSelecteds)
    //       setDeleteItems(selected)
    //       setDeleteItems(newSelecteds)
    //       setSelectedId(newSelectedDelete)
    //       setIsSelectedId(newSelectedDeleteId)
    //       return
    //     }
    //     setSelected([])
    //     setDeleteItems([])
    //     setSelectedId([])
    //     setIsSelectedId([])
    //   }

    //   const handleClick = (event:any, name:any, ids:any, item:any) => {
    //     const selectedWithId = selectedId.indexOf(ids)
    //     let newItemDelete = []
    //     if (selectedWithId === -1) {
    //       newItemDelete = newItemDelete.concat(selectedId, ids)
    //     } else if (selectedWithId === 0) {
    //       newItemDelete = newItemDelete.concat(selectedId.slice(1))
    //     } else if (selectedWithId === selected.length - 1) {
    //       newItemDelete = newItemDelete.concat(selectedId.slice(0, -1))
    //     } else if (selectedWithId > 0) {
    //       newItemDelete = newItemDelete.concat(
    //         selectedId.slice(0, selectedWithId),
    //         selectedId.slice(selectedWithId + 1)
    //       )
    //     }
    //     setSelectedId(newItemDelete)
    //     const selectedWithNewId = isSelectedId.indexOf(item)
    //     let newItemDeleteId = []
    //     if (selectedWithNewId === -1) {
    //       newItemDeleteId = newItemDeleteId.concat(isSelectedId, item)
    //     } else if (selectedWithNewId === 0) {
    //       newItemDeleteId = newItemDeleteId.concat(isSelectedId.slice(1))
    //     } else if (selectedWithNewId === selected.length - 1) {
    //       newItemDeleteId = newItemDeleteId.concat(isSelectedId.slice(0, -1))
    //     } else if (selectedWithNewId > 0) {
    //       newItemDeleteId = newItemDeleteId.concat(
    //         isSelectedId.slice(0, selectedWithNewId),
    //         isSelectedId.slice(selectedWithNewId + 1)
    //       )
    //     }
    //     setIsSelectedId(newItemDeleteId)
    //     const selectedIndex = selected.indexOf(name)
    //     let newSelected = []
    //     if (selectedIndex === -1) {
    //       newSelected = newSelected.concat(selected, name)
    //     } else if (selectedIndex === 0) {
    //       newSelected = newSelected.concat(selected.slice(1))
    //     } else if (selectedIndex === selected.length - 1) {
    //       newSelected = newSelected.concat(selected.slice(0, -1))
    //     } else if (selectedIndex > 0) {
    //       newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1)
    //       )
    //     }
    //     setSelected(newSelected)
    //     setDeleteItems(newSelected)
    //   }


    const deleteItemBox = (deleteId: any) => {
        setDeleteItemId(deleteId)
        setIsDelete(!isDelete)
    }

    const onclose = () => {
        setIsDelete(!isDelete)
    }

    const onDelete = (id: any) => {
        fetchData(`${UsersUrl}/${id}/`, 'delete', null as any, Header)
            .then((data) => {
                if (!data.error) {
                    getUsers()
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
    //   const isSelected = (name:string) => selected.indexOf(name) !== -1

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 7) : 0
    // (tab === 0 ? accountData.accountLength : accountData.closed_accounts_length)

    const onAddUser = () => {
        navigate('/app/users/add-users')
        // navigate('/users/add-users', {
        //   state: {
        //     roles: usersData.roles,
        //     status: usersData.status
        //   }
        // })
    }
    const deleteRow = (id: any) => {
        setSelectedId(id)
        setDeleteRowModal(!deleteRowModal)
    }

    const getUserDetail = (id: any) => {
        fetchData(`${UserUrl}/${id}/`, 'GET', null as any, Header)
            .then((res) => {
                console.log(res, 'res');
                if (!res.error) {
                    const data = res?.data?.profile_obj
                    navigate('/app/users/edit-user', {
                        state: {
                            value: {
                                email: data?.user_details?.email,
                                role: data?.role,
                                phone: data?.phone,
                                alternate_phone: data?.alternate_phone,
                                address_line: data?.address?.address_line,
                                street: data?.address?.street,
                                city: data?.address?.city,
                                state: data?.address?.state,
                                pincode: data?.address?.postcode,
                                country: data?.address?.country,
                                profile_pic: data?.user_details?.profile_pic,
                                has_sales_access: data?.has_sales_access,
                                has_marketing_access: data?.has_marketing_access,
                                is_organization_admin: data?.is_organization_admin,
                            }, id: id, edit: true
                        }
                    })
                }
            })
    }

    const EditItem = (userId: any) => {
        getUserDetail(userId)
    }
    // const [selectedRows, setSelectedRows] = useState([]);
    // const [selectedRowId, setSelectedRowId] = useState(null);

    // const handleCheckboxClick = (rowId) => {
    //     const isSelected = selectedRows.includes(rowId);
    //     let updatedSelectedRows;

    //     if (isSelected) {
    //       updatedSelectedRows = selectedRows.filter((id) => id !== rowId);
    //     } else {
    //       updatedSelectedRows = [...selectedRows, rowId];
    //     }

    //     setSelectedRows(updatedSelectedRows);
    //   };
    const deleteRowModalClose = () => {
        setDeleteRowModal(false)
        setSelectedId([])
    }
    const DeleteItem = () => {
        fetchData(`${UserUrl}/${selectedId}/`, 'DELETE', null as any, Header)
            .then((res: any) => {
                console.log('delete:', res);
                if (!res.error) {
                    deleteRowModalClose()
                    getUsers()
                }
            })
            .catch(() => {
            })
    }


    const handleSelectAllClick = () => {
        if (selected.length === activeUsers.length) {
            setSelected([]);
            setSelectedId([]);
            setIsSelectedId([]);
        } else {
            const newSelectedIds = activeUsers.map((user) => user.id);
            setSelected(newSelectedIds);
            setSelectedId(newSelectedIds);
            setIsSelectedId(newSelectedIds.map(() => true));
        }
    };

    const handleRowSelect = (userId: string) => {
        const selectedIndex = selected.indexOf(userId);
        let newSelected: string[] = [...selected];
        let newSelectedIds: string[] = [...selectedId];
        let newIsSelectedId: boolean[] = [...isSelectedId];

        if (selectedIndex === -1) {
            newSelected.push(userId);
            newSelectedIds.push(userId);
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
    const handleDelete = (id: any) => {
        console.log(id, 's;ected')
    }
    const modalDialog = 'Are You Sure You want to delete this User?'
    const modalTitle = 'Delete User'

    const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]
    // console.log(!!(selectedId?.length === 0), 'asd');

    return (
        <Box sx={{ mt: '60px' }}>
            <CustomToolbar>
                <Tabs defaultValue={tab} onChange={handleChangeTab} sx={{ mt: '26px' }}>
                    <CustomTab value="active" label="Active"
                        sx={{
                            backgroundColor: tab === 'active' ? '#F0F7FF' : '#284871',
                            color: tab === 'active' ? '#3f51b5' : 'white',
                        }}></CustomTab>
                    <CustomTab value="inactive" label="In Active"
                        sx={{
                            backgroundColor: tab === 'inactive' ? '#F0F7FF' : '#284871',
                            color: tab === 'inactive' ? '#3f51b5' : 'white',
                            ml: '5px',
                        }}
                    ></CustomTab>
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
                            <MenuItem key={i} value={item[0]} >
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
                        onClick={onAddUser}
                        className={'add-button'}
                    >
                        Add User
                    </Button>
                </Stack>
            </CustomToolbar>
            <Container sx={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
                <Box sx={{ width: '100%', minWidth: '100%', m: '15px 0px 0px 0px' }}>
                    <Paper sx={{ width: 'cal(100%-15px)', mb: 2, p: '0px 15px 15px 15px' }}>
                        {/* <Toolbar sx={{pl: { sm: 2 },pr: { xs: 1, sm: 1 }}}>
                            <Tooltip title='Delete'>
                                <Button
                                    variant='outlined'
                                    onClick={() => !!(selectedId?.length !== 0) && handleDelete(selectedId)}
                                    startIcon={<FaTrashAlt color='red' style={{ width: '12px' }} />}
                                    size='small'
                                    color='error'
                                    sx={{
                                        // opacity: 0.7,
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        color: 'red',
                                        borderColor: 'darkgrey',
                                    }}
                                >
                                    Delete
                                </Button>
                            </Tooltip>
                            {selected.length > 0 ? (
                                <Typography
                                    sx={{ flex: '1 1 100%', margin: '5px' }}
                                    color='inherit'
                                    variant='subtitle1'
                                    component='div'
                                >
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
                                    rowCount={activeUsers?.length}
                                    // rowCount={tab === 0 ? usersData.active_users_count : usersData.inactive_users_count}
                                    numSelectedId={selectedId}
                                    isSelectedId={isSelectedId}
                                />
                                {tab === 'active' ?
                                    <TableBody>
                                        {
                                            activeUsers?.length > 0
                                                ? stableSort(activeUsers, getComparator(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => {
                                                        // const isItemSelected = isSelected(item?.user_details?.email,item)
                                                        const labelId = `enhanced-table-checkbox-${index}`
                                                        const rowIndex = selectedId.indexOf(item.id);
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={index}
                                                                sx={{
                                                                    border: 0,
                                                                    '&:nth-of-type(even)': {
                                                                        backgroundColor: 'whitesmoke'
                                                                    },
                                                                    color: 'rgb(26, 51, 83)',
                                                                    textTransform: 'capitalize'
                                                                }}
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
                                                                        sx={{border: 0,color: 'inherit'}}
                                                                    />
                                                                </TableCell> */}
                                                                {/* <TableCell
                                                            align='left'
                                                            sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                        >
                                                            {item.user_details.first_name ? item.user_details.first_name : '--'}
                                                        </TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
                                                            {item.user_details.last_name ? item.user_details.last_name : '---'}
                                                        </TableCell> */}
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ cursor: 'pointer', color: '#3E79F7', textTransform: 'none',border: 0 }}
                                                                    onClick={() => userDetail(item.id)}
                                                                >
                                                                    {item?.user_details?.email ? item.user_details.email : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        {item?.phone ? item.phone : '---'}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.role ? item.role : '---'}
                                                                </TableCell>
                                                                {/* <TableCell
                                                            align='left'
                                                            sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                        >
                                                            {item.user_type ? item.user_type : '---'}
                                                        </TableCell> */}
                                                                <TableCell align='left' sx={{ border: 0 }}>
                                                                    <IconButton>
                                                                        <FaEdit
                                                                            onClick={() => EditItem(item.id)}
                                                                            style={{ fill: '#1A3353', cursor: 'pointer', width: '18px' }}
                                                                        />
                                                                        {/* <FaAd
                                                                    onClick={() => EditItemBox(item)}
                                                                    style={{ fill: '#1A3353', cursor: 'pointer' }}
                                                                /> */}
                                                                    </IconButton>
                                                                    <IconButton>
                                                                        <FaTrashAlt onClick={() => deleteRow(item?.id)} style={{ fill: '#1A3353', cursor: 'pointer', width: '15px' }} />
                                                                        {/* <FaAd onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} /> */}
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
                                    </TableBody> :
                                    <TableBody>
                                        {
                                            inactiveUsers?.length > 0
                                                ? stableSort(inactiveUsers, getComparator(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => {
                                                        // const isItemSelected = isSelected(item?.user_details?.email,item)
                                                        const labelId = `enhanced-table-checkbox-${index}`
                                                        const rowIndex = selectedId.indexOf(item.id);
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={index}
                                                                sx={{
                                                                    border: 0,
                                                                    '&:nth-of-type(even)': {
                                                                        backgroundColor: 'whitesmoke'
                                                                    },
                                                                    color: 'rgb(26, 51, 83)',
                                                                    textTransform: 'capitalize'
                                                                }}
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
                                                                        sx={{border: 0,color: 'inherit'}}
                                                                    />
                                                                </TableCell> */}
                                                                {/* <TableCell
                                                            align='left'
                                                            sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                        >
                                                            {item.user_details.first_name ? item.user_details.first_name : '--'}
                                                        </TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
                                                            {item.user_details.last_name ? item.user_details.last_name : '---'}
                                                        </TableCell> */}
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ cursor: 'pointer', color: '#3E79F7', textTransform: 'none',border: 0 }}
                                                                    onClick={() => userDetail(item.id)}
                                                                >
                                                                    {item?.user_details?.email ? item.user_details.email : '---'}
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        {item?.phone ? item.phone : '---'}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell
                                                                    align='left'
                                                                    sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                                >
                                                                    {item?.role ? item.role : '---'}
                                                                </TableCell>
                                                                {/* <TableCell
                                                            align='left'
                                                            sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
                                                        >
                                                            {item.user_type ? item.user_type : '---'}
                                                        </TableCell> */}
                                                                <TableCell align='left' sx={{ border: 0 }}>
                                                                    <IconButton>
                                                                        <FaEdit
                                                                            onClick={() => EditItem(item.id)}
                                                                            style={{ fill: '#1A3353', cursor: 'pointer', width: '18px' }}
                                                                        />
                                                                        {/* <FaAd
                                                                    onClick={() => EditItemBox(item)}
                                                                    style={{ fill: '#1A3353', cursor: 'pointer' }}
                                                                /> */}
                                                                    </IconButton>
                                                                    <IconButton>
                                                                        <FaTrashAlt onClick={() => deleteRow(item?.id)} style={{ fill: '#1A3353', cursor: 'pointer', width: '15px' }} />
                                                                        {/* <FaAd onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} /> */}
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
                DeleteItem={DeleteItem}
            />
        </Box>
    )
}

// {
//     usersData && usersData.active_users
//         ? stableSort(usersData && usersData.active_users, getComparator(order, orderBy))
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item:any, index:any) => {
//                 const isItemSelected = isSelected(item.user_details.first_name)
//                 const labelId = `enhanced-table-checkbox-${index}`
//                 return (
//                     <TableRow
//                         tabIndex={-1}
//                         key={index}
//                         sx={{
//                             border: 0,
//                             '&:nth-of-type(even)': {
//                                 backgroundColor: '#F2F2F7'
//                             },
//                             color: 'rgb(26, 51, 83)',
//                             textTransform: 'capitalize'
//                         }}
//                     >
//                         <TableCell
//                             padding='checkbox'
//                             sx={{ border: 0, color: 'inherit' }}
//                             align='left'
//                         >
//                             <Checkbox
//                                 onClick={(event) =>
//                                     handleClick(event, item.user_details.first_name, item, item.id)}
//                                 // checked={tab === 0 ? isItemSelected : ''}
//                                 inputProps={{
//                                     'aria-labelledby': labelId
//                                 }}
//                                 sx={{
//                                     border: 0,
//                                     color: 'inherit',
//                                     opacity: 0.5
//                                 }}
//                             />
//                         </TableCell>
//                         <TableCell
//                             component='th'
//                             id={labelId}
//                             scope='row'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)', cursor: 'pointer' }}
//                             // onClick={() => accountHandle(item)}
//                             align='left'
//                         >
//                             {item.user_name ? item.user_name : '---'}
//                         </TableCell>
//                         <TableCell
//                             align='left'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
//                         >
//                             {item.user_details.first_name ? item.user_details.first_name : '--'}
//                         </TableCell>
//                         <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
//                             {item.user_details.last_name ? item.user_details.last_name : '---'}
//                         </TableCell>
//                         <TableCell
//                             align='left'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)', textTransform: 'lowercase' }}
//                         >
//                             {item.user_details.email ? item.user_details.email : '---'}
//                         </TableCell>
//                         <TableCell
//                             align='left'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
//                         >
//                             <div style={{ display: 'flex' }}>
//                                 {item.phone ? item.phone : '---'}
//                             </div>
//                         </TableCell>
//                         <TableCell
//                             align='left'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
//                         >
//                             {item.role ? item.role : '---'}
//                         </TableCell>
//                         <TableCell
//                             align='left'
//                             sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
//                         >
//                             {item.user_type ? item.user_type : '---'}
//                         </TableCell>
//                         <TableCell align='left' sx={{ border: 0 }}>
//                             <IconButton>
//                                 <EditIcon
//                                     onClick={() => EditItemBox(item)}
//                                     style={{ fill: '#1A3353', cursor: 'pointer' }}
//                                 /> 
//                                 <FaAd
//                                     onClick={() => EditItemBox(item)}
//                                     style={{ fill: '#1A3353', cursor: 'pointer' }}
//                                 />
//                             </IconButton>
//                             <IconButton>
//                                  <DeleteOutlineIcon onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} /> 
//                                 <FaAd onClick={() => deleteItemBox(item)} style={{ fill: '#1A3353', cursor: 'pointer' }} />
//                             </IconButton>
//                         </TableCell>
//                     </TableRow>
//                 )
//             })
//         : ''
// }

