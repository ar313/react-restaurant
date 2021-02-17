import { Reducer } from "redux";
import { DeliveriesActionTypes, DeliveriesState, DeliveriesTypes, Delivery } from "./types";

const initialState: DeliveriesState = {
	isLoading: false,
	deliveries: Array<Delivery>()
}

const reducer: Reducer<DeliveriesState> = (state = initialState, action: DeliveriesActionTypes) => {
	
	switch(action.type) {
		case DeliveriesTypes.DELIVERIES_START: {
			return {
				...state,
				isLoading: true
			}
		}
		case DeliveriesTypes.DELIVERIES_SUCCESS: {
			return {
				...state,
				isLoading: false,
				deliveries: action.payload.deliveries
			}
		}
		case DeliveriesTypes.DELIVERIES_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case DeliveriesTypes.DELIVERIES_TAKE_SUCCESS: {
			let delivery = action.payload.delivery;
			let deliveries = [...state.deliveries];
			let index = deliveries.findIndex(d => d.id === delivery.id);

			deliveries[index] = delivery;

			return {
				...state,
				deliveries: deliveries,
				isLoading: false
			}
		}
		case DeliveriesTypes.DELIVERIES_COMPLETE_SUCCESS: {
			let delivery = action.payload.delivery;
			let deliveries = [...state.deliveries];
			let index = deliveries.findIndex(d => d.id === delivery.id);
			
			deliveries[index] = delivery;

			return {
				...state,
				deliveries: deliveries,
				isLoading: false
			}
		}

		default: {
			return state
		}
	}

}

export { reducer as DeliveriesReducer };