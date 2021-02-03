import React from 'react';

export default function PasswordInput (props) {
    let {
        styles,
        elementSize,
        labelName,
        attrName,
        attrPlaceholder,
        inputId,
        isRequired,
        error,
        value,
        getInputValue
    } = props;

  return (
    <>      
      <div className={`filter_col ${elementSize} ${styles}`}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="name">{labelName} {(isRequired) ? <span className="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <input  className="form-control" 
                  type="password" 
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

