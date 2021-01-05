import React from 'react';

export default function PhoneInput(props) {  
  
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, isRequired, error, value, getInputValue } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}>
      <div className="form-group">
        <label for="exampleInputEmail1" className="name">{labelName} {(isRequired) ? <span class="error_marker" style={{color:"red"}}>*</span> : ''} </label>        
        <input type="number"
               name={attrName} 
              className="form-control" 
              placeholder={attrPlaceholder} 
              id={inputId}
              value={value}
              onChange={getInputValue}/>
        <span className="error error_message">{error}</span>
      </div>
      </div>
    </>
  )
}