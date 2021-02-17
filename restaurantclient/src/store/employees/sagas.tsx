import { put, takeEvery } from "redux-saga/effects";
import { EmployeesAdd, EmployeesDelete, EmployeesTypes, EmployeesUpdate } from "./types";
import * as actions from './action';
import axios from 'axios';
import storeProvider from "../storeProvider";

var baseUrl = "https://localhost:5000";

function* getEmployees() {
    yield put(actions.employeesStart());
	try {
		
		var url = "/api/employee"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
		});
		
		if (response.status === 200) {
			var employees = response.data.employees;
			yield put(actions.employeesSuccess(employees)); 
		}

	} catch(err) {
		yield put(actions.employeesFail());
	}
}

function* updateEmployee(action: EmployeesUpdate) {
    try {
		var url = "/api/employee/" + action.payload.employee.id;
		var employee = action.payload.employee;

        var response = yield axios.put(baseUrl + url, employee, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			},
		});
		
		if (response.status === 200) {
            var newEmployee = response.data.employee
			yield put(actions.employeesUpdated(newEmployee));
		}

	} catch(err) {
		yield put(actions.employeesFail());
	}
}

function* deleteEmployee(action: EmployeesDelete) {
    try {
		
		var url = "/api/employee/" + action.payload.employee.id;
		var employee = action.payload.employee;

        var response = yield axios.delete(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			},
		});
		
		if (response.status === 200) {

			yield put(actions.employeesDeleted(employee));
		}

	} catch(err) {
		yield put(actions.employeesFail());
	}
}

function* addEmployee(action: EmployeesAdd) {
    try {
		var url = "/api/employee/" + action.payload.employee.userId;
		var employee = action.payload.employee;
        console.log('here');        
        var response = yield axios.post(baseUrl + url, null , {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
                salary: employee.salary
			},
		});
		
		if (response.status === 200) {
            var employees = response.data.employees;
			yield put(actions.employeesSuccess(employees));
		}

	} catch(err) {
		yield put(actions.employeesFail());
	}
}

export function* watchEmployees() {
    yield takeEvery(EmployeesTypes.EMPLOYEES_INIT, getEmployees);
    yield takeEvery(EmployeesTypes.EMPLOYEES_UPDATE, updateEmployee);
    yield takeEvery(EmployeesTypes.EMPLOYEES_DELETE, deleteEmployee);
    yield takeEvery(EmployeesTypes.EMPLOYEES_ADD, addEmployee);

}