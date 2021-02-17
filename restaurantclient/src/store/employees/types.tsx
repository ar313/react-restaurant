import { User } from "../users/types";

export interface Employee {
    id: string;
    user: User;
    salary: number;
}

export interface AddEmployee {
    salary: number;
    userId: string;
}

export enum EmployeesTypes {
    EMPLOYEES_SUCCESS = "@@employees/EMPLOYEES_SUCCESS",
    EMPLOYEES_START = "@@employees/EMPLOYEES_START",
    EMPLOYEES_INIT = "@@employees/EMPLOYEES_INIT",
    EMPLOYEES_FAIL = "@@employees/EMPLOYEES_FAIL",
    EMPLOYEES_ADD = "@@employees/EMPLOYEES_ADD",
    EMPLOYEES_UPDATE = "@@employees/EMPLOYEES_UPDATE",
	EMPLOYEES_DELETE = "@@employees/EMPLOYEES_DELETE",
	EMPLOYEES_UPDATED = "@@employees/EMPLOYEES_UPDATED",
	EMPLOYEES_DELETED = "@@employees/EMPLOYEES_DELETED",
}

export interface EmployeesState {
	isLoading: boolean;
	employees: Array<Employee>;
}

export interface EmployeesStart {
	type: typeof EmployeesTypes.EMPLOYEES_START;
}

export interface EmployeesAdd {
    type: typeof EmployeesTypes.EMPLOYEES_ADD;
    payload: {
        employee: AddEmployee
    }
}

export interface EmployeesSuccess {
	type: typeof EmployeesTypes.EMPLOYEES_SUCCESS;
	payload: {
		employees: Array<Employee>
	}
}

export interface EmployeesFail {
	type: typeof EmployeesTypes.EMPLOYEES_FAIL;
}

export interface EmployeesUpdate {
	type: typeof EmployeesTypes.EMPLOYEES_UPDATE;
	payload: {
		employee: Employee
	}
}

export interface EmployeesUpdated {
	type: typeof EmployeesTypes.EMPLOYEES_UPDATED;
	payload: {
		employee: Employee
	}
}


export interface EmployeesDelete {
	type: typeof EmployeesTypes.EMPLOYEES_DELETE;
	payload: {
		employee: Employee
	}
}

export interface EmployeesDeleted {
	type: typeof EmployeesTypes.EMPLOYEES_DELETED;
	payload: {
		employee: Employee
	}
}

export type EmployeesActionTypes = 
	EmployeesStart 
	| EmployeesSuccess
	| EmployeesFail
	| EmployeesUpdated
	| EmployeesDeleted;