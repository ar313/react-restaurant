import { action } from "typesafe-actions";
import { DeliveriesTypes, Delivery } from "./types";

export const deliveriesStart = () => action(DeliveriesTypes.DELIVERIES_START);
export const deliveriesFail = () => action(DeliveriesTypes.DELIVERIES_FAIL);
export const deliveriesInit = () => action(DeliveriesTypes.DELIVERIES_INIT);

export const deliveriesSuccess = (deliveries: Array<Delivery>) => {
	return {
		type: DeliveriesTypes.DELIVERIES_SUCCESS,
		payload: {
			deliveries: deliveries
		}
	}
}

export const deliveriesTake = (delivery: Delivery) => {
	return {
		type: DeliveriesTypes.DELIVERIES_TAKE,
		payload: {
			delivery: delivery
		}
	}
} 

export const deliveriesComplete = (delivery: Delivery) => {
	return {
		type: DeliveriesTypes.DELIVERIES_COMPLETE,
		payload: {
			delivery: delivery
		}
	}
} 

export const deliveriesCompleteSuccess = (delivery: Delivery) => {
	return {
		type: DeliveriesTypes.DELIVERIES_COMPLETE_SUCCESS,
		payload: {
			delivery: delivery
		}
	}
} 

export const deliveriesTakeSuccess = (delivery: Delivery) => {
	return {
		type: DeliveriesTypes.DELIVERIES_TAKE_SUCCESS,
		payload: {
			delivery: delivery
		}
	}
} 