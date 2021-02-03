import React from 'react';

export default function ArrayDisplay (props) {    

  let { elementSize, labelName, attrFor, value, property, style } = props;  

  let tagStyle = (style === "tagStyle") ? 'tag' : ''
  let contactStyle = (style === 'contactStyle') ? 'modal-contact' : ''
  let assignedUsersStyle = (style === 'assignedUsersStyle') ? 'modal-assigned-users' : ''

  return (  
    <>
    {
      (value && value.length !== 0) ?      
      <div className={`filter_col ${elementSize}`}>
        <div className="form-group">
          <label className="case_field_label text-capitalize" htmlFor={attrFor}>{labelName}</label><br/>
          {
            value.map(val => {                            
              return(
                <>                  
                  <a  href= {(val.id && val.id !== undefined) ? `/users/${(val.id.toString())}/view/` : ''}                  
                      className= { `${tagStyle} ${contactStyle} ${assignedUsersStyle}` }
                        >                      
                      {val[property]}
                  </a>
                </>
              )
            })
          }
        </div>
      </div> : ''
    }      
    </>
  )
}
