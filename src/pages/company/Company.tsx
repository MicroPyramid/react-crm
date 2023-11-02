import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, Select, MenuItem, MenuProps, FormControl, InputLabel, InputBase, styled, TableCell, TableSortLabel, Container } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { getComparator, stableSort } from '../../components/Sorting';
import { Spinner } from '../../components/Spinner';
import { fetchData } from '../../components/FetchData';
import { CompaniesUrl, CompanyUrl, ContactUrl, Header } from '../../services/ApiUrls';
import { AntSwitch, CustomTab, CustomToolbar, FabLeft, FabRight, StyledTableCell, StyledTableRow } from '../../styles/CssStyled';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { DeleteModal } from '../../components/DeleteModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
// import { DeleteModal } from './DeleteModal';

interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: ''
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Company'
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
        <TableHead sx={{ width: '100%' }}>
            <TableRow sx={{ width: '100%' }}>
                {
                    headCells.map((headCell) => (
                        headCell.label === 'Action' || headCell.label === '' ? <TableCell
                            sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)', width: headCell.label === '' ? '5%' : '30%' }}
                            key={headCell.id}
                            align={headCell.numeric ? 'left' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}>{headCell.label}</TableCell> :
                            <TableCell
                                sx={{ fontWeight: 'bold', color: 'rgb(26, 51, 83)', width: '65%' }}
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
export default function Company() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [companyList, setCompanyList] = useState([]);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [deleteRowModal, setDeleteRowModal] = useState(false)

    const [selected, setSelected] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState('')
    const [isSelectedId, setIsSelectedId] = useState([])
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')

    const [selectOpen, setSelectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        getCompany()
    }, [])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const getCompany = () => {
        fetchData(`${CompaniesUrl}`, 'GET', null as any, Header)
            .then((data) => {
                if (!data.error) {
                    console.log(data);

                    setCompanyList(data.data);
                    setLoading(false)
                }
            })
    }

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const DeleteItem = () => {
        fetchData(`${CompanyUrl}/${selectedId}`, 'DELETE', null as any, Header)
            .then((res: any) => {
                console.log('delete:', res);
                if (!res.error) {
                    deleteRowModalClose()
                    getCompany()
                }
            })
            .catch(() => {
            })
    }

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

    const addCompany = () => {
        navigate('/app/companies/add-company')
    }

    const companyDetail = (companyId: any) => {
        navigate(`/app/companies/company-details`, { state: { companyId, detail: true } })
    }

    const deleteRow = (deleteId: any) => {
        setDeleteRowModal(true)
        setSelectedId(deleteId)
    }
    const deleteRowModalClose = () => {
        setDeleteRowModal(false)
        setSelectedId('')
    }
    const modalDialog = 'Are You Sure you want to delete this company?'
    const modalTitle = 'Delete Company'

    const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]
    // console.log(contactList, 'cccc')

    return (
        <Box sx={{ mt: '60px' }}>
            <CustomToolbar sx={{ flexDirection: 'row-reverse' }}>
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
                        onClick={addCompany}
                        className={'add-button'}
                    >
                        Add Company
                    </Button>
                </Stack>
            </CustomToolbar>
            <Container sx={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
                <Box sx={{ width: '100%', minWidth: '100%', m: '15px 0px 0px 0px' }}>
                    <Paper sx={{ width: 'cal(100%-15px)', mb: 2, p: '0px 15px 15px 15px' }}>
                        <TableContainer >
                            <Table sx={{ minWidth: 600 }} aria-label='customized table'>
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
                                        companyList?.length
                                            ? stableSort(companyList, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align='left' sx={{border:0}}><p >{index + 1}</p></StyledTableCell>
                                                        <StyledTableCell align='left' style={{ textTransform: 'capitalize', cursor: 'pointer', color: '#3E79F7',border:0 }} onClick={() => companyDetail(item)}>{item.name}</StyledTableCell>
                                                        <StyledTableCell align='left' sx={{border:0}}><FaTrashAlt style={{ cursor: 'pointer' }}
                                                            onClick={() => deleteRow(item.id)}
                                                        /></StyledTableCell>
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
            }
        </Box >
    )
}
