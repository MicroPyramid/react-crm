import React from 'react'

export default function TextDisplay(props) {

  let { elementSize, labelName, attrId, attrFor, value } = props;
  
  return (          
      <>
        {(value) ? 
                  <div className={`filter_col ${elementSize}`} id="iname">
                    <div className="form-group">
                      <label className="acc_field_label" for={attrFor} data-name="name">{labelName}</label>
                      <div className="account_field" id={attrId} data-name="name">{value}</div>
                    </div>
                  </div> 
                  : '' }
      </>
  )
}