import {
	AUTH_TOKEN,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SHOW_LOADING,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
	SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
	REGISTER,
	SUB_DOMAIN,
	AUTHENTICATE,
	LOGIN,
	FORGOT_PASSWORD
} from '../constants/Auth';

const initState = {
	loading: false,
	auth: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN),
	subdomain: '',
	username: '',
	email: '',
	password: ''
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			return {
				...state,
				loading: false,
				redirect: '/',
				token: action.token
			}
		case SHOW_AUTH_MESSAGE:		
		// console.log('The value of SHOW_AUTH_MESSAGE  action :', action)	
		// console.log('The value of SHOW_AUTH_MESSAGE  :', action.message)	
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE:
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT_SUCCESS: {
			return {
				...state,
				token: null,
				redirect: '/',
				loading: false
			}
		}
		case SIGNUP_SUCCESS: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SUB_DOMAIN: {
			return {
				...state,
				subdomain: action.domain.subdomain
			}
		}
		case AUTHENTICATE: {
			return {
				...state,
				auth: action.bool
			}
		}
		case REGISTER: {
			const { subdomain, username, email, password } = action.regDetails
			return {
				...state,
				subdomain: subdomain,
				username: username,
				email: email,
				password: password
			}
		}
		case LOGIN: {
			const { email, password } = action.loginDetails
			return {
				...state,
				email: email,
				password: password
			}
		}
		case FORGOT_PASSWORD: {
			return {
				...state,
				email: action.email
			}
		}
		default:
			return state;
	}
}

export default auth