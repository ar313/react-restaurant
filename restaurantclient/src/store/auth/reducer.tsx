import { AuthState, AuthActionTypes, AuthTypes } from "./types"
import { Reducer } from "redux"
import JwtDecode from "jwt-decode";
import Cookies from 'js-cookie';

var storageToken = Cookies.get("token") === null ? null : Cookies.get("token");
var storageRefreshToken = Cookies.get("refreshToken")? null : Cookies.get("refreshToken");

export const initialState: AuthState = {
	token: storageToken || '',
	refreshToken: storageRefreshToken || '',
	isLoading: false,
	errors: '',
	redirectUrl: '',
	isAuthenticated: storageToken? true : false
}

const reducer: Reducer<AuthState> = (state = initialState, action: AuthActionTypes) => {
	switch (action.type) {

		case AuthTypes.AUTH_START:{
			return {
				...state,
				isLoading: true
			}
		}
		case AuthTypes.AUTH_CLEAR: {
			return {
				...state,
				redirectUrl: ''
			}
		}
		case AuthTypes.AUTH_SUCCESS: {
			var token = action.payload.token
			var decodedToken:any = JwtDecode(token);
			var time = new Date(0);
			time.setSeconds(decodedToken.exp);
			Cookies.set('token', token,{ expires:time});
			Cookies.set('refreshToken', action.payload.refreshToken);
			return {
				...state,
				token: action.payload.token,
				refreshToken: action.payload.refreshToken,
				isLoading: false,
				isAuthenticated: true
			}
		}
		case AuthTypes.AUTH_REGISTERED: {
			return {
				...state,
				redirectUrl: '/login',
				isLoading: false
			}
		}
		case AuthTypes.AUTH_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case AuthTypes.AUTH_CLEAR_TOKEN: {
			return {
				...state,
				token: '',
				isAuthenticated: false
			}
		}
		default: {
			return state;
		}
	}
}

export { reducer as AuthReducer };