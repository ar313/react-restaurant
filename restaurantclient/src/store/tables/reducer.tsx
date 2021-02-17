import { Reducer } from "redux";
import { Table, TablesActionTypes, TablesState, TablesTypes } from "./types";

const initialState: TablesState = {
    isLoading: false,
    tables: Array<Table>()
};

const reducer: Reducer<TablesState> = (state = initialState, action: TablesActionTypes ) => {
    switch (action.type) {
        case TablesTypes.TABLES_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case TablesTypes.TABLES_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case TablesTypes.TABLES_SUCCESS: {
            
            return {
                ...state,
                isLoading: false,
                tables: action.payload.tables
            }
        }
        default: {
            return state
        }
    }
}

export { reducer as TablesReducer }