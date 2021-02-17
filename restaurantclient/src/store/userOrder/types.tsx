import { Address } from "../address/types";

export enum userOrderTypes {
	USERORDER_SUCCESS = "@@userOrder/USERORDER_SUCCESS",
	USERORDER_START = "@@userOrder/USERORDER_START",
	USERORDER_INIT = "@@userOrder/USERORDER_INIT",
	USERORDER_FAIL = "@@userOrder/USERORDER_FAIL",
	USERORDER_CLEAR = "@@userOrder/USERORDER_CLEAR",
	USERORDER_GET = "@@userOrder/USERORDER_GET",
	USERORDER_GET_SUCCESS = "@@userOrder/USERORDER_GET_SUCCESS",
	USERORDER_ADD = "@@userOrder/USERORDER_ADD",
	USERORDER_ADDED = "@@userOrder/USERORDER_ADDED"
}

export interface userOrderState {
	isLoading: boolean;
	ordered: boolean;
	pastOrders: Array<PastOrder>; 
}

export interface CreditCard {
	cardNumber: string;
	expirationDate: string;
	ccv: string;
}

export interface BillingAddress {
	firstName: string;
	lastName: string;
	address: string;
	country: string;
	city: string;
	zip: string;
}

export interface dishItems {
	name: string;
	quantity: number;
}

export interface Order {
	dishes: dishItems[];
	isForDelivery: boolean;
	deliveryAddress: Address;
	creditCard?: CreditCard;
	paymentType: string;
	billingAddress?: BillingAddress;
}

export interface PastOrder {
	orderTime: Date;
	totalPrice: string;
	isDelivered: boolean;
	dishes: dishItems[];
}

export interface UserOrderStart {
	type: userOrderTypes.USERORDER_START;
}

export interface UserOrderFail {
	type: userOrderTypes.USERORDER_FAIL;
}

export interface UserOrderSuccess {
	type: userOrderTypes.USERORDER_SUCCESS;
}

export interface UserOrderAdd {
	type: userOrderTypes.USERORDER_ADD;
	payload: {
		order: Order
	};
}

export interface UserOrderClear {
	type: userOrderTypes.USERORDER_CLEAR;
}

export interface UserOrderGetSuccess {
	type: userOrderTypes.USERORDER_GET_SUCCESS;
	payload: {
		pastOrders: Array<PastOrder>; 
	}
}


export type UserOrderActionTypes =
	UserOrderStart
	| UserOrderFail
	| UserOrderSuccess
	| UserOrderClear
	| UserOrderGetSuccess;
