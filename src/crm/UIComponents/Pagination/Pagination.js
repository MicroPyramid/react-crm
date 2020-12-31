import React, { useState, useEffect } from 'react';

export default function Pagination(props) {
  
  let { data } = props;     

  const getPageData = (pageNumber) => {       
    let firstIndex = (pageNumber - 1)*10;
    let lastIndex = (pageNumber * 10);
    let dataValues = [...data];
    let result = dataValues.slice(firstIndex, lastIndex);
    
    // props.paginationData(result, props.type);
  }

  const displayPagination = () => {    
    // Get pageNumbers
    let pageNumbers = [];
    let dataLength = (data) ? data.length : 0;
    for (let i = 1; i <= Math.ceil(dataLength/10); i++) {
      pageNumbers.push(i);
    }     
    return pageNumbers.map(pageNumber => {
      return(
        <li class="page-item">
          <a class="" href="#" onClick={() => getPageData(pageNumber)}>{pageNumber}</a>
        </li> 
      )
    })
    }
  
  return (        
    <div>      
      {
        (data && data.length > 10) ? 
          <ul class="pagination">
              {displayPagination()}
          </ul>
          : ''
      }
    </div>
  )
}
