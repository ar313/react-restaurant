export enum RolesTypes {
	ROLES_SUCCESS = "@@roles/ROLES_SUCCESS",
	ROLES_START = "@@roles/ROLES_START",
	ROLES_INIT = "@@roles/ROLES_INIT",
	ROLES_FAIL = "@@roles/ROLES_FAIL",
	ROLES_UPDATE = "@@roles/ROLES_UPDATE",
	ROLES_UPDATED = "@@roles/ROLES_UPDATED",
	ROLES_DELETE = "@@roles/ROLES_DELETE",
}

export interface Permission {
	id: string;
	name: string;
}

export interface Role {
	id: string;
	name: string;
	permissions: Array<Permission>;
}

export interface RolesState {
	isLoading: boolean;
	roles: Array<Role>;
	permissions: Array<Permission>;
}

export interface RolesStart {
	type: RolesTypes.ROLES_START;
}

export interface RolesSuccess {
	type: RolesTypes.ROLES_SUCCESS;
	payload: {
		roles: Array<Role>,
		permissions: Array<Permission>
	}
}

export interface RolesInit {
	type: RolesTypes.ROLES_INIT;
}

export interface RolesFail {
	type: RolesTypes.ROLES_FAIL;
}

export interface RolesUpdate {
	type: RolesTypes.ROLES_UPDATE;
	payload: {
		role: Role
	}
}

export interface RolesUpdated {
	type: RolesTypes.ROLES_UPDATED;
	payload: {
		role: Role
	}
}

export type RolesActionTypes = RolesStart 
	| RolesSuccess 
	| RolesFail
	| RolesUpdated;