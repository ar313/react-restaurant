import { Reducer } from "redux";
import { User, UsersState, UsersActionTypes, UsersTypes, Role } from "./types";

export const initialState: UsersState = {
	isLoading: true,
	users: Array<User>(),
	roles: Array<Role>()
}

const reducer: Reducer<UsersState> = (state = initialState, action: UsersActionTypes) => {

	switch (action.type) {
		case UsersTypes.USERS_START: {
			return {
				...state,
				isLoading: true
			}
		}
		case UsersTypes.USERS_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case UsersTypes.USERS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				users: action.payload.users
			}
		}
		case UsersTypes.USERS_ROLES_SUCCESS: {
			return {
				...state,
				roles: action.payload.roles
			}
		}

		case UsersTypes.USERS_UPDATED: {
			let user = action.payload.user;
			let users = [...state.users];
			let index = users.findIndex(u => u.id === user.id);

			if (index >= 0) {
				users[index] = user;
			}

			return {
				...state,
				users: users
			}
		}
		case UsersTypes.USERS_DELETED: {
			let user = action.payload.user;
			let users = [...state.users];
			let index = users.findIndex(u => u.id === user.id);

			if (index >= 0) {
				users.splice(index, 1)
			}
			
			return {
				...state,
				users: users
			}
		}

		default: {
			return state;
		}
	}
}


export { reducer as UsersReducer };