import { Address } from "../address/types";
import { dishItems } from "../userOrder/types";

export enum DeliveriesTypes {
	DELIVERIES_SUCCESS = "@@deliveries/DELIVERIES_SUCCESS",
	DELIVERIES_START = "@@deliveries/DELIVERIES_START",
	DELIVERIES_INIT = "@@deliveries/DELIVERIES_INIT",
	DELIVERIES_FAIL = "@@deliveries/DELIVERIES_FAIL",
	DELIVERIES_TAKE = "@@deliveries/DELIVERIES_TAKE",
	DELIVERIES_TAKE_SUCCESS = "@@deliveries/DELIVERIES_GET_SUCCESS",
	DELIVERIES_COMPLETE = "@@deliveries/DELIVERIES_COMPLETE",
	DELIVERIES_COMPLETE_SUCCESS = "@@deliveries/DELIVERIES_COMPLETE_SUCCESS"
}

export interface DeliveriesState {
	isLoading: boolean;
	deliveries: Array<Delivery>;
}

export interface Delivery {
	id: string;
	orderId: string;
	deliveryPersonId: string
	orderTime: Date;
	isDelivered: boolean;
	isCancelled: boolean;
	deliveryAddress: Address;
	deliveryTime: Date;
	isPaid: boolean;
	orderItems: Array<dishItems>;
	totalPrice: number;
	paidPrice?: number;
}

export interface DeliveriesStart {
	type: DeliveriesTypes.DELIVERIES_START;
}

export interface DeliveriesInit {
	type: DeliveriesTypes.DELIVERIES_INIT;
}

export interface DeliveriesSuccess {
	type: DeliveriesTypes.DELIVERIES_SUCCESS;
	payload: {
		deliveries: Array<Delivery>
	}
}

export interface DeliveriesFail {
	type: DeliveriesTypes.DELIVERIES_FAIL;
}

export interface DeliveriesTake {
	type: DeliveriesTypes.DELIVERIES_TAKE,
	payload: {
		delivery: Delivery
	}
}

export interface DeliveriesComplete {
	type: DeliveriesTypes.DELIVERIES_COMPLETE,
	payload: {
		delivery: Delivery
	}
}

export interface DeliveriesCompleteSuccess {
	type: DeliveriesTypes.DELIVERIES_COMPLETE_SUCCESS,
	payload: {
		delivery: Delivery
	}
}

export interface DeliveriesTakeSuccess {
	type: DeliveriesTypes.DELIVERIES_TAKE_SUCCESS,
	payload: {
		delivery: Delivery
	}
}

export type DeliveriesActionTypes = 
	DeliveriesStart
	| DeliveriesSuccess
	| DeliveriesFail
	| DeliveriesTakeSuccess
	| DeliveriesCompleteSuccess;