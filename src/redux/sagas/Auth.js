import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {  
  REGISTER,  
  LOGIN,
  FORGOT_PASSWORD,
} from '../constants/Auth';
import {
  showAuthMessage,  
  authenticate,
} from '../actions/Auth';

import { service } from '../../service';

// Login function
export function* validateLogin() {
  yield takeEvery(LOGIN, function* ({ loginDetails }) {
    const { email, password } = loginDetails;    
    try {            
      let response = yield call(service.post, '/api/auth/login/', {
        email: email,
        password: password,
      });
      if (!response.data.error) {        
        yield put(authenticate(true));
        localStorage.setItem('Token', response.data.token);
      }
    } catch (err) {
      let response = err.response.data;      
      if (response.error) {
        yield put(showAuthMessage(response.errors));
      }
    }
  });
}

// Register function
export function* authenticateRegister() {
  yield takeEvery(REGISTER, function* ({ regDetails }) {
    const { first_name, company_name, email, password } = regDetails;    
    try {
      let response = yield call(service.post, '/api/auth/register/', {        
        first_name: first_name,
        company_name: company_name,
        email: email,
        password: password,
      });      
      if (!response.data.error) {
        yield put(authenticate(true));
      }
    } catch (err) {
      console.log(err.response)
      if (err.response.data.error) {        
        yield put(showAuthMessage(err.response.data.errors));
      }
    }
  });
}

export function* forgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, function* ({ fpDetails }) {
    let { email } = fpDetails;
    try {
      let response = yield call(service.post, '/api/auth/forgot-password/', {
        email: email,
      });
      if (!response.data.error) {
        yield put(authenticate(true));
      }
    } catch (err) {
      let response = err.response.data;
      let errors = response.errors;
      let errMessage = '';
      for (let key of Object.keys(errors)) {
        errMessage += errors[key] + ' ';
      }
      if (response.error) {
        yield put(showAuthMessage(errMessage));
      }
    }
  });
}


export default function* rootSaga() {
  yield all([    
    fork(authenticateRegister),
    fork(validateLogin),
    fork(forgotPassword),
  ]);
}
