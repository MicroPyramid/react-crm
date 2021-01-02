import React from 'react';

export default function TagsInput(props) {
  return (
    <div className="filter_col col-12">
        <div className="form-group">
          <label>Tags</label>

          <div className="tags-wrapper">
              <ul className="tags-ul">                
                {props.tags.map((tag, index) => (
                  <li
                    className="tag-list-item" key={index}>
                    <span className={`${tag}`}>{tag}</span>
                    <b onClick={() => props.removeTags(index)}>x</b>
                  </li>
                ))}
              </ul>
              <input
                className={`tags-input ${props.tagErrorStyle}`}
                type="text"
                onKeyUp={event => props.addTags(event)}               
                placeholder="add a tag"
                value={props.value}
                onChange={(e) => {props.handleTag(e)}}
              />               
          </div>
        </div>
      </div>
  )
}
