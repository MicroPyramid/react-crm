import React, { useState, useEffect } from 'react';

export default function TagsInput (props) {
    const [tags, setTags] = useState([]);
    const [tagErrorStyle, setTagErrorStyle] = useState('');
    const [invalidTag, setIsInvalidTag] = useState([]);
    const [isEditTags, setIsEditTags] = useState(false);

    const addTags = (event) => {
        event.preventDefault();
        if (event.key === 'Enter' && event.target.value !== '') {
            let val = event.target.value;
            if (!tags.includes(val)) {
                setTags([...tags, event.target.value]);
                setIsInvalidTag('');
                if (props.type === 'edit') setIsEditTags(true);
            }
            event.target.value = '';
        }
    };

    const handleTag = (e) => {
        e.preventDefault();
        if (tags.includes(e.target.value)) {
            setTagErrorStyle('invalid_tag');
        } else {
            setTagErrorStyle('');
        }
        setIsInvalidTag(e.target.value);
    };  
  
  const removeTags = index => {       
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    if(props.type === 'edit') setIsEditTags(true);
  }
  
  // eslint-disable-next-line
  useEffect(() => {
    // Sending tags to Add Account
        if (props.type === 'add') props.getTags(tags);
        //
        if (props.type === 'edit') {
            if (props.sendTags && isEditTags === false) {
                setTags(props.sendTags);
            }
            if (isEditTags === true) props.getTags(tags);
        }
    });

    return (
        <div className="filter_col col-12">
            <div className="form-group">
                <label>Tags</label>
                <div className="tags-wrapper">
                    <ul className="tags-ul">
                        {tags.map((tag, index) => (
                            <li className="tag-list-item" key={index}>
                                <span className={`${tag}`}>{tag}</span>
                                <b onClick={() => removeTags(index)}>x</b>
                            </li>
                        ))}
                    </ul>
                    <input
                        className={`tags-input ${tagErrorStyle}`}
                        type="text"
                        onKeyUp={(event) => addTags(event)}
                        placeholder="add a tag"
                        value={invalidTag}
                        onChange={(e) => {
                            handleTag(e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
