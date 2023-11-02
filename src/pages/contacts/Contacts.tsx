import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, Select, MenuItem, MenuProps, FormControl, InputLabel, InputBase, styled, TableCell, TableSortLabel, Container } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { getComparator, stableSort } from '../../components/Sorting';
import { Spinner } from '../../components/Spinner';
import { fetchData } from '../../components/FetchData';
import { ContactUrl, Header } from '../../services/ApiUrls';
import { AntSwitch, CustomTab, CustomToolbar, FabLeft, FabRight, StyledTableCell, StyledTableRow } from '../../styles/CssStyled';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { DeleteModal } from '../../components/DeleteModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
// import { DialogModal } from './DeleteModal';

interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'first_name',
        numeric: false,
        disablePadding: false,
        label: 'Name'
    },
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
        id: 'primary_email',
        numeric: true,
        disablePadding: false,
        label: 'Email Address'
    }, {
        id: 'mobile_number',
        numeric: true,
        disablePadding: false,
        label: 'Phone Number'
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
        <TableHead >
            <TableRow>
                {
                    headCells.map((headCell) => (
                        headCell.label === 'Action' ?
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
export default function Contacts() {
    const navigate = useNavigate()
    const [value, setValue] = useState('Open');
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([])
    const [initial, setInitial] = useState(true)
    const [valued, setValued] = useState(10)
    const [isDelete, setIsDelete] = useState(false)
    const [contact, setContact] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [contactList, setContactList] = useState([])
    const [countries, setCountries] = useState([])

    const [deleteRowModal, setDeleteRowModal] = useState(false)

    const [selected, setSelected] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState('')
    const [isSelectedId, setIsSelectedId] = useState([])
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('first_name')


    const [selectOpen, setSelectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        getContacts()
    }, [localStorage.getItem('org')])

    // const handleChangeTab = (e: SyntheticEvent, val: any) => {
    //     setValue(val)
    // }
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        setValued(parseInt(event.target.value, 10))
    }

    const getContacts = () => {
        const offset = (currentPage - 1) * recordsPerPage;
        // ?offset=${offset}&limit=${recordsPerPage}
        // fetchData(`${ContactUrl}?page=${currentPage}&limit=${recordsPerPage}/`, 'GET', null as any, Header)
        fetchData(`${ContactUrl}/`, 'GET', null as any, Header)
            .then((data) => {
                if (!data.error) {
                    console.log(data.contact_obj_list, 'contact')
                    if (initial) {
                        setContactList(data.contact_obj_list);
                        setCountries(data?.countries)
                        setLoading(false)
                        // setTotalPages(Math.ceil(result.total / recordsPerPage));
                        // setInitial(false)
                    } else {
                        // setContactList(Object.assign([], contacts, [data.contact_obj_list]))
                        setContactList(prevContactList => prevContactList.concat(data.contact_obj_list));
                        // setContactList(...contactList,data.contact_obj_list)
                        setLoading(false)
                    }
                }
            })
    }



    //   const getContacts = () => {
    //     fetchData(`${ContactUrl}/?offset=${value === 'Open' ? openOffset : closeOffset}`, 'GET', null, Header)
    //       .then((data) => {
    //         if (!data.error) {
    //           if (initial) {
    //             setContacts(...contacts, {
    //               contactObj: data.contact_obj_list,
    //               contacts_count: data.contacts_count
    //             })
    //             setLoader(false)
    //             setInitial(false)
    //           } else {
    //             setContacts({
    //               contactObj: data?.contact_obj_list,
    //               contacts_count: data.contacts_count
    //             })
    //           }
    //         }
    //       })
    //   }
    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const DeleteItem = () => {
        fetchData(`${ContactUrl}/${selectedId}/`, 'DELETE', null as any, Header)
            .then((res: any) => {
                console.log('delete:', res);
                if (!res.error) {
                    deleteRowModalClose()
                    getContacts()
                }
            })
            .catch(() => {
            })
    }

    //   const next = () => {
    //     if (value === 0 && contacts.contacts_count > 0) {
    //       setOpenOffset(valued)
    //       setValued(valued + rowsPerPage)
    //     } else if (value === 1 && contacts.close_opportunities_count > closeOffset + 10) {
    //       setCloseOffset(closeOffset + 10)
    //       setCloseValue(closeValue + 10)
    //     }
    //   }

    //   const previous = () => {
    //     if (value === 0 && openOffset > 0) {
    //       setOpenOffset(openOffset - rowsPerPage)
    //       setValued(valued - rowsPerPage)
    //     } else if (value === 1 && closeOffset > 0) {
    //       setCloseOffset(closeOffset - 10)
    //       setCloseValue(openValue - 10)
    //     }
    //   }
    // const history = useHistory();
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecordsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 1) return null;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1) ||
                (i <= 2 && currentPage <= 4) ||
                (i >= totalPages - 1 && currentPage >= totalPages - 3)
            ) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            } else if ((i === 3 && currentPage > 4) || (i === totalPages - 2 && currentPage < totalPages - 3)) {
                pageNumbers.push(<span key={-i}>...</span>);
            }
        }
        return pageNumbers;
    };

    const onAddHandle = () => {
        navigate('/app/contacts/add-contacts', { state: { countries } })
        // navigate('/contacts/add-contacts?page=add-contacts')
    }

    const contactHandle = (contactId: any) => {
        navigate(`/app/contacts/contact-details`, { state: { contactId, detail: true } })
    }

    const deleteRow = (deleteId: any) => {
        setDeleteRowModal(true)
        setSelectedId(deleteId)
    }
    const deleteRowModalClose = () => {
        setDeleteRowModal(false)
        setSelectedId('')
    }
    const modalDialog = 'Are You Sure you want to delete this contact?'
    const modalTitle = 'Delete Contact'

    const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]
    // console.log(contactList, 'cccc')

    return (
        <Box sx={{
            mt: '60px'
            // , width: '1376px' 
        }}>
            <CustomToolbar sx={{ flexDirection: 'row-reverse' }}>
                {/* <Tabs defaultValue={value} onChange={handleChangeTab} sx={{ mt: '27px' }}>
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
                        onClick={onAddHandle}
                        className={'add-button'}
                    >
                        Add Contact
                    </Button>
                </Stack>
            </CustomToolbar>
            <Container sx={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
                <Box sx={{ width: '100%', minWidth: '100%', m: '15px 0px 0px 0px' }}>
                    <Paper sx={{ width: 'cal(100%-15px)', mb: 2, p: '0px 15px 15px 15px' }}>
                        <TableContainer sx={{ width: '100%', mb: 2 }}>
                            <Table sx={{}} aria-label='customized table'>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    // onSelectAllClick={tab === 0 ? handleSelectAllClick : ''}
                                    // onSelectAllClick={''}
                                    onRequestSort={handleRequestSort}
                                    // rowCount={tab === 0 ? usersData.active_users_count : usersData.inactive_users_count}
                                    numSelectedId={selectedId}
                                    isSelectedId={isSelectedId}
                                />
                                {/* <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Name</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Email</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Phone Number</StyledTableCell>
                                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Do Not Call</StyledTableCell> 
                        <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead> */}
                                <TableBody>
                                    {
                                        contactList?.length
                                            ? stableSort(contactList, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align='left' style={{ textTransform: 'capitalize', cursor: 'pointer', color: '#3E79F7',border:0 }} onClick={() => contactHandle(item)}>{item.first_name + ' ' + item.last_name}</StyledTableCell>
                                                        <StyledTableCell align='left' sx={{border:0}}><p >{item.primary_email}</p></StyledTableCell>
                                                        <StyledTableCell align='left' sx={{border:0}}>{item.mobile_number ? item.mobile_number : '-'}</StyledTableCell>
                                                        {/* <StyledTableCell align='left'>
                                                <AntSwitch checked={item.do_not_call} inputProps={{ 'aria-label': 'ant design' }} />
                                            </StyledTableCell> */}
                                                        <StyledTableCell align='left' sx={{border:0}}><FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteRow(item.id)} /></StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                            : ''
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {loading && <Spinner />}
                    </Paper>
                </Box>
            </Container>
            {
                <DeleteModal
                    onClose={deleteRowModalClose}
                    open={deleteRowModal}
                    id={selectedId}
                    modalDialog={modalDialog}
                    modalTitle={modalTitle}
                    DeleteItem={DeleteItem}
                />
                // <DialogModal
                //     contact={contact}
                //     isDelete={isDelete}
                //     modalDialog={modalDialog}
                //     onClose={onclose}
                //     onDelete={onDelete}
                // />
            }
        </Box >
    )
}
