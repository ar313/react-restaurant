import { put, takeEvery } from "redux-saga/effects";
import { AuthInit, AuthTypes } from "./types";
import * as actions from "./action";
import axios from "axios";

function* auth(action: AuthInit) {
	try {
		yield put(actions.authStart());

		const signInUrl = '/account/login'
		const signUpUrl = '/account/register'
		
		const url = action.payload.isSignIn ? signInUrl : signUpUrl;

		const authData = {
			email: action.payload.user.email,
			password: action.payload.user.password
		}
		
		const response = yield axios.post("https://localhost:5000" + url, authData);

		if (response.status === 200 ) {
			if (action.payload.isSignIn ) {
				let user = { token: response.data.access_token, refreshToken: response.data.refresh_token };
				yield put(actions.authSuccess(user));
			} else {
				yield put(actions.authRegistered())
			}
		}
	} catch (err) {
		console.log(err);
		yield put(actions.authError(err));
	}
}

export function* watchAuth() {
	yield takeEvery(AuthTypes.AUTH_INIT, auth);
}