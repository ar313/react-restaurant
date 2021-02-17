import { action } from "typesafe-actions";
import { Order, PastOrder, userOrderTypes } from "./types";


export const userOrderStart = () => action(userOrderTypes.USERORDER_START);
export const userOrderFail = () => action(userOrderTypes.USERORDER_FAIL);
export const userOrderInit = () => action(userOrderTypes.USERORDER_INIT);
export const userOrderSuccess = () => action(userOrderTypes.USERORDER_SUCCESS);
export const userOrderClear = () => action(userOrderTypes.USERORDER_CLEAR);

export const userOrderGet = () => action(userOrderTypes.USERORDER_GET);

export const userOrderGetSuccess = (pastOrders: Array<PastOrder>) => {
	return {
		type: userOrderTypes.USERORDER_GET_SUCCESS,
		payload: {
			pastOrders: pastOrders
		}
	}
}

export const userOrderAdd = (order: Order) => {
	return {
		type: userOrderTypes.USERORDER_ADD,
		payload: {
			order: order
		}
	}
}