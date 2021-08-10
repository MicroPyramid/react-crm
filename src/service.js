import axios from 'axios';

let origin = window.location.origin
export const service = axios.create({
  baseURL: `${origin}/api/`,    
  headers: {
    'Content-Type': 'application/json'    
  }
})
