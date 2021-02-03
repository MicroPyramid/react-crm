import React from 'react';
import { momentTimeFormats, overView } from '../../Utilities';

export default function Modal (props) {
  let { modalTab, id, object, createdBy, createdOn } = props;
  let modalResult = overView(object);    
  
  return (
      
    <div className="modal fade" id={`exampleModalCenter_${modalTab}${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-capitalize ml-3" id="exampleModalLongTitle"><b>{object.name}</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div id="modal_body_ajax"></div>
            <div className="" id="">
              <div className="">
                <div className="col-md-12" id="">
                  <div className="card">
                    <div className="card-body m-0 p-0" id="datashow">
                      <div className="card-title text-right">
                        <h5><span className="mt-0"></span></h5>
                      </div>                    
                      <div className="row marl mine-modal">{modalResult}</div>
                      <div className="col-md-12">
                        <div className="created_information pl-0">Created by <b>{createdBy}</b> created on{' '}
                          <b title={momentTimeFormats(createdOn)[1]}> {momentTimeFormats(createdOn)[0]} </b>
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
    );
}
