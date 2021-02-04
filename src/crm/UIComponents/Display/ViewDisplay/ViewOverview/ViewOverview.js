import React, { useState } from 'react';
import ViewOverviewData from './ViewOverviewData';

export default function ViewOverView (props) {
    let {
        id,
        name,
        phone,
        email,
        status,
        contacts,
        lead,
        billing_address_line,
        billing_city,
        billing_state,
        billing_country,
        billing_postcode,
        tags,
        created_by,
        created_on
    } = props.object;

    const [isEditButton, setIsEditButton] = useState(true);
    const [displayEditButton, setDisplayEditButton] = useState('hide');

  const displayActionButton = () => {
    (isEditButton) ? setDisplayEditButton('display_edit'): setDisplayEditButton('hide');
    setIsEditButton(!isEditButton);
  }
  
  let dataObject = {
    name,
    phone,
    email,
    status,
    contacts,
    lead: (lead !== null && lead !== undefined) ? lead.title : '',
    address: billing_address_line + ', ' + billing_city + ', ' + billing_state + ', ' + billing_country + ', ' + billing_postcode,    
    tags
  } 
    
    return (
        <>
            <div className="card-title text-right">
                <h5 className="overview">
                    <span className="float-left title title_overview">Overview</span>
                    <span className="mt-0">
                        <div className="dropdown buttons_row">
                            <button
                                className="btn_action dropdown-toggle"
                                onClick={displayActionButton}
                            >
                                {' '}
                Actions <span className="caret" />
                            </button>
                            <a
                                href={`/accounts/${id}/edit`}
                                className={`btn_edit ${displayEditButton}`}
                            >
                Edit
                            </a>
                        </div>
                    </span>
                </h5>
            </div>
            <div className="row marl">
                <ViewOverviewData
                    object={dataObject}
                    createdBy={created_by && created_by.email}
                    createdOn={created_on}
                />
            </div>
        </>
    );
}
