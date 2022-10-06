import React from 'react'
import {
  Typography,
  CircularProgress,
  Box
} from '@mui/material'

export function Spinner () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20 }}>
      <CircularProgress />
      <Typography sx={{ fontWeight: '19px', ml: 1 }}>Loading....</Typography>
    </Box>
  )
}
