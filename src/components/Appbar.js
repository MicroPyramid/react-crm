import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  AppBar,
  Link,
  Breadcrumbs,
  Button
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CheckIcon from '@mui/icons-material/Check'

const useStyles = makeStyles({
  breadcrumbs: {
    color: 'white'
  }
})

export function Appbar (props) {
  const classes = useStyles()
  const { backbtnHandle, module, backBtn, crntPage } = props

  return (
    <AppBar
      style={{
        backgroundColor: '#1A3353',
        height: '44px',
        justifyContent: 'center',
        width: '100%',
        marginTop: '-3px'
      }} position='static'
    >
      <div className='breadcomContainer'>
        <div role='presentation' style={{ marginLeft: '10px' }}>
          <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumbs}>
            <Link underline='hover' color='lightgray' fontSize='13px' href='/'>
              Dashboard
            </Link>
            <Link
              underline='hover'
              color='lightgray'
              fontSize='13px'
              onClick={backbtnHandle}
              sx={{ cursor: 'pointer' }}
            >
              {module}
            </Link>
            <Link style={{ color: 'white' }} underline='none' fontSize='13px'>{crntPage}</Link>
          </Breadcrumbs>
        </div>
        <div className='saveClose'>
          <div style={{ marginRight: '5px' }}>
            <Button
              size='small'
              onClick={backbtnHandle}
              startIcon={<ArrowBackIosNewIcon color='primary' />}
              style={{ textTransform: 'capitalize', fontSize: '12px', backgroundColor: 'whitesmoke', color: '#5B5C63' }}
            >
              {backBtn}
            </Button>
          </div>
          <div style={{ marginRight: '5px' }}>
            <Button
              onClick={backbtnHandle}
              size='small'
              variant='contained'
              startIcon={<AddCircleOutlineIcon style={{ fill: 'white' }} />}
              style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '13px' }}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              type='submit'
              variant='contained'
              size='small'
              startIcon={<CheckIcon style={{ fill: 'white' }} />}
              style={{ textTransform: 'lowercase', fontWeight: 'bold', fontSize: '13px' }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </AppBar>
  )
}
