import { action } from "typesafe-actions";
import { AuthTypes, Authenticated } from "./types";

export const authStart = () => action(AuthTypes.AUTH_START);

export const authSuccess = (data: Authenticated) =>
	action(AuthTypes.AUTH_SUCCESS, data);

export const authError = (error: string) => 
	action(AuthTypes.AUTH_FAIL, error);

export const authRegistered = () => action(AuthTypes.AUTH_REGISTERED);

export const authClear = () => action(AuthTypes.AUTH_CLEAR);

export const authClearToken = () => action(AuthTypes.AUTH_CLEAR_TOKEN);

export const auth = (email: string, password: string, isSignIn: boolean) => {	
	return {
		type: AuthTypes.AUTH_INIT,
		payload:{
			user: {
				email: email,
				password: password
			},
			isSignIn: isSignIn
		}
	}
}