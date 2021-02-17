import { Reducer } from "redux";
import { Reservation, ReservationsActionTypes, ReservationsState, ReservationsTypes } from "./types";

const initialState: ReservationsState = {
    isLoading: false,
    added: false,
    reservations: Array<Reservation>()
}

const reducer: Reducer<ReservationsState> = (state = initialState, action: ReservationsActionTypes ) => {
    switch (action.type) {
        case ReservationsTypes.RESERVATIONS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ReservationsTypes.RESERVATIONS_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case ReservationsTypes.RESERVATIONS_ADDED: {
            let reservations = [...state.reservations];
            reservations.push(action.payload.reservation);

            return {
                ...state,
                reservations: reservations,
                added: true
            }
        }
        case ReservationsTypes.RESERVATIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                reservations: action.payload.reservations,
            }
        }
        case ReservationsTypes.RESERVATIONS_ADDED_CLEAR: {
            return {
                ...state,
                added: false
            }
        }
        default: {
            return state;
        }
            
    }
}

export { reducer as ReservationsReducer };