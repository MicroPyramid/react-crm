import React from 'react';

export default function SelectComponent(props) {
  
  let { elementSize, labelName, attrName, attrPlaceholder, attrId, options, isRequired, selectedValue, getInputValue } = props;  
  
  return (
    <>       
       <div className={`filter_col ${elementSize}`}>
        <div className="form-group">
          <label for="exampleInputEmail1">{labelName} {(isRequired) ? <span class="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <select name={attrName} 
                  className="form-control rounded-0" 
                  placeholder={attrPlaceholder} 
                  required="" 
                  id={attrId}                  
                  onChange={getInputValue}>                
          {
            options.map(option => {
              return (option.value === selectedValue) ? 
                  <option value={option.value} selected>{option.label}</option> : 
                  <option value={option.value}>{option.label}</option>              
            })
          }
          </select>
          <span class="error error_message" id="error_id_status"></span>
        </div>
      </div>
    </>
  )
}