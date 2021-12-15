import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { GET_LEADS, ADD_LEAD, DELETE_LEAD } from '../constants/Leads'
import { setLeadsData,   
         refresh,
         responseMessage,
         updateErrors } from '../actions/Leads'
import { service } from '../../service'

export function* getLeadsList() {
  yield takeEvery(GET_LEADS, function* ({ payload }) {  
    let { url, offset, bool } = payload    
    try {
      let response = yield call(
        service.get,
        `${url}?offset=${offset}`,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )            
      if(response.status === 200) {
        yield(put(setLeadsData({response: response.data })))        
      }
    } catch(error) {
      
    }
  })
}

export function* addLead() {  
  yield takeEvery(ADD_LEAD, function* ({ payload }) {
    try {
      let response = yield call(
        service.post,
        '/api/leads/',
        payload,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )
      if(!response.data.error) {
        yield(put(responseMessage(true)))
        yield(put(updateErrors([])))
      }
    } catch(error) {      
      let err = ''
      if(error.response.data.error) {
        for (let i in Object.values(error.response.data.errors)) {
          err = err + Object.values(error.response.data.errors)[0] + ', '
        }
      }
      yield(put(responseMessage(false)))
      yield(put(updateErrors(error.response.data.errors)))
    }
  })
}

export function* deleteLead() {  
  yield takeEvery(DELETE_LEAD, function* ({ payload }) {    
    let { id, bool} = payload
    try {
      let response = yield call(
        service.delete,
        `/api/leads/${id}/`,        
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )      
      if(!response.data.error) {        
        yield(put(refresh(bool)))
      }

    } catch(error) {

    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(getLeadsList),
    fork(addLead),
    fork(deleteLead)
  ])  
}
