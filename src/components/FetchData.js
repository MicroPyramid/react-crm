import { baseUrl } from '../components/ApiUrls';
export function fetchData(url, method, data = "", header) {
  // let baseUrl = process.env.REACT_APP_API_BASE_URL;
  return fetch(`${baseUrl}${url}`, {
    method,
    headers: header,
    body: data,
  }).then((response) => response.json());
}
