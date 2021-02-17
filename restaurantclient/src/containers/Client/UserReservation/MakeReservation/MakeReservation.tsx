import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React, { Component } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Button, Collapse, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import classes from './MakeReservation.module.css';
import { ThunkDispatch } from 'redux-thunk';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { tablesInit } from '../../../../store/tables/action';
import { Table } from '../../../../store/tables/types';
import { Reservation } from '../../../../store/reservations/types';
import { reservationsAdd, reservationsAddedClear } from '../../../../store/reservations/action';
import { Redirect } from 'react-router-dom';

const OPENING_HOUR = 8;
const CLOSING_HOUR = 22;

interface IProps {
    getFreeTables: (reservationTime: Date) => void;
    isLoading: boolean;
    tables: Array<Table>;
    addReservation: (reservation: Reservation) => void;
    added: boolean;
    clearAddedStatus: () => void;
}

interface IState {
    selectedDate?: Date;
    error: string;
    peopleCount: number;
    selectedTable: string;
    redirect: boolean;
}

class MakeReservation extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            error: '',
            peopleCount: 1,
            selectedTable: '',
            redirect: false,
        }
    }

    handleDateChange = (date: MaterialUiPickersDate) => {
        var newDate = date? date : new Date();

        if (newDate.getHours() < OPENING_HOUR || newDate.getHours() >= CLOSING_HOUR) {
            this.setState({
                error: "Outside Working Hours"
            })
            return;
        }

        this.props.getFreeTables(newDate);

        this.setState({
            selectedDate: newDate,
            error: ''
        })
    }

    handleTableChange = (event: any) => {
        var selectedValue = event.target.value;
        this.setState({
           selectedTable: selectedValue
        });
    }

    handlePeopleChange = (event: any) => {
        if (event.target.value <= 0) {
            return;
        } else {
            this.setState({
                peopleCount: event.target.value
            })
        }
    }

    makeReservation = (event: any) => {

        var newDate = this.state.selectedDate? this.state.selectedDate : null;

        if (this.state.peopleCount <= 0  || newDate === null  || this.state.selectedTable.length === 0) {
            this.setState({
                error: "You need to fill in everything"
            });
            return;
        }
        
        event.preventDefault();

        this.props.addReservation({
            peopleCount: this.state.peopleCount,
            reservationTime: newDate,
            table: this.state.selectedTable
        });
    }

    componentDidUpdate() {
        if (this.props.added) {
            this.initializeRedirect();
		}
    }

    initializeRedirect = () => {
        setTimeout(() =>{
            this.setState({ redirect: true });
            this.props.clearAddedStatus(); 
            }, 3000);
    }

	render() {

		return (
            this.props.added?
            <div className={classes.Container}>
                <Collapse in={true}>
                    <Alert>
                        Successfully Added
                    </Alert>
                    {this.state.redirect? <Redirect to="/Reservations" /> : null}
                </Collapse> 
            </div>: 

            <div className={classes.Container}>
            <Grid spacing={2} container direction={"column"} justify="center" alignItems="center">
                <FormControl className={classes.Date + " " + classes.Form}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Reservation Date"
                            disablePast
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    {this.state.error.length !== 0? 
                        <Alert severity="error">{this.state.error}</Alert> :
                        null 
                    }
                </FormControl>
                <FormControl className={classes.Form}>
                    <TextField 
                        value={this.state.peopleCount} 
                        onChange={this.handlePeopleChange} 
                        label="How many people?" 
                        required 
                        type="number" />
                </FormControl>
                <FormControl className={classes.Form}>
                <InputLabel id="select-tables">Choose Table #</InputLabel>
                    <Select
                        labelId="select-tables"
                        className={classes.Select}
                        value={this.state.selectedTable}
                        onChange={(event) => this.handleTableChange(event)}
                    >
                    {this.props.tables.map((table) => (
                        <MenuItem key={table.number} value={table.number} >
                           Table #{table.number}
                        </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.ButtonControl}>
                <Button onClick={this.makeReservation} variant="contained" color="primary">Make Reservation</Button>
            </FormControl>
            </Grid>
        </div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
        isLoading: state.tables.isLoading,
        tables: state.tables.tables,
        added: state.reservations.added
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
        getFreeTables: (reservationTime: Date) => dispatch(tablesInit(reservationTime)),
        addReservation: (reservation: Reservation) => dispatch(reservationsAdd(reservation)),
        clearAddedStatus: () => dispatch(reservationsAddedClear())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeReservation);