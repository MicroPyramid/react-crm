import React from 'react';

export default function SelectComponent(props) {
  
  let { labelName, attrName, attrPlaceholder, attrId, options, isRequired, getInputValue } = props;  
  
  return (
    <>       
       <div className="filter_col col-md-12">
        <div className="form-group">
          <label for="exampleInputEmail1">{labelName} {(isRequired) ? <span class="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <select name={attrName} className="form-control rounded-0" placeholder={attrPlaceholder} required="" id={attrId} onChange={getInputValue}>
          {
            options.map(option => {
              return(
                <option value={option.value}>{option.label}</option>
              )
            })
          }
          </select>
          <span class="error error_message" id="error_id_status"></span>
        </div>
      </div>
    </>
  )
}