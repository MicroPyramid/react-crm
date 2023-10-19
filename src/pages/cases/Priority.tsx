import React, { useEffect, useState } from 'react'

export const Priority = (props:any) => {
  const [tagsColor, setTagsColor] = useState('purple')

  useEffect(() => {
    colorTag()
  }, [])

  const colorTag = () => {
    if (props.priorityData === 'Normal') {
      setTagsColor('green')
    } else if (props.priorityData === 'High') {
      setTagsColor('orange')
    } else if (props.priorityData === 'Low') {
      setTagsColor('blue')
    } else if (props.priorityData === 'Urgent') {
      setTagsColor('red')
    }
  }

  return (
    <div style={{
      color: tagsColor,
      textTransform: 'capitalize'
    }}
    >
      {props.priorityData ? props.priorityData : '---'}
    </div>
  )
}
