import { put, takeEvery } from "redux-saga/effects";
import { OrdersCancel, OrdersTypes } from "./types";
import axios from 'axios';
import * as actions from './action';
import storeProvider from "../storeProvider";

const baseUrl = "https://localhost:5000";

function* getOrders() {
    try {
        yield put(actions.ordersStart());
        var url = "/order/all"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
            var orders = response.data.orders;
            yield put(actions.ordersSuccess(orders))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.ordersFail());
    }
}

function* cancelOrder(action: OrdersCancel) {
    try {
        yield put(actions.ordersStart());
        var url = "/order/cancel/" + action.payload.order.id;

        var response = yield axios.put(baseUrl + url, null, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
            var orders = response.data.orders;
            yield put(actions.ordersSuccess(orders))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.ordersFail());
    }
}

export function* watchOrders() {
    yield takeEvery(OrdersTypes.ORDERS_INIT, getOrders);
    yield takeEvery(OrdersTypes.ORDERS_CANCEL, cancelOrder);
}