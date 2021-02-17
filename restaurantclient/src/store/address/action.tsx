import { action } from "typesafe-actions";
import { Address, AddressTypes, City, Country } from "./types";

export const addressStart = () => action(AddressTypes.ADDRESS_START);
export const addressFail = () => action(AddressTypes.ADDRESS_FAIL);
export const addressInit = () => action(AddressTypes.ADDRESS_INIT);

export const addressSuccess = (addresses: Address[], countries: Country[], cities: City[]) => {
	return {
		type: AddressTypes.ADDRESS_SUCCESS,
		payload: {
			addresses: addresses,
			countries: countries,
			cities: cities
		}
	}
}

export const addressUpdate = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_UPDATE,
		payload: {
			address: address
		}
	}
}

export const addressUpdated = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_UPDATED,
		payload: {
			address: address
		}
	}
}

export const addressDelete = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_DELETE,
		payload: {
			address: address
		}
	}
}

export const addressDeleted = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_DELETED,
		payload: {
			address: address
		}
	}
}

export const addressAdd = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_ADD,
		payload: {
			address: address
		}
	}
}

export const addressAdded = (address: Address) => {
	return {
		type: AddressTypes.ADDRESS_ADDED,
		payload: {
			address: address
		}
	}
}