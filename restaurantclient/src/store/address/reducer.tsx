import { Reducer } from "redux";
import { AddressState, Address, Country, City, AddressActionTypes, AddressTypes } from "./types";

export const initialState: AddressState = {
	isLoading: false,
	addresses: new Array<Address>(),
	countries: new Array<Country>(),
	cities: new Array<City>()
}

const reducer: Reducer<AddressState> = (state = initialState, action: AddressActionTypes) => {

	switch(action.type) {
		case AddressTypes.ADDRESS_START: {
			return {
				...state,
				isLoading: true
			}
		}
		case AddressTypes.ADDRESS_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case AddressTypes.ADDRESS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				addresses: action.payload.addresses,
				countries: action.payload.countries,
				cities: action.payload.cities
			}
		}
		case AddressTypes.ADDRESS_UPDATED: {
			let addresses = [...state.addresses];
			let id = action.payload.address.id;
			let index = addresses.findIndex(a => a.id === id);
			addresses[index] = action.payload.address;
			
			return {
				...state,
				addresses: addresses
			}
		}
		case AddressTypes.ADDRESS_DELETED: {
			let addresses = [...state.addresses];
			let id = action.payload.address.id;
			let index = addresses.findIndex(a => a.id === id);
			addresses.splice(index, 1);

			return {
				...state,
				addresses: addresses
			}
		}
		case AddressTypes.ADDRESS_ADDED: {
			let addresses = [...state.addresses];
			addresses.push(action.payload.address);

			return {
				...state,
				addresses: addresses
			}
		}
		default: {
			return state
		}
	}
}


export { reducer as AddressReducer }