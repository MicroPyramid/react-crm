import axios from 'axios';


export default axios.create({
 baseURL: 'https://bottlecrm.com/api', 
 headers: {
    'Content-Type': 'application/json',
     Authorization: `jwt ${localStorage.getItem('Token')}`,
     company: `${localStorage.getItem('SubDomain')}`,
    
 }
})