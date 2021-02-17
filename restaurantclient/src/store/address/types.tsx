export interface Address {
	id: string;
	name: string;
	city: City;
	country: Country;
	street: string
}

export interface Country {
	id: string;
	name: string;
}

export interface City {
	id: string;
	name: string;
}

export interface AddressState {
	isLoading: boolean,
	addresses: Address[],
	countries: Country[],
	cities: City[]
}

export enum AddressTypes {
	ADDRESS_SUCCESS = "@@address/ADDRESS_SUCCESS",
	ADDRESS_START = "@@address/ADDRESS_START",
	ADDRESS_INIT = "@@address/ADDRESS_INIT",
	ADDRESS_FAIL = "@@address/ADDRESS_FAIL",
	ADDRESS_UPDATE = "@@address/ADDRESS_UPDATE",
	ADDRESS_UPDATED = "@@address/ADDRESS_UPDATED",
	ADDRESS_DELETE = "@@address/ADDRESS_DELETE",
	ADDRESS_DELETED = "@@address/ADDRESS_DELETED",
	ADDRESS_ADD = "@@address/ADDRESS_ADD",
	ADDRESS_ADDED = "@@address/ADDRESS_ADDED"
}

export interface AddressStart {
	type: AddressTypes.ADDRESS_START;
}

export interface AddressFail {
	type: AddressTypes.ADDRESS_FAIL;
}

export interface AddressSuccess {
	type: AddressTypes.ADDRESS_SUCCESS;
	payload: {
		addresses: Address[],
		countries: Country[],
		cities: City[]
	}
}

export interface AddressUpdate {
	type: AddressTypes.ADDRESS_UPDATE;
	payload: {
		address: Address
	}
}

export interface AddressUpdated {
	type: AddressTypes.ADDRESS_UPDATED;
	payload: {
		address: Address
	}
}

export interface AddressDelete {
	type: AddressTypes.ADDRESS_DELETE;
	payload: {
		address: Address
	}
}

export interface AddressDeleted {
	type: AddressTypes.ADDRESS_DELETED;
	payload: {
		address: Address
	}
}

export interface AddressAdd {
	type: AddressTypes.ADDRESS_ADD;
	payload: {
		address: Address
	}
}

export interface AddressAdded {
	type: AddressTypes.ADDRESS_ADDED;
	payload: {
		address: Address
	}
}

export type AddressActionTypes = 
	AddressStart 
	| AddressFail 
	| AddressSuccess
	| AddressAdded
	| AddressUpdated
	| AddressDeleted;