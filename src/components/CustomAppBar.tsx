import React from 'react'
import {
  AppBar,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material'
import { FaArrowLeft, FaCheckCircle, FaCross, FaEdit, FaPlusCircle, FaTimesCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/Context';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
export function CustomAppBar(props: any) {
  const location = useLocation();
  const sharedData = useMyContext();
  const navigate = useNavigate()

  const { backbtnHandle, editHandle, module, crntPage, backBtn, onCancel, onSubmit } = props
  const Module = module.toLowerCase()
  return (
    <AppBar sx={{
      backgroundColor: '#1A3353', height: '50px', justifyContent: 'center', marginTop: '-3px', boxShadow: 'none',
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
            <Link underline='hover' color='lightgray' fontSize='15px' href='/' sx={{ ml: '15px', fontWeight: 600 }}>
              Dashboard
            </Link>
            <Link
              underline='hover'
              color='lightgray'
              fontSize='15px'
              onClick={() => navigate(`/app/${Module}`)}
              sx={{ cursor: 'pointer', fontWeight: 600 }}
            >
              {module}
            </Link>
            <Link style={{ color: 'white', fontWeight: 600 }} underline='none' fontSize='15px'>{crntPage}</Link>
          </Breadcrumbs>
        </div>
        {location.state?.detail ?
          <div className='saveClose'>
            <div style={{ marginRight: '10px' }}>
              <Button
                size='small'
                className='header-button'
                onClick={backbtnHandle}
                startIcon={<FiChevronLeft style={{ fontSize: '20px', marginRight: '-2px' }} />}
                style={{ backgroundColor: 'white', color: '#5B5C63' }}
              >
                {backBtn}
              </Button>
            </div>
            <div>
              <Button
                type='submit'
                variant='contained'
                className='header-button'
                size='small'
                onClick={editHandle}
                startIcon={<FaEdit style={{ fill: 'white', width: '16px' }} />}
                style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px' }}
              >
                Edit
              </Button>
            </div>

          </div> :
          <div className='saveClose'>
            <div style={{ marginRight: '10px' }}>
              <Button
                className='header-button'
                size='small'
                onClick={backbtnHandle}
                startIcon={<FiChevronLeft style={{ fontSize: '20px', marginRight: '-2px' }} />}
                style={{ backgroundColor: 'white', color: '#5B5C63' }}
              >
                {backBtn}
              </Button>
            </div>
            <div style={{ marginRight: '10px' }}>
              <Button
                // onClick={backbtnHandle}
                className='header-button'
                onClick={onCancel}
                size='small'
                variant='contained'
                startIcon={<FaTimesCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
                sx={{ backgroundColor: '#2b5075', ':hover': { backgroundColor: '#1e3750' } }}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                // type='submit'
                className='header-button'
                onClick={onSubmit}
                variant='contained'
                size='small'
                startIcon={<FaCheckCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
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
