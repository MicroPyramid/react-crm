import React from 'react';

export default function TextInput(props) {  
  
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, getInputValue } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}> 
        <div className="form-group">
          <label for="exampleInputEmail1" className="name">{labelName}<span className="error"></span></label>        
          <input type="text" name={attrName} className="form-control" placeholder={attrPlaceholder} id={inputId}
          onChange={getInputValue}/>
          <span className="error error_message"></span>
        </div>
      </div>
    </>
  )
}