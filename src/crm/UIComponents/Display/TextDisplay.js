import React from 'react';

export default function TextDisplay (props) {
    let { elementSize, labelName, attrId, attrFor, attrDataName, value } = props;

    return (
        <>
            {value && value !== null && value !== undefined ? (
                <div className={`filter_col  ${elementSize}`} id="iname">
                    <div className="form-group">
                      <label className="acc_field_label text-capitalize" htmlFor={attrFor} data-name={attrDataName}>{labelName}</label>
                      <div className="account_field" id={attrId} data-name="name">{value}</div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
