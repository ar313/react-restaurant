import { Reducer } from "redux"
import { Permission, Role, RolesActionTypes, RolesState, RolesTypes } from "./types"

export const initialState: RolesState = {
    isLoading: false,
	roles: Array<Role>(),
	permissions: Array<Permission>()
}

const reducer: Reducer<RolesState> = (state = initialState, action: RolesActionTypes ) => {
	switch (action.type) {
        case RolesTypes.ROLES_START:  {
            return {
                ...state,
                isLoading: true
            }
        }
        case RolesTypes.ROLES_SUCCESS: {
            return {
                ...state,
				roles: action.payload.roles,
				permissions: action.payload.permissions,
                isLoading: false
            }
        }
        case RolesTypes.ROLES_FAIL: {
            return {
                ...state,
                isLoading: false
            }
		}
		case RolesTypes.ROLES_UPDATED: {
			var role = action.payload.role;
			var roles = [...state.roles];
			var index = roles.findIndex(r => r.id === role.id)
			roles[index] = role;
			return {
				...state,
				roles: roles
			}
		}
        default: {
            return state;
        }
    }
}

export { reducer as RolesReducer }