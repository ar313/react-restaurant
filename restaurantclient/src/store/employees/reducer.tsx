import { Reducer } from "redux"
import { Employee, EmployeesActionTypes, EmployeesState, EmployeesTypes } from "./types"

const initialState: EmployeesState = {
    isLoading: false,
    employees: Array<Employee>()
}

const reducer: Reducer<EmployeesState> = (state = initialState, action: EmployeesActionTypes ) => {
    switch(action.type) {
        case EmployeesTypes.EMPLOYEES_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case EmployeesTypes.EMPLOYEES_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case EmployeesTypes.EMPLOYEES_SUCCESS: {
            return {
                ...state,
                employees: action.payload.employees
            }
        }
        case EmployeesTypes.EMPLOYEES_UPDATED: {
            let employee = action.payload.employee;
			let employees = [...state.employees];
			let index = employees.findIndex(e => e.id === employee.id);
            
            console.log(index);
            console.log(employee);
            if (index >= 0) {
				employees[index] = employee;
			}

            return {
                ...state,
                employees: employees,
                isLoading: false
            }
        }
        case EmployeesTypes.EMPLOYEES_DELETED: {
            let employee = action.payload.employee;
			let employees = [...state.employees];
			let index = employees.findIndex(e => e.id === employee.id);

			if (index >= 0) {
				employees.splice(index, 1)
            }
            
            return {
                ...state,
                employees: employees,
                isLoading: false
            }
        }
        default: {
            return state
        }
    }
}
export { reducer as EmployeesReducer }