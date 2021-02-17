import { action } from "typesafe-actions";
import { EmployeesTypes, Employee, AddEmployee } from "./types";

export const employeesStart = () => action(EmployeesTypes.EMPLOYEES_START);
export const employeesFail = () => action(EmployeesTypes.EMPLOYEES_FAIL);
export const employeesInit = () => action(EmployeesTypes.EMPLOYEES_INIT);

export const employeesAdd = (employee: AddEmployee) => {
    return {
		type: EmployeesTypes.EMPLOYEES_ADD,
		payload: {
			employee: employee
		}
    }
}

export const employeesSuccess = (employees: Array<Employee>) => {
	return {
		type: EmployeesTypes.EMPLOYEES_SUCCESS,
		payload: {
			employees: employees
		}
	}
}

export const employeesUpdate = (employee: Employee) => {
	return {
		type: EmployeesTypes.EMPLOYEES_UPDATE,
		payload: {
			employee: employee
		}
	}
}

export const employeesUpdated = (employee: Employee) => {
	return {
		type: EmployeesTypes.EMPLOYEES_UPDATED,
		payload: {
			employee: employee
		}
	}
}

export const employeesDelete = (employee: Employee) => {
	return {
		type: EmployeesTypes.EMPLOYEES_DELETE,
		payload: {
			employee: employee
		}
	}
}

export const employeesDeleted = (employee: Employee) => {
	return {
		type: EmployeesTypes.EMPLOYEES_DELETED,
		payload: {
			employee: employee
		}
	}
}
