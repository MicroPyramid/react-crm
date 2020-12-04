import React from 'react'

export default function ArrayDisplay(props) {

  let { elementSize, labelName, attrId, attrFor, value, property, style } = props;  

  let tagStyle = (style === "tag") ? 'tag' : ''
  let contactStyle = (style === 'contact') ? 'modal-contact' : ''
  let assignedUsersStyle = (style === 'assignedUsers') ? 'modal-assigned-users' : ''

  return (  
    <>
    {
      (value.length !== 0) ?      
      <div className={`filter_col ${elementSize}`}>
        <div className="form-group">
          <label className="case_field_label" for={attrFor} >{labelName}</label><br/>
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