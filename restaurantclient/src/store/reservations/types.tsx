import { Table } from "../tables/types";

export enum ReservationsTypes {
	RESERVATIONS_SUCCESS = "@@reservations/RESERVATIONS_SUCCESS",
	RESERVATIONS_START = "@@reservations/RESERVATIONS_START",
	RESERVATIONS_INIT = "@@reservations/RESERVATIONS_INIT",
    RESERVATIONS_FAIL = "@@reservations/RESERVATIONS_FAIL",
    RESERVATIONS_ADD = "@reservations/RESERVATIONS_ADD",
    RESERVATIONS_ADDED = "@reservations/RESERVATIONS_ADDED",
    RESERVATIONS_ADDED_CLEAR = "@reservations/RESERVATIONS_ADDED_CLEAR",
}

export interface User {
    id: string;
    email: string;
}

export interface Reservation {
    id?: string;
    user?: User;
    reservationTime: Date;
    reservationMadeTime?: Date;
    peopleCount: number;
    table: Table | string;
    isDone?: boolean;
}

export interface ReservationsState {
    isLoading: boolean;
    added: boolean;
    reservations: Array<Reservation>;
}

export interface ReservationsStart {
    type: ReservationsTypes.RESERVATIONS_START
}

export interface ReservationsFail {
    type: ReservationsTypes.RESERVATIONS_FAIL
}

export interface ReservationsSuccess {
    type: ReservationsTypes.RESERVATIONS_SUCCESS;
    payload: {
        reservations: Array<Reservation>
    }
}

export interface ReservationsAdd {
    type: ReservationsTypes.RESERVATIONS_ADD;
    payload: {
        reservation: Reservation
    };
}

export interface ReservationsAdded {
    type: ReservationsTypes.RESERVATIONS_ADDED;
    payload: {
        reservation: Reservation
    };
}

export interface ReservationsAddedClear {
    type: ReservationsTypes.RESERVATIONS_ADDED_CLEAR;
}

export interface ReservationsInit {
    type: ReservationsTypes.RESERVATIONS_INIT    
}

export type ReservationsActionTypes = 
    ReservationsStart
    | ReservationsFail
    | ReservationsSuccess
    | ReservationsAdded
    | ReservationsAddedClear;