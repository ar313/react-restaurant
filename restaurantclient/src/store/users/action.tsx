import { action } from "typesafe-actions";
import { Role, User, UsersTypes } from "./types";

export const usersStart = () => action(UsersTypes.USERS_START);
export const usersFail = () => action(UsersTypes.USERS_FAIL);
export const usersInit = () => action(UsersTypes.USERS_INIT);

export const usersRolesSuccess = (roles: Array<Role>) => {
	return {
		type: UsersTypes.USERS_ROLES_SUCCESS,
		payload: {
			roles: roles
		}
	}
}

export const usersSuccess = (users: Array<User>) => {
	return {
		type: UsersTypes.USERS_SUCCESS,
		payload: {
			users: users
		}
	}
}

export const usersUpdate = (user: User) => {
	return {
		type: UsersTypes.USERS_UPDATE,
		payload: {
			user: user
		}
	}
}

export const usersUpdated = (user: User) => {
	return {
		type: UsersTypes.USERS_UPDATED,
		payload: {
			user: user
		}
	}
}

export const usersDelete = (user: User) => {
	return {
		type: UsersTypes.USERS_DELETE,
		payload: {
			user: user
		}
	}
}

export const usersDeleted = (user: User) => {
	return {
		type: UsersTypes.USERS_DELETED,
		payload: {
			user: user
		}
	}
}


export const usersRolesUpdated = (user: User) => {
	return {
		type: UsersTypes.USERS_UPDATED,
		payload: {
			user: user
		}
	}
}

export const usersRolesDeleted = (user: User) => {
	return {
		type: UsersTypes.USERS_DELETED,
		payload: {
			user: user
		}
	}
}