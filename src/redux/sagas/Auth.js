import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {  
  REGISTER,
  SUB_DOMAIN,
  LOGIN,
  FORGOT_PASSWORD,
} from '../constants/Auth';
import {
  showAuthMessage,  
  authenticate,
} from '../actions/Auth';

import { service } from '../../service';

// Subdomain Validation
// export function* validateSubdomain() {
//   yield takeEvery(SUB_DOMAIN, function* ({ domain }) {
//     const { subdomain } = domain;
//     try {
//       let response = yield call(service.post, 'auth/validate-subdomain/', {
//         sub_domain: subdomain,
//       });
//       if (!response.data.error) {
//         yield put(authenticate(true));
//         localStorage.setItem('SubDomain', subdomain);
//       }
//     } catch (err) {
//       let response = err.response.data;
//       if (response.error) {
//         yield put(showAuthMessage(response.message));
//       }
//     }
//   });
// }

// Login function

export function* validateLogin() {
  yield takeEvery(LOGIN, function* ({ loginDetails }) {
    const { email, password } = loginDetails;    
    try {            
      let response = yield call(service.post, 'auth/login/', {
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
        yield put(showAuthMessage(response.message));
      }
    }
  });
}

// Register function
export function* authenticateRegister() {
  yield takeEvery(REGISTER, function* ({ regDetails }) {
    const { subdomain, username, email, password } = regDetails;
    try {
      let response = yield call(service.post, 'auth/register/', {        
        username: username,
        email: email,
        password: password,
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

export function* forgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, function* ({ fpDetails }) {
    let { email } = fpDetails;
    try {
      let response = yield call(service.post, 'auth/forgot-password/', {
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
    ,
    // fork(validateSubdomain),
    fork(authenticateRegister),
    fork(validateLogin),
    fork(forgotPassword),
  ]);
}
