import React from 'react';

export default function TextInput(props) {  
  
  
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, isRequired, error, value, getInputValue } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}>
        <div className="form-group">
          <label for="exampleInputEmail1" className="name">{labelName} {(isRequired) ? <span className="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <input  className="form-control" 
                  type="text" 
                  name={attrName} 
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