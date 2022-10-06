import { SERVER } from '../components/ApiUrls'
export function fetchData (url, method, data = '', header) {
  return fetch(`${SERVER}${url}`, {
    method,
    headers: header,
    body: data
  }).then((response) => response.json())
}
