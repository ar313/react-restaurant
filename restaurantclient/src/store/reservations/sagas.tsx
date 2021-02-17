import { put, takeEvery } from "redux-saga/effects";
import { ReservationsAdd, ReservationsTypes } from "./types";
import * as actions from './action';
import axios from 'axios';
import storeProvider from "../storeProvider";

const baseUrl = "https://localhost:5000";

function* getReservations() {
	try {
        yield put(actions.reservationsStart());
        var url = "/api/reservation"
        
        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
            }
        });

        if (response.status === 200) {
			var reservations = response.data.reservations;
            yield put(actions.reservationsSuccess(reservations))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.reservationsFail());
    }
}

function* addReservation(action: ReservationsAdd) {
	try {
        yield put(actions.reservationsStart());
        var url = "/api/reservation";

        var response = yield axios.post(baseUrl + url, action.payload.reservation ,{
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
            }
        });

        if (response.status === 200) {
			var reservation = response.data.reservation;
            yield put(actions.reservationsAdded(reservation))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.reservationsFail());
    }
}

export function* watchReservations() {
    yield takeEvery(ReservationsTypes.RESERVATIONS_ADD, addReservation);
    yield takeEvery(ReservationsTypes.RESERVATIONS_INIT, getReservations);
}