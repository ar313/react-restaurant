import * as actions from './action';
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { TablesInit, TablesTypes } from './types';
import storeProvider from '../storeProvider';

const baseUrl = "https://localhost:5000";

function* getFreeTables(action: TablesInit) {
	try {
        yield put(actions.tablesStart());
        var url = "/api/table/free"
        console.log(action.payload.reservationTime.toString());
        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
                reservationDate: action.payload.reservationTime.toLocaleString()
              }
        });

        if (response.status === 200) {
			var tables = response.data.tables;
            yield put(actions.tablesSuccess(tables))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.tablesFail());
    }
}

export function* watchTables() {
    yield takeEvery(TablesTypes.TABLES_INIT, getFreeTables);
}