import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/material'

export const Label = (props: any) => {
  const { tags } = props;
  const [tagsColor, setTagsColor] = useState('#665d1e')

  useEffect(() => {
    colorTag()
  }, [])

  const colorTag = () => {
    if (tags === 'account') {
      setTagsColor('red')
    } else if (tags === 'testing') {
      setTagsColor('#D22B2B')
    } else if (tags === 'assigned') {
      setTagsColor('#0087bd')
    } else if (tags === 'bug') {
      setTagsColor('#008000')
    } else if (tags === 'closed') {
      setTagsColor('#008080')
    } else if (tags === 'asdfg') {
      setTagsColor('Crimson')
    } else if (tags === 'test') {
      setTagsColor('#b06500')
    } else if (tags === 'new') {
      setTagsColor('#FF2400')
    } else if (tags === 'tagtest') {
      setTagsColor('#ffff00')
    } else if (tags === 'assigning') {
      setTagsColor('#E0115F')
    } else if (tags === 'leading') {
      setTagsColor('#4e1609')
    } else if (tags === 'processing') {
      setTagsColor('#ffa500')
    } else if (tags === 'vddafv') {
      setTagsColor('#ff004f')
    } else if (tags === 'vfvfavtq') {
      setTagsColor('#ff5a36')
    } else if (tags === 'active') {
      setTagsColor('#7f1734')
    } else if (tags === 'details') {
      setTagsColor('#FF2400')
    } else if (tags === 'testing') {
      setTagsColor('#D22B2B')
    } else if (tags === 'created') {
      setTagsColor('#880808')
    } else if (tags === 'details') {
      setTagsColor('#66ff00')
    } else if (tags === 'new') {
      setTagsColor('#191970')
    } else if (tags === 'staging') {
      setTagsColor('#191970')
    } else if (tags === 'exist') {
      setTagsColor('#191970')
    } else if (tags === 'tagest') {
      setTagsColor('#954535')
    } else if (tags === 'asdfg') {
      setTagsColor('#E97451')
    }
  }

  return (
    (tags
      ? <Chip
        label={tags}
        key={tags}
        sx={{
          backgroundColor: tagsColor,
          borderRadius: '4px',
          fontSize: '16px',
          height: '25px',
          color: 'white',
          marginLeft: '5px',
          fontWeight: '500',
          pb: '2px'
        }}
      />
      : null)
  )
}
