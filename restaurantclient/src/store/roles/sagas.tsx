import { put, takeEvery } from "redux-saga/effects";
import { RolesTypes, RolesUpdate } from "./types";
import axios from 'axios';
import * as actions from "./action";
import storeProvider from "../storeProvider";

var baseUrl = "https://localhost:5000";

function* getRoles() {
	try {
        yield put(actions.rolesStart());
        var url = "/permission"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			var roles = response.data.roles;
			var permissions = response.data.permissions;
            yield put(actions.rolesSuccess(roles, permissions))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.rolesFail());
    }
}

function* updateRole(action: RolesUpdate) {
	try {
		var role = action.payload.role;
        var url = "/permission/" + role.id;

        var response = yield axios.put(baseUrl + url, role, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
            yield put(actions.rolesUpdated(role));
        }

    } catch(err) {
        console.log(err);
        yield put(actions.rolesFail());
    }
}

export function* watchRoles() {
	yield takeEvery(RolesTypes.ROLES_INIT, getRoles);
	yield takeEvery(RolesTypes.ROLES_UPDATE, updateRole);
}