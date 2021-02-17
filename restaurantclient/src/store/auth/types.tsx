export interface Auth {
	email: string;
	password: string;
}

export interface Authenticated {
	token: string;
	refreshToken: string;
}

export enum AuthTypes {
	AUTH_SUCCESS = "@@auth/AUTH_SUCCESS",
	AUTH_FAIL = "@@auth/AUTH_FAIL",
	AUTH_START = "@@auth/AUTH_START",
	AUTH_INIT = "@@auth/AUTH_INIT",
	AUTH_REGISTERED = "@@auth/AUTH_REGISTERED",
	AUTH_CLEAR = "@@auth/AUTH_CLEAR",
	AUTH_CLEAR_TOKEN = "@@auth/AUTH_CLEAR_TOKEN"
}

export interface AuthClear {
	type: typeof AuthTypes.AUTH_CLEAR
}

export interface AuthClearToken {
	type: typeof AuthTypes.AUTH_CLEAR_TOKEN
}

export interface AuthFail {
	type: typeof AuthTypes.AUTH_FAIL
}

export interface AuthInit {
	type: typeof AuthTypes.AUTH_INIT,
	payload: { user: Auth, isSignIn: boolean };
}

export interface AuthSucess {
	type: typeof AuthTypes.AUTH_SUCCESS;
	payload: Authenticated;
}

export interface AuthStart {
	type: typeof AuthTypes.AUTH_START
}

export interface AuthRegistered {
	type: typeof AuthTypes.AUTH_REGISTERED
}

export interface AuthState {
	readonly token: string;
	readonly refreshToken: string;
	readonly isLoading: boolean;
	readonly errors: string;
	readonly redirectUrl: string;
	readonly isAuthenticated: boolean;
}

export type AuthActionTypes = AuthInit 
	| AuthStart 
	| AuthSucess 
	| AuthRegistered 
	| AuthClear
	| AuthFail
	| AuthClearToken;