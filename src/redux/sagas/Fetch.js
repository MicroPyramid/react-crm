import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  GET_DATA,
  POST_DATA,
  PUT_DATA
} from '../constants/Fetch'
import { getCompaniesData } from '../actions/Companies'
import { 
  updateUsersData, 
  isUserAdded, 
  isUserUpdated,
  userErrors } from '../actions/Users'
import { service } from '../../service'

export function* getData() {  
  yield takeEvery(GET_DATA, function* ({ payload } ) {    
    let { url, obj } = payload    
    let response;
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')  
      response = yield call(service.get, url)       
      if(response.status === 200) {
        if(obj === "leads") {
          
        } else if (obj === "users") {          
          yield put(updateUsersData(response))          
        } else if (obj === 'companies') {
          yield put(getCompaniesData(response))
        }
      }
    }
    catch(err) {
      if(err.response) {
        if(err.response.status === 401){
          localStorage.clear()
          window.location = '/login'
        }
      }
    }
  })
}


export function* postData() {
  yield takeEvery(POST_DATA, function* ({ payload} ) {
    let { url, obj, data } = payload    
    let response;
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      response = yield call(service.post, url, data)         
      if(!response.data.error) {
        if(obj === "leads") {
          
        } else if (obj === "users") {                    
          yield put(isUserAdded(true))
        }
      }
    }
    catch(err) {            
      if(obj === 'users') {
        yield put(userErrors(err.response.data.errors.user_errors))
      }
    }
  })
}

export function* putData() {
  yield takeEvery(PUT_DATA, function* ({ payload} ) {    
    let { url, obj, data } = payload    
    let response;
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      response = yield call(service.put, url, data)      
      if(!response.data.error) {
        if(obj === "leads") {
          
        } else if (obj === "users") {                    
            yield put(isUserUpdated(true))
        }
      }
    }
    catch(err) {
      
    }
  })
}


export default function* rootSaga() {
  yield all ([
    fork(getData),
    fork(postData),
    fork(putData)
  ])
}