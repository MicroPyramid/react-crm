import React from 'react';
import Select from 'react-select';

export default function ReactSelect(props) {

  let { elementSize, labelName, isMulti, isDisabled, options, value, getChangedValue } = props;  

  return (
    <div className={`filter_col ${elementSize}`}>
      <div className="form-group">
        <label for="id_status">{labelName}</label>
          <Select
            className="react_select"                        
            isDisabled={(isDisabled) ? true : false}
            isMulti={(isMulti) ? true : false}
            options={options}
            onChange={getChangedValue}
            value={value}
            />
          <span className="error" id="id__teams"></span>
      </div>
    </div>
  )
}
