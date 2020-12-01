import React from 'react';
import Select from 'react-select';

export default function ReactSelect(props) {

  let { labelName, isMulti, isDisabled, options, getChangedValue } = props;  

  return (
    <div className="filter_col col-12">
      <div className="form-group">
        <label for="id_status">{labelName}</label>
          <Select
            className="react_select"                        
            isDisabled={(isDisabled) ? true : false}
            isMulti={(isMulti) ? true : false}
            options={options}
            onChange={getChangedValue}
            />
          <span className="error" id="id__teams"></span>
      </div>
    </div>
  )
}
