import { action } from "typesafe-actions";
import { Permission, Role, RolesTypes } from "./types";

export const rolesStart = () => action(RolesTypes.ROLES_START);
export const rolesFail = () => action(RolesTypes.ROLES_FAIL);
export const rolesInit = () => action(RolesTypes.ROLES_INIT);

export const rolesSuccess = (roles: Role[], permissions: Permission[]) => {
    return {
        type: RolesTypes.ROLES_SUCCESS,
        payload: {
			roles: roles,
			permissions: permissions
        }
    }
}

export const rolesUpdate = (role: Role) => {
    return {
        type: RolesTypes.ROLES_UPDATE,
        payload: {
			role: role,
        }
    }
}

export const rolesUpdated = (role: Role) => {
    return {
        type: RolesTypes.ROLES_UPDATED,
        payload: {
			role: role,
        }
    }
}


