import React from 'react'
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

export const EnhancedTableHead = (props: any) => {
    const {
        onSelectAllClick, order, orderBy,
        numSelected, rowCount,
        numSelectedId, isSelectedId,
        onRequestSort,
        headCells
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
                    headCells.map((headCell: any) => (
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