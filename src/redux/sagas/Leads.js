import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  GET_LEADS,
  LEADS_FILTER_DATA,
  DELETE_OBJ,
} from '../constants/Leads';
import { updateLeadsData, updateUsersData } from '../actions/Leads'
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

export default function* rootSaga() {
  yield all ([        
    fork(deleteObj)
  ]);
}
