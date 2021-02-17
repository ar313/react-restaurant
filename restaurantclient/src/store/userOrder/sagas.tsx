import storeProvider from "../storeProvider";
import { UserOrderAdd, userOrderTypes } from "./types";
import axios from 'axios';
import * as actions from "./action";
import { cartClear } from '../dishes/action';
import { put, takeEvery } from "redux-saga/effects";

var baseUrl = "https://localhost:5000";

function* addOrder(action: UserOrderAdd) {
	try {
		yield put(actions.userOrderStart());

		var order = action.payload.order;
        var url = "/order" ;

        var response = yield axios.post(baseUrl + url, order, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			yield put(cartClear());
			yield put(actions.userOrderSuccess());
        }

    } catch(err) {
        console.log(err);
        yield put(actions.userOrderFail());
    }
}

function* getOrders() {
	try {
		yield put(actions.userOrderStart());

        var url = "/order" ;

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			var pastOrders = response.data.pastOrders;
			yield put(actions.userOrderGetSuccess(pastOrders));
        }

    } catch(err) {
        console.log(err);
        yield put(actions.userOrderFail());
    }
}

export function* watchUserOrder() {
	yield takeEvery(userOrderTypes.USERORDER_ADD, addOrder);
	yield takeEvery(userOrderTypes.USERORDER_GET, getOrders);
}