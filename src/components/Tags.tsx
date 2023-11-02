import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/material'

export const Tags = (props:any) => {
    // const [tags, seTags] = useState([props.tags])
    const [tagsColor, setTagsColor] = useState('#665d1e')

    useEffect(() => {
        colorTag()
    }, [])

    const colorTag = () => {
        if (props.tags === 'account') {
            setTagsColor('red')
        } else if (props.tags === 'testing') {
            setTagsColor('#D22B2B')
        } else if (props.tags === 'assigned') {
            setTagsColor('#0087bd')
        } else if (props.tags === 'bug') {
            setTagsColor('#008000')
        } else if (props.tags === 'closed') {
            setTagsColor('#008080')
        } else if (props.tags === 'asdfg') {
            setTagsColor('Crimson')
        } else if (props.tags === 'test') {
            setTagsColor('#b06500')
        } else if (props.tags === 'new') {
            setTagsColor('#FF2400')
        } else if (props.tags === 'tagtest') {
            setTagsColor('#ffff00')
        } else if (props.tags === 'assigning') {
            setTagsColor('#E0115F')
        } else if (props.tags === 'leading') {
            setTagsColor('#4e1609')
        } else if (props.tags === 'processing') {
            setTagsColor('#ffa500')
        } else if (props.tags === 'vddafv') {
            setTagsColor('#ff004f')
        } else if (props.tags === 'vfvfavtq') {
            setTagsColor('#ff5a36')
        } else if (props.tags === 'active') {
            setTagsColor('#7f1734')
        } else if (props.tags === 'details') {
            setTagsColor('#FF2400')
        } else if (props.tags === 'testing') {
            setTagsColor('#D22B2B')
        } else if (props.tags === 'created') {
            setTagsColor('#880808')
        } else if (props.tags === 'details') {
            setTagsColor('#66ff00')
        } else if (props.tags === 'new') {
            setTagsColor('#191970')
        } else if (props.tags === 'staging') {
            setTagsColor('#191970')
        } else if (props.tags === 'exist') {
            setTagsColor('#191970')
        } else if (props.tags === 'tagest') {
            setTagsColor('#954535')
        } else if (props.tags === 'asdfg') {
            setTagsColor('#E97451')
        }
    }

    return (
        <div>
            {
                props.tags && props.tags
                    ? <Chip
                        label={props.tags}
                        style={{
                            backgroundColor: tagsColor,
                            borderRadius: '5px',
                            fontSize: '10px',
                            padding: '5px',
                            height: '20px',
                            color: 'white',
                            marginLeft: '4px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            paddingTop: '5px',
                            paddingLeft: '0px',
                            paddingRight: '0px'
                        }}
                    />
                    : '--'
            }
        </div>
    )
}
