import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { ADD_CONTACT } from '../constants/Contacts'
import { service } from '../../service'
import { contactErrors } from '../actions/Contacts'

export function* addContact() {
  yield takeEvery(ADD_CONTACT, function* ({ payload }) {    
    let { url, data } = payload    
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      let response = yield call(service.post, url, data)       
    }
    catch(err) {      
      let response = err.response.data.errors.contact_errors            
      yield(put(contactErrors(err.response)))
    }
  })
}
export default function* rootSaga() {
  yield all([
    fork(addContact)
  ])
}
