import React from 'react';

export default function TextInput(props) {  
  
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, getInputValue, rows } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}> 
      <div className="form-group">
        <label for="exampleInputEmail1" className="name">{labelName}<span className="error"></span></label>        
        <textarea type="text" name={attrName} className="form-control rounded-0" placeholder={attrPlaceholder} id={inputId}
        onChange={getInputValue} rows={rows}></textarea>        
        <span className="error error_message"></span>        
      </div>
      </div>
    </>
  )
}