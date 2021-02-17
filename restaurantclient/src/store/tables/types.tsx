export enum TablesTypes {
	TABLES_SUCCESS = "@@tables/TABLES_SUCCESS",
	TABLES_START = "@@tables/TABLES_START",
	TABLES_INIT = "@@tables/TABLES_INIT",
	TABLES_FAIL = "@@tables/TABLES_FAIL",
}

export interface Table {
    id: string;
    number: string;
}

export interface TablesState {
    isLoading: boolean;
    tables: Array<Table>;
}

export interface TablesStart {
    type: TablesTypes.TABLES_START
}

export interface TablesFail {
    type: TablesTypes.TABLES_FAIL
}

export interface TablesSuccess {
    type: TablesTypes.TABLES_SUCCESS;
    payload: {
        tables: Array<Table>
    }
}

export interface TablesInit {
    type: TablesTypes.TABLES_INIT
    payload: {
        reservationTime: Date
    }
}

export type TablesActionTypes = 
    TablesStart
    | TablesFail
    | TablesSuccess;