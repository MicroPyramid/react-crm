import React from 'react';

export default function FileInput (props) {
    let {
        elementSize,
        labelName,
        attrName,
        attrPlaceholder,
        inputId,
        isRequired,
        getFile
    } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize}`}> 
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="name d-block">{labelName}{(isRequired) ? <span className="error_marker" style={{color:"red"}}>*</span> : ''} </label>
        <input type="file" name={attrName} className="" placeholder={attrPlaceholder} id={inputId}
        onChange={getFile}/>
        <span className="error error_message"></span>        
      </div>
      </div>
    </>
  )
}
