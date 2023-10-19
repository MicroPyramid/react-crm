import React from 'react'
import {
  AppBar,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material'
import { FaArrowLeft, FaCheckCircle, FaEdit, FaPlusCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/Context';
export function CustomAppBar(props: any) {
  const location = useLocation();
  const sharedData = useMyContext();
  const navigate = useNavigate()

  const { backbtnHandle, editHandle, module, crntPage, backBtn, onCancel, onSubmit } = props
  const Module = module.toLowerCase()
  return (
    <AppBar sx={{
      backgroundColor: '#1A3353', height: '44px', justifyContent: 'center', marginTop: '-3px', boxShadow: 'none',
      //  position: 'fixed', 
      top: '64px', 
      left: sharedData === 200 ? '200px' : '60px',
      width: '-webkit-fill-available'
    }}
      position='fixed'
    >
      <div className='breadcomContainer'>
        <div role='presentation' style={{ marginLeft: '10px' }}>
          <Breadcrumbs aria-label='breadcrumb'
            sx={{ '.MuiBreadcrumbs-separator': { color: 'white' } }}
          //   className={classes.breadcrumbs}
          >
            <Link underline='hover' color='lightgray' fontSize='16px' href='/'>
              Dashboard
            </Link>
            <Link
              underline='hover'
              color='lightgray'
              fontSize='16px'
              onClick={() => navigate(`/app/${Module}`)}
              style={{ cursor: 'pointer' }}
            >
              {module}
            </Link>
            <Link style={{ color: 'white' }} underline='none' fontSize='16px'>{crntPage}</Link>
          </Breadcrumbs>
        </div>
        {location.state?.detail ?
          <div className='saveClose'>

            <div style={{ marginRight: '5px' }}>
              <Button
                size='small'
                onClick={backbtnHandle}
                startIcon={<FaArrowLeft style={{ fill: '#1A3353', width: '10px', marginTop: '-1px', marginLeft: '2px' }} />}
                style={{ textTransform: 'none', fontSize: '16px', backgroundColor: 'whitesmoke', color: '#5B5C63', height: '32px', minHeight: '32px', paddingBottom: '3px' }}
              >
                {backBtn}
              </Button>
            </div>
            <div>
              <Button
                type='submit'
                variant='contained'
                size='small'
                onClick={editHandle}
                startIcon={<FaEdit style={{ fill: 'white', width: '16px', marginTop: '-1px', marginLeft: '2px' }} />}
                style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
              >
                Edit
              </Button>
            </div>

          </div> :
          <div className='saveClose'>
            <div style={{ marginRight: '5px' }}>
              <Button
                size='small'
                onClick={backbtnHandle}
                startIcon={<FaArrowLeft color='primary' style={{ width: '10px', marginTop: '-1px', marginLeft: '2px' }} />}
                style={{ textTransform: 'none', fontSize: '16px', backgroundColor: 'whitesmoke', color: '#5B5C63', height: '32px', minHeight: '32px', paddingBottom: '3px' }}
              >
                {backBtn}
              </Button>
            </div>
            <div style={{ marginRight: '5px' }}>
              <Button
                // onClick={backbtnHandle}
                onClick={onCancel}
                size='small'
                variant='contained'
                startIcon={<FaPlusCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
                style={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px' }}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                // type='submit'
                onClick={onSubmit}
                variant='contained'
                size='small'
                startIcon={<FaCheckCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
                style={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px' }}
              >
                Save
              </Button>
            </div>
          </div>
        }
      </div>
    </AppBar>
  )
}
