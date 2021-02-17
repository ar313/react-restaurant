import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { reservationsInit } from '../../store/reservations/action';
import { Reservation } from '../../store/reservations/types';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';
import { Table as TableType }  from '../../store/tables/types';
import classes from './Reservations.module.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';

interface IProps {
    isLoading: boolean;
    reservations: Array<Reservation>;
    getReservations: () => void;
}

interface IState {
    role: string;
}

class Reservations extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        var cookieToken = Cookies.get('token')?? null;
        var accessToken =  cookieToken? cookieToken : '';
        var role = '';

        if( accessToken.length !== 0) {
            var decoded: any = JwtDecode(accessToken);
            role = decoded.role;
        }

        this.state = {
            role: role
        }
    }

    componentDidMount() {
        this.props.getReservations();
    }

	render() {

        if (this.props.isLoading) {
            return (
                <div className={classes.Spinner}> 
                    <CircularProgress size={100} /> 
                </div>
            )
        } 

		return (
            <div className={classes.Container}>
            <h3>Reservations</h3>
            <TableContainer component={Paper} >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>  
                  {this.state.role === "Manager"?<TableCell>User</TableCell>: null}
                    <TableCell>Reservation Time</TableCell>
                    <TableCell align="right">Completed</TableCell>
                    <TableCell align="right">People Count</TableCell>
                    <TableCell align="right">Table</TableCell>
                    <TableCell align="right">Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.reservations.map((reservation) => {
                        let reservationTime = new Date(reservation.reservationTime).toLocaleString();
                        let reservationMade: string;
                        if (reservation.reservationMadeTime) {
                            reservationMade = new Date(reservation.reservationMadeTime).toLocaleString();
                        } else {
                            reservationMade = '' 
                        }
                        return (
                            <TableRow key={reservation.id}>
                           {this.state.role === "Manager"?<TableCell component="th" scope="row">{reservation.user?.email}</TableCell>: null} 
                            <TableCell>
                                {reservationTime}
                            </TableCell>
                            <TableCell align="right">{reservation.isDone? 
                                    <DoneIcon style={{ color: green[500] }} />:
                                    <ClearIcon style={{ color: red[500] }} /> }</TableCell>
                            <TableCell align="right">{reservation.peopleCount}</TableCell>
                            <TableCell align="right">{(reservation.table as TableType).number}</TableCell>
                            <TableCell align="right">{reservationMade}</TableCell>
                            </TableRow>
                    )})
                    }
                </TableBody>
              </Table>
            </TableContainer>
            {this.props.reservations.length === 0? "No Reservations Found" : null} 
                <div>{this.state.role === "Manager"? null : 
                    <Link className={classes.NoDecoration} to="/MakeReservation">
                        <IconButton size="small" color="primary" aria-label="make reservation" component="span">                    
                            <AddIcon /> Add
                        </IconButton>
                    </Link>
                    }
                </div>
            </div>
          );
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
        isLoading: state.reservations.isLoading,
        reservations: state.reservations.reservations,
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
        getReservations: () => dispatch(reservationsInit()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);