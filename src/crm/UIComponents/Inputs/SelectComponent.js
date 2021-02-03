import React from 'react';

export default function SelectComponent(props) {
  
  let { elementSize, labelName, attrName, attrPlaceholder, attrId, options, isRequired, selectedValue, value, error, getInputValue } = props;  
  
  return (
    <>       
       <div className={`filter_col ${elementSize}`}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">{labelName} {(isRequired) ? <span className="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <select name={attrName} 
                  className="form-control rounded-0" 
                  placeholder={attrPlaceholder} 
                  required="" 
                  id={attrId}        
                  value={value}          
                  onChange={getInputValue}>                
          {
            options.map(option => {
              return (option.value === selectedValue) ? 
                  <option value={option.value} selected>{option.label}</option> :                   
                  <option value={option.value}>{option.label}</option>              
            })
          }
          </select>
          <span className="error error_message" id="error_id_status">{error}</span>
        </div>
      </div>
    </>
  )
}
