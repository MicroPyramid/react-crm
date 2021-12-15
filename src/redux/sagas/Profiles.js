import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { GET_PROFILES } from '../constants/Profiles'
import { setProfiles } from '../actions/Profiles'
import { service } from '../../service'

export function* getProfiles() {  
  yield takeEvery(GET_PROFILES, function* () {    
    try {
      let response = yield call(
        service.get,
        '/api/profile/',
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )      
      yield(put(setProfiles(response.data)))
      
    } catch(error) {
  
    }  
  })
  
}


export default function* rootSaga() {
  yield all ([
    fork(getProfiles)
  ])
}