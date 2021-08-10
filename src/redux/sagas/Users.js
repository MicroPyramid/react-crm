import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { service } from '../../service'
import { USER_STATUS, USER_DETAILS, DELETE_ALL_USERS } from '../constants/Users'
import { updateUserDetails } from '../actions/Users'

export function* UserStatus() {  
  yield takeEvery(USER_STATUS, function* ({ payload }) {
    let { id, status } = payload
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      let response = yield call(service.post, `users/${id}/status/`, { 'status': status } )            
    } catch(err) {
      
    }
  })
}

export function* getUserDetails() {
  yield takeEvery(USER_DETAILS, function* ({ url }) {
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      let response = yield call(service, url)       
      yield put(updateUserDetails(response))
    }
    catch(err) {
      
    }
  })
}

export function* deleteAllUsers() {
  yield takeEvery(DELETE_ALL_USERS, function* ({ ids }) {
    try {

    }
    catch(err) {

    }
  })
}

export default function* rootSaga() {
  yield all ([  
    fork(UserStatus),
    fork(getUserDetails)
  ]);
}
