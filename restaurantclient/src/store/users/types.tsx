export interface User {
	id: string;
	email: string;
	name: string;
	role: string;
	phoneNumber?: string;
}

export interface Role {
	name: string;
}

export enum UsersTypes {
    USERS_SUCCESS = "@@users/USERS_SUCCESS",
    USERS_START = "@@users/USERS_START",
    USERS_INIT = "@@users/USERS_INIT",
    USERS_FAIL = "@@users/USERS_FAIL",
    USERS_ADD = "@@users/USERS_ADD",
    USERS_UPDATE = "@@users/USERS_UPDATE",
	USERS_DELETE = "@@users/USERS_DELETE",
	USERS_UPDATED = "@@users/USERS_UPDATED",
	USERS_DELETED = "@@users/USERS_DELETED",
	USERS_ROLES_SUCCESS = "@@users/USERS_ROLES_SUCCESS",
}

export interface UsersState {
	isLoading: boolean;
	users: Array<User>;
	roles: { [k: string]: any; }
}

export interface UsersStart {
	type: typeof UsersTypes.USERS_START;
}

export interface UsersSuccess {
	type: typeof UsersTypes.USERS_SUCCESS;
	payload: {
		users: Array<User>
	}
}

export interface UsersFail {
	type: typeof UsersTypes.USERS_FAIL;
}

export interface UserRolesSuccess {
	type: typeof UsersTypes.USERS_ROLES_SUCCESS;
	payload: {
		roles: Array<Role>
	}
}

export interface UsersUpdate {
	type: typeof UsersTypes.USERS_UPDATE;
	payload: {
		user: User
	}
}

export interface UsersUpdated {
	type: typeof UsersTypes.USERS_UPDATED;
	payload: {
		user: User
	}
}


export interface UsersDelete {
	type: typeof UsersTypes.USERS_DELETE;
	payload: {
		user: User
	}
}

export interface UsersDeleted {
	type: typeof UsersTypes.USERS_DELETED;
	payload: {
		user: User
	}
}

export type UsersActionTypes = 
	UsersStart 
	| UsersSuccess
	| UsersFail
	| UserRolesSuccess
	| UsersUpdated
	| UsersDeleted;