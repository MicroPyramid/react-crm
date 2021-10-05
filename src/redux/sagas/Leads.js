import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  GET_LEADS,
  LEADS_FILTER_DATA,
  DELETE_OBJ,
  ADD_LEAD
} from '../constants/Leads';
import { updateLeadsData, updateUsersData,leadErrors } from '../actions/Leads'
import { service } from '../../service'

export function* deleteObj() {
  yield takeEvery(DELETE_OBJ, function* ({ url }) {
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      yield call(service.delete, url)      
    }
    catch(err) {

    }
  })
}

export function* addLead() {
  yield takeEvery(ADD_LEAD, function* ({ payload }) {    
    let { url, data } = payload 
    console.log("getting data in saga",payload); 
    try {
     
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      let response = yield call(service.post, url, data)  
           
    }
    catch(err) {      
      console.log("getting error",err);
      let response = err.response.data.errors.leadErrors            
      yield(put(leadErrors(err.response)))
    }
  })
}


export default function* rootSaga() {
  yield all ([        
    fork(deleteObj),
    fork(addLead)
  ]);
}
