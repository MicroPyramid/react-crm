import React from 'react';

export default function ViewTable (props) {

  let { title, object, headings, keys } = props;

 const getHeadings = () => {
        return headings.map((heading) => {
            return (
                <th scope="col" className="text-center text-capitalize">
                    {heading}
                </th>
            );
        });
    }          
  
  let results = props.object.map((obj, index) => {
    
      return(
        <tr id={`${title}_details${obj.id}`} className="text-center">
                              <td className="text-center">{index+1}</td>                              
                              <td className="text-center">{obj[keys[0]] + ' '+obj[keys[1]]}</td>
                              <td className="text-center">{obj[keys[2]]}</td>
                              <td className="text-center">{obj[keys[3]]}</td>
                              <td className="actions text-center">
                                <a href={`/${title}/${obj.id}/view/`} className="btn btn-primary text-white mr-1">View</a>
                                <a href={`/${title}/${obj.id}/edit/?view_account=${obj.id}`} className="btn btn-info text-white mr-1">Edit</a>
                                <a href={`/${title}/${obj.id}/delete/?view_account=${obj.id}`} className="btn btn-warning text-white mr-1">Remove</a>
                              </td>
                            </tr>
      )
  })

    return (
        <>
            <form method="GET" className="accountdetails_row">
                <div className="table_container_row row marl no-gutters">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="panel-heading-list card-title view-pad text-capitalize">
                                    {title}
                                    <a href={`/${title}/create/?view_account=${object.id}`}>
                                        <svg
                                            className="svg-inline--fa fa-plus fa-w-14 pull-right text-dark"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="plus"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                            />
                                        </svg>
                                        <span className="fa fa-plus pull-right" />
                                    </a>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-condensed">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center">S.No</th>
                                                {getHeadings()}
                                                <th scope="col" className="text-center">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>{results}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br clear="all" />
                    </div>
                </div>
            </form>
        </>
    )
}
