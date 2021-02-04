import React from 'react';
import { momentTimeFormats, overView } from '../../../../Utilities';

export default function ViewOverviewData (props) {
    let { object, createdBy, createdOn } = props;
    let modalResult = overView(object);

    return (
        <>
            <div className="row marl">{modalResult}</div>
            <div className="col-md-12">
                <div className="created_information pl-0">
          Created by <b>{createdBy}</b> created on{' '}
                    <b title={momentTimeFormats(createdOn)[1]}>
                        {momentTimeFormats(createdOn)[0]}
                    </b>
                </div>
            </div>
        </>
    );
}
