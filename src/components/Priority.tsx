import React, { useEffect, useState } from 'react'

export const Priority = (props: any) => {
  const [tagColor, setTagColor] = useState('purple')

  useEffect(() => {
    colorTag()
  }, [])

  const colorTag = () => {
    if (props.priorityData === 'Normal') {
      setTagColor('green')
    } else if (props.priorityData === 'High') {
      setTagColor('orange')
    } else if (props.priorityData === 'Low') {
      setTagColor('blue')
    } else if (props.priorityData === 'Urgent') {
      setTagColor('red')
    }
  }

  return (
    <div style={{
      color: tagColor,
      textTransform: 'capitalize'
    }}
    >
      {props.priorityData ? props.priorityData : '---'}
    </div>
  )
}
