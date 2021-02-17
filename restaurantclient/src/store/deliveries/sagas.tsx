import { put, takeEvery } from "redux-saga/effects";
import { DeliveriesComplete, DeliveriesTake, DeliveriesTypes } from "./types";
import * as actions from "./action";
import axios from 'axios';
import storeProvider from "../storeProvider";

var baseUrl = "https://localhost:5000";

function* getDeliveries() {
	try {
		yield put(actions.deliveriesStart());

        var url = "/api/delivery" ;

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			var deliveries = response.data.deliveries;
			yield put(actions.deliveriesSuccess(deliveries));
        }

    } catch(err) {
        console.log(err);
        yield put(actions.deliveriesFail());
    }
}

function* takeDelivery(action: DeliveriesTake) {
	try {
		yield put(actions.deliveriesStart());

		var oldDelivery = action.payload.delivery;

        var url = "/api/delivery/take/" + oldDelivery.id;

        var response = yield axios.put(baseUrl + url, oldDelivery ,{
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			var delivery = response.data.delivery;
			yield put(actions.deliveriesTakeSuccess(delivery));
        }

    } catch(err) {
        console.log(err);
        yield put(actions.deliveriesFail());
    }
}

function* completeDelivery(action: DeliveriesComplete) {
	try {
		yield put(actions.deliveriesStart());

		var oldDelivery = action.payload.delivery;

        var url = "/api/delivery/complete/" + oldDelivery.id;

        var response = yield axios.put(baseUrl + url, oldDelivery ,{
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
			var delivery = response.data.delivery;
			yield put(actions.deliveriesCompleteSuccess(delivery));
        }

    } catch(err) {
        console.log(err);
        yield put(actions.deliveriesFail());
    }
}

export function* watchDeliveries() {
	yield takeEvery(DeliveriesTypes.DELIVERIES_INIT, getDeliveries);
	yield takeEvery(DeliveriesTypes.DELIVERIES_TAKE, takeDelivery);
	yield takeEvery(DeliveriesTypes.DELIVERIES_COMPLETE, completeDelivery);
}