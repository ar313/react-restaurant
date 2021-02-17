import { Dish } from "../dishes/types";

export enum OrdersTypes {
	ORDERS_SUCCESS = "@@orders/ORDERS_SUCCESS",
	ORDERS_START = "@@orders/ORDERS_START",
	ORDERS_INIT = "@@orders/ORDERS_INIT",
	ORDERS_FAIL = "@@orders/ORDERS_FAIL",
	ORDERS_CANCEL = "@@orders/ORDERS_CANCEL",
	ORDERS_GET = "@@orders/ORDERS_GET",
	ORDERS_GET_SUCCESS = "@@orders/ORDERS_GET_SUCCESS",
	ORDERS_ADD = "@@orders/ORDERS_ADD",
	ORDERS_ADDED = "@@orders/ORDERS_ADDED"
}

export interface OrdersState {
    isLoading: boolean;
    orders: Order[];
}

export interface OrderDish {
    name: string;
    quantity: number;
}

export interface Order {
    id: string
    orderTime: Date;
	totalPrice: string;
    isDelivered: boolean;
    isCancelled: boolean;
	dishes: OrderDish[];
}

export interface OrdersStart {
    type: OrdersTypes.ORDERS_START;
}

export interface OrdersFail {
    type: OrdersTypes.ORDERS_FAIL;
}

export interface OrdersSuccess {
    type: OrdersTypes.ORDERS_SUCCESS;
    payload: {
        orders: Order[]
    }
}

export interface OrdersCancel {
    type: OrdersTypes.ORDERS_CANCEL;
    payload: {
        order: Order
    }
}

export type OrdersActionTypes = 
    OrdersStart
    | OrdersFail
    | OrdersSuccess;
