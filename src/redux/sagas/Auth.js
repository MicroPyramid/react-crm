import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { LOGIN_CREDENTIALS,
         REGISTRATION_DETAILS, 
         FORGOT_PASSWORD} from '../constants/Auth'
import { service } from '../../service'
import { updateErrors, 
         setToken, 
         alertMessage } from '../actions/Auth'

export function* checkLoginCredentials() {
  yield takeEvery(LOGIN_CREDENTIALS, function* ({ payload }) {    
    try {
      let response = yield call(service.post, '/api/auth/login/', payload)
      if(response.status === 200) {
        localStorage.setItem('Token', response.data.token)
        yield put(setToken(true))
      }
    }
    catch(error) {      
      if(error.response.data.error) {
        yield put(updateErrors(error.response.data.errors))
      }
    }
  })
}

export function* registerCompany() {
  yield takeEvery(REGISTRATION_DETAILS, function* ({ payload }) {
    try {
      let response = yield call(service.post, '/api/auth/register/', payload)
      if(!response.data.error) {        
        yield put(alertMessage(response.data.message))
      }
    }
    catch(error) {
      let err = ''
      if(error.response.data.error) {
        for (let i in Object.values(error.response.data.errors)) {
          err = err + Object.values(error.response.data.errors)[0] + ', '
        }
      }
      yield put(updateErrors(err))
    }
  })
}

export function* forgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, function* ({ payload }) {
    try {
      let response = yield call(service.post, '/api/auth/forgot-password/', payload)
      if(!response.data.error) {
        yield put(alertMessage('success'))
      }            
    } catch(error) {
      let err = ''
      if(error.response.data.error) {
        if (typeof(error.response.data.errors) == 'string') {
          yield put(updateErrors(error.response.data.errors))
        } else {
          for (let i in Object.values(error.response.data.errors)) {
            err = err + Object.values(error.response.data.errors)[0] + ' '
          }
          yield put(updateErrors(err))
        }        
      }           
    }
  })
}


export default function* rootSaga() {
  yield all([
    fork(checkLoginCredentials),
    fork(registerCompany),
    fork(forgotPassword)
  ])
}