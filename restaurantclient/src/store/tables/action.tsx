import { action } from "typesafe-actions";
import { Table, TablesTypes } from "./types";

export const tablesStart = () => action(TablesTypes.TABLES_START);
export const tablesFail = () => action(TablesTypes.TABLES_FAIL);

export const tablesInit = (reservationTime: Date) => {
    return {
        type: TablesTypes.TABLES_INIT,
        payload: {
            reservationTime: reservationTime
        }
    }
}

export const tablesSuccess = (tables: Array<Table>) => {
    return {
        type: TablesTypes.TABLES_SUCCESS,
        payload: {
            tables: tables
        }
    }
}