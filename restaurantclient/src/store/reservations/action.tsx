import { action } from "typesafe-actions";
import { Reservation, ReservationsTypes } from "./types";

export const reservationsStart = () => action(ReservationsTypes.RESERVATIONS_START);
export const reservationsFail = () => action(ReservationsTypes.RESERVATIONS_FAIL);
export const reservationsInit = () => action(ReservationsTypes.RESERVATIONS_INIT);
export const reservationsAddedClear = () => action(ReservationsTypes.RESERVATIONS_ADDED_CLEAR);

export const reservationsSuccess = (reservations: Array<Reservation>) => {
    return {
        type: ReservationsTypes.RESERVATIONS_SUCCESS,
        payload: {
            reservations: reservations
        }
    }
}

export const reservationsAdd = (reservation: Reservation) => {
    return {
        type: ReservationsTypes.RESERVATIONS_ADD,
        payload: {
            reservation: reservation
        }
    }
}

export const reservationsAdded = (reservation: Reservation) => {
    return {
        type: ReservationsTypes.RESERVATIONS_ADDED,
        payload: {
            reservation: reservation
        }
    }
}