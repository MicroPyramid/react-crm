import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  GET_DATA
} from '../constants/Fetch'
import { updateLeadsData } from '../actions/Leads'
import { updateUsersData, isLoading } from '../actions/Users'
import { service } from '../../service'

export function* getData() {
  yield takeEvery(GET_DATA, function* ({ payload} ) {
    let { url, obj } = payload    
    let response;
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      response = yield call(service.get, url)
      if(response.status === 200) {
        if(obj === "leads") {
          yield put(updateLeadsData(response))
        } else if (obj === "users") {          
          yield put(updateUsersData(response))          
        }
      }
    }
    catch(err) {
      
    }
  })
}

export default function* rootSaga() {
  yield all ([
    fork(getData)
  ])
}