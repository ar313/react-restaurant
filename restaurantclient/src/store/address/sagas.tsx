import { put, takeEvery } from "redux-saga/effects";
import storeProvider from "../storeProvider";
import axios from 'axios';
import * as actions from './action';
import { AddressAdd, AddressDelete, AddressTypes, AddressUpdate } from "./types";

var baseUrl = "https://localhost:5000";

function* getAddresses() {
	try {
		yield put(actions.addressStart());
		var url = "/api/address"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {

			var addresses = response.data.addresses;
			var countries = response.data.countries;
			var cities = response.data.cities;

			yield put(actions.addressSuccess(addresses, countries, cities));
		}

	} catch(err) {
		yield put(actions.addressFail());
	}
}

function* updateAddress(action: AddressUpdate) {
	try {
		yield put(actions.addressStart());
		var url = "/api/address/" + action.payload.address.id;

        var response = yield axios.put(baseUrl + url, action.payload.address, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {

			yield put(actions.addressUpdated(action.payload.address));
		}

	} catch(err) {
		yield put(actions.addressFail());
	}
}

function* deleteAddress(action: AddressDelete) {
	try {
		yield put(actions.addressStart());
		var url = "/api/address/" + action.payload.address.id;

        var response = yield axios.delete(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {

			yield put(actions.addressDeleted(action.payload.address));
		}

	} catch(err) {
		yield put(actions.addressFail());
	}
}

function* addAddress(action: AddressAdd) {
	try {
		yield put(actions.addressStart());
		var url = "/api/address";

        var response = yield axios.post(baseUrl + url, action.payload.address, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {
			var address = response.data.address
			yield put(actions.addressAdded(address));
		}

	} catch(err) {
		yield put(actions.addressFail());
	}
}

export function* watchAddress() {
	yield takeEvery(AddressTypes.ADDRESS_INIT, getAddresses);
	yield takeEvery(AddressTypes.ADDRESS_ADD, addAddress);
	yield takeEvery(AddressTypes.ADDRESS_DELETE, deleteAddress);
	yield takeEvery(AddressTypes.ADDRESS_UPDATE, updateAddress);
}