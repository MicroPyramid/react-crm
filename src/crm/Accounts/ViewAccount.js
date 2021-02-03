import React, { useState, useEffect } from 'react';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import { ACCOUNTS } from '../../common/apiUrls';
import { getApiResults } from '../Utilities';
import ViewOverView from '../UIComponents/Display/ViewDisplay/ViewOverview/ViewOverview';
import ViewTable from '../UIComponents/Display/ViewDisplay/ViewTable';

export default function ViewAccount (props) {
    const [accountObject, setAccountObject] = useState([]);

    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = () => {
        let userId = window.location.pathname.split('/')[2];
        const resAcc = getApiResults(`${ACCOUNTS}${userId}/`);
        resAcc.then((res) => {
            setAccountObject(res.data.account_obj);
        });
    };

    return (
        <>
            {accountObject.id !== undefined ? (
                <>
                    <div
                        id="mainbody"
                        className="main_container"
                        style={{ marginTop: '65px' }}
                    >
                        <BreadCrumb target="accounts" action={accountObject.name} />
                        <div className="main_container" id="maincontainer">
                            <div className="overview_form_block row marl justify-content-center">
                                <div className="col-md-8" id="opacity_block">
                                    <div className="card mb-3">
                                        <div className="card-body" id="datashow">
                                            <ViewOverView object={accountObject} />
                                        </div>
                                    </div>

                                    {accountObject.length === undefined ? (
                                        <ViewTable
                                            title="contacts"
                                            object={accountObject.contacts}
                                            headings={['name', 'phone', 'email']}
                                            keys={['first_name', 'last_name', 'phone', 'email']}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </>
    );
}
