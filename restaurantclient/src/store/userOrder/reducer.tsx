import { Reducer } from "redux";
import { userOrderState, UserOrderActionTypes, userOrderTypes, PastOrder } from "./types";

const initialState: userOrderState = {
	isLoading: false,
	ordered: false,
	pastOrders: new Array<PastOrder>()
}

const reducer: Reducer<userOrderState> = (state = initialState, action: UserOrderActionTypes) => {
	switch(action.type) {
		case userOrderTypes.USERORDER_START: {
			return {
				...state,
				isLoading: true
			}
		}
		case userOrderTypes.USERORDER_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case userOrderTypes.USERORDER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				ordered: true
			}
		}
		case userOrderTypes.USERORDER_GET_SUCCESS: {
			return {
				...state,
				isLoading: false,
				pastOrders: action.payload.pastOrders
			}
		}
		case userOrderTypes.USERORDER_CLEAR: {
			return {
				...state,
				isLoading: false,
				ordered: false
			}
		}
		default: {
			return state;
		}
	}
}

export { reducer as UserOrderReducer };