import React from 'react';

export default function BreadCrumb(props) {

  let {  target, action } = props;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href={`/${target}/`} className="text-capitalize">{target}</a></li>
        <li className="breadcrumb-item active text-capitalize">{action}</li>
      </ol>
    </nav>
  )
}
