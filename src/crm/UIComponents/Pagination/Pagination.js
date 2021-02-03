import React, {useState} from 'react';
import axios from 'axios';

export default function Pagination(props) {
  
  let { data } = props;

  const [pageNumber, setPageNumber] = useState(1);  
  const [displayFirstNum, setDisplayFirstNum] = useState(1);  

  let accountsCount = data.accounts_count;
  let totalPages = Math.ceil(accountsCount/10);  
  let pageNumArray = Array.from(Array(totalPages), (_,x) => x+displayFirstNum);

  const getCurrentPageResults = (pageNum, change) => {
    
    setPageNumber(pageNum);
    let limit = 10;
    let offset = (pageNum-1)*10;
    let paginationUrl = `https://bottlecrm.com/api/accounts/?limit=${limit}&offset=${offset}`;
            
    if(change) {
      if (pageNum > 10) {        
        setDisplayFirstNum(pageNum-9);
      }
      if (pageNum < 10) {
        setDisplayFirstNum(pageNum);
      }
    }
    
    let config = {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }  
    axios.get(paginationUrl, config)
      .then(res => {        
        props.sendData(res);
      })
  }
  
  return (
    <>
      <ul className="pagination">
        <li><button className={`pagiantion__button ${(pageNumber === 1) ? 'hide' : ''} link`} rel="page" onClick={() => getCurrentPageResults(1, false)}><span aria-hidden="true">&lt;&lt;</span></button></li>
        <li><button className={`pagiantion__button ${(pageNumber === 1) ? 'hide' : ''} link`} rel="page" onClick={() => getCurrentPageResults((pageNumber > 1) ? pageNumber-1 : 1, true)}><span aria-hidden="true">&lt;</span></button></li>
        {
          pageNumArray.map(page => (
             <li><button className={`pagiantion__button link ${(page === pageNumber) ? 'active' : ''}`} onClick={() => {
                getCurrentPageResults(page, false)                
              }}>{page}</button></li>
          ))
        }
        <li><button className={`pagiantion__button ${(pageNumber === totalPages) ? 'hide' : ''} link`} rel="page" onClick={() => getCurrentPageResults((pageNumber < totalPages) ? pageNumber+1 : totalPages, true)}><span aria-hidden="true">&gt;</span></button></li>
        <li><button className={`pagiantion__button ${(pageNumber === totalPages) ? 'hide' : ''} link`} rel="page" onClick={() => getCurrentPageResults(totalPages, false)}><span aria-hidden="true">&gt;&gt;</span></button></li>
      </ul>
    </>
  )
}
