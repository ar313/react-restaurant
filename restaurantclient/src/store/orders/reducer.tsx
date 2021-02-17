import { Reducer } from "redux"
import { Order, OrdersActionTypes, OrdersState, OrdersTypes } from "./types"

const initialState: OrdersState = {
    isLoading: false,
    orders: Array<Order>()
}

const reducer: Reducer<OrdersState> = (state = initialState, action: OrdersActionTypes ) => {
    
    switch (action.type) {
        case OrdersTypes.ORDERS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case OrdersTypes.ORDERS_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case OrdersTypes.ORDERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                orders: action.payload.orders
            }
        }
        default: {
            return state
        }
    }
}

export {reducer as OrdersReducer}