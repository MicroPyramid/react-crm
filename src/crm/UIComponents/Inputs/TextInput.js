import React from 'react';

export default function TextInput(props) {  
  
  console.log(props);
  let { elementSize, labelName, attrName, attrPlaceholder, inputId, isRequired, error, getInputValue } = props;

  console.log(error);

  return (
    <>      
      <div className={`filter_col ${elementSize}`}> 
        <div className="form-group">
          <label for="exampleInputEmail1" className="name">{labelName} {(isRequired) ? <span class="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <input type="text" name={attrName} className="form-control" placeholder={attrPlaceholder} id={inputId}
          onChange={getInputValue}/>
          <span className="error error_message">{error}</span>
        </div>
      </div>
    </>
  )
}