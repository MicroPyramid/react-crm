import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  Box,
  Typography,
  Button
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system'
import { alpha } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { visuallyHidden } from '@mui/utils'

import { fetchData } from '../../components/FetchData'
import { UserUrl } from '../../components/ApiUrls'
import { Tags } from '../../components/Tags'
import { DeleteUsers } from './DeleteUsers'

export function InActive (props) {
  return (
    <TableRow
      tabIndex={-1}
      key={props.index}
      sx={{
        border: 0,
        '&:nth-of-type(even)': {
          backgroundColor: '#F2F2F7'
        },
        color: 'rgb(26, 51, 83)',
        textTransform: 'capitalize'
      }}
    >
      <TableCell
        padding='checkbox'
        sx={{ border: 0, color: 'inherit' }}
        align='left'
      >
        <Checkbox
          onClick={(event) =>
            props.handleClick(event, props.item.user_details.first_name, props.item, props.item.id)}
          checked={props.isItemSelected}
          inputProps={{
            'aria-labelledby': props.labelId
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
        id={props.labelId}
        scope='row'
        sx={{ border: 0, color: ' rgb(26, 51, 83)' }}
        onClick={() => props.accountHandle(props.item)}
        align='left'
      >
        {props.item.user_details.first_name ? props.item.user_details.first_name : '---'}
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
      >
        {props.item.user_details.first_name ? props.item.user_details.first_name : '--'}
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
      >
        {props.item.user_details.last_name ? props.item.user_details.last_name : '---'}
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)', textTransform: 'lowercase' }}
      >
        {props.item.user_details.email ? props.item.user_details.email : '---'}
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
      >
        <div style={{ display: 'flex' }}>
          {props.item.phone ? props.item.phone : '---'}
        </div>
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
      >
        {props.item.role ? props.item.role : '---'}
      </TableCell>
      <TableCell
        align='left'
        sx={{ border: 0, color: 'rgb(26, 51, 83)' }}
      >
        {props.item.role ? props.item.role : '---'}
      </TableCell>
      <TableCell align='left' sx={{ border: 0 }}>
        <IconButton>
          <EditIcon onClick={() => props.EditItemBox(props.item)} style={{ fill: '#1A3353' }} />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon onClick={() => props.deleteItemBox(props.item)} style={{ fill: '#1A3353' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
