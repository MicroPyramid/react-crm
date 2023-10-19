import { SERVER } from '../services/ApiUrls'
export function fetchData (url:any, method:any, data = '', header:any) {
  return fetch(`${SERVER}${url}`, {
    method,
    headers: header,
    body: data
  }).then((response) => response.json())
}
