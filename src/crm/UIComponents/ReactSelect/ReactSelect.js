import React from 'react';
import Select from 'react-select';

export default function ReactSelect (props) {
    let {
        elementSize,
        labelName,
        isMulti,
        isDisabled,
        options,
        value,
        isRequired,
        isClearable,
        error,
        getChangedValue
    } = props;  
  
  return (
    <div className={`filter_col ${elementSize}`}>
      <div className="form-group">
        <label htmlFor="id_status">{labelName} {(isRequired) ? <span className="error_marker" style={{color:"red"}}>*</span> : ''} </label>
          <Select
            className="react_select"                        
            isDisabled={(isDisabled) ? true : false}
            isMulti={(isMulti) ? true : false}
            isClearable={(isClearable) ? true : false}
            options={options}
            onChange={(e) => getChangedValue(e)}
            value={value}
            />
          <span className="error error_message" id="error_id_status">{error}</span>
      </div>
    </div>
  )
}
