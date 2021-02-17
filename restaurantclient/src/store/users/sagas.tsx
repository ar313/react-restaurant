import { put, takeEvery } from "redux-saga/effects";
import storeProvider from "../storeProvider";
import axios from 'axios';
import * as actions from './action';
import { UsersDelete, UsersTypes, UsersUpdate } from "./types";

var baseUrl = "https://localhost:5000";

function* getUsers() {
	yield put(actions.usersStart());
	try {
		
		var url = "/api/users"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {
			var users = response.data.users;
			yield put(actions.usersSuccess(users)); 
		}

	} catch(err) {
		yield put(actions.usersFail());
	}
}

export function* getRoles() {
	try {
		
		var url = "/api/users/roles"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {

			var roles = response.data.roles.map((r: any) =>  r.name);

			yield put(actions.usersRolesSuccess(roles));
		}

	} catch(err) {
		yield put(actions.usersFail());
	}
}

function* updateUser(action: UsersUpdate) {
	try {
		var url = "/api/users/" + action.payload.user.id;
		var user = action.payload.user;

        var response = yield axios.put(baseUrl + url, user, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			},
		});
		
		if (response.status === 200) {

			yield put(actions.usersUpdated(user));
		}

	} catch(err) {
		yield put(actions.usersFail());
	}
}

function* deleteUser(action: UsersDelete) {
	try {
		
		var url = "/api/users/" + action.payload.user.id;
		var user = action.payload.user;

        var response = yield axios.delete(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			},
		});
		
		if (response.status === 200) {

			yield put(actions.usersDeleted(user));
		}

	} catch(err) {
		yield put(actions.usersFail());
	}
}

export function* watchUsers() {
	yield takeEvery(UsersTypes.USERS_INIT, getUsers);
	yield takeEvery(UsersTypes.USERS_INIT, getRoles);
	yield takeEvery(UsersTypes.USERS_UPDATE, updateUser);
	yield takeEvery(UsersTypes.USERS_DELETE, deleteUser);
}