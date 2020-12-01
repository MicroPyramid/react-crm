import React from 'react';

export default function FileInput(props) {  
  
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, getInputValue, getFile } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}> 
      <div className="form-group">
        <label for="exampleInputEmail1" className="name">{labelName}<span className="error"></span></label>        
        <input type="file" name={attrName} className="" placeholder={attrPlaceholder} id={inputId}
        onChange={getFile}/>
        <span className="error error_message"></span>        
      </div>
      </div>
    </>
  )
}