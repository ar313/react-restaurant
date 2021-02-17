import { action } from "typesafe-actions";
import { Order, OrdersTypes } from "./types";

export const ordersStart = () => action(OrdersTypes.ORDERS_START);
export const ordersFail = () => action(OrdersTypes.ORDERS_FAIL);
export const ordersInit = () => action(OrdersTypes.ORDERS_INIT);

export const ordersCancel = (order: Order) => {
    return {
        type: OrdersTypes.ORDERS_CANCEL,
        payload: {
            order: order
        }
    }
}

export const ordersSuccess = (orders: Order[]) => {
    return {
        type: OrdersTypes.ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}