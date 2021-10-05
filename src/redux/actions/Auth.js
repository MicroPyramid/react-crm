import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SUB_DOMAIN,
  REGISTER,  
  LOGIN,  
  FORGOT_PASSWORD,
  AUTHENTICATE
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  }
};

export const authenticated = (token) => {
  return {
    type: AUTHENTICATED,
    token
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  }
};

export const signUp = (user) => {
  return {
    type: SIGNUP,
    payload: user
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const signInWithGoogle = () => {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};

export const signInWithGoogleAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    token
  };
};

export const signInWithFacebook = () => {
  return {
    type: SIGNIN_WITH_FACEBOOK
  };
};

export const signInWithFacebookAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    token
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};


// Subdomain Validation
export const subdomain = (domain) => {  
  return {
    type: SUB_DOMAIN,
    domain
  }
}

// Register
export const register = (regDetails) => {  
  return {
    type: REGISTER,
    regDetails
  }
}

export const authenticate = (bool) => {
  return {
    type: AUTHENTICATE,
    bool
  }
}

export const login = (loginDetails) => {  
  return {
    type: LOGIN,
    loginDetails
  }
}

export const forgotPassword = (fpDetails) => {  
  return {
    type: FORGOT_PASSWORD,
    fpDetails
  }
}
