import React from 'react';
import {timeFromNow} from '../../Utilities';
import TextDisplay from '../Display/TextDisplay';
import ArrayDisplay from '../Display/ArrayDisplay';

export default function Modal(props) {  

  let { modalTab, id, object, createdBy, createdOn } = props;
  
  let accountObject = Object.entries(object);
  let modalResult = accountObject.map((result, index) => {
    let key = accountObject[index][0];
    let value = accountObject[index][1];
    if (typeof(value) === "string" || typeof(value) === "number") {
      return (
        <TextDisplay  elementSize="col-md-4" labelName={key} value={value}/>
      )
    } else if (typeof(value) === "object") {
      let propertyValue;
      if (key === 'contacts') propertyValue = 'first_name'; 
      if (key === 'tags') propertyValue = 'name'; 
      return (
        <ArrayDisplay elementSize="col-md-4" labelName={key} value={value}
          property={propertyValue} style={(key === 'contacts') ? 'contactStyle' :
                                            (key === 'tags') ? 'tagStyle': ''}/>
      )
    }
  })

  
  return (
      
    <div className="modal fade" id={`exampleModalCenter_${modalTab}${id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">NAME</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div id="modal_body_ajax">
          </div>
          <div className="" id="">
              <div className="">
                <div className="col-md-12" id="">
                    <div className="card">
                      <div className="card-body" id="datashow" style={{margin: "0", padding: "0"}}>
                          <div className="card-title text-right">
                            <h5>
                                <span style={{marginTop: "0px"}}>
                                </span>
                            </h5>
                          </div>
                          
                          <div className="row marl mine-modal">                            
                            { modalResult }
                          </div>  

                          <div className="col-md-12">
                                <div className="created_information pl-0">
                                    Created by <b>{createdBy}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{timeFromNow(createdOn)}</b>
                                </div>
                            </div>

                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>            
    </div>                        
  
  )
}
