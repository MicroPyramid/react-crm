import React, { useEffect } from 'react'
import { Chip } from '@mui/material'

export const AccountLabel = (props) => {
  return (
    <div>
      {
        props.account
          ? <Chip
              label={props.account.name}
            />
          : null
      }
    </div>
  )
}
