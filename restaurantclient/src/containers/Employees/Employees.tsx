import { Button, Card, CardActions, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import MaterialTable from 'material-table';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { employeesAdd, employeesDelete, employeesInit, employeesUpdate } from '../../store/employees/action';
import { AddEmployee, Employee } from '../../store/employees/types';
import { usersInit } from '../../store/users/action';
import { User } from '../../store/users/types';
import classes from './Employees.module.css';

interface IProps {
    employees: Array<Employee>;
    users: Array<User>;
    getEmployees: () => void;
    getUsers: () => void;
    updateEmployee: (employee: Employee) => any;
    deleteEmployee: (employee: Employee) => any;
    addEmployee: (employee: AddEmployee) => void;
}

interface IState {
    columns: Array<any>;
    isAdding: boolean;
    salaryError?: string;
    selectedUser?: string;
    selectedSalary?: number;
}

class Employees extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = { 
            columns: [
            { title: "Name", field: "user.userName", type: "string", cellStyle: {padding: "20px"}, editable: 'never' },
            { title: "Email", field: "user.email", type: "string", cellStyle: {padding: "20px"}, editable: 'never' },
            { title: "Phone", field: "user.phoneNumber", type: "numeric", cellStyle: {padding: "20px"}},
            { title: "Salary", field: "salary", type: "numeric", cellStyle: {padding: "20px"}},
            ],
            isAdding: false
        }
    }

    componentDidMount() {
        this.props.getEmployees();
        this.props.getUsers();
    }

    handleSalaryChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        var salary = event.currentTarget.value;

        this.setState({
            selectedSalary: +salary
        })
    }

    handleSalary = () => {
        var salary = this.state.selectedSalary? this.state.selectedSalary: '';
        
        if (salary.toString().length == 0) {
            this.setState({
                salaryError: "Please Type Value"
            })
        } else if (salary<=0) {
            this.setState({
                salaryError: "Value must be above 0"
            })
        } else {
            this.setState({
                salaryError: undefined
            })
        }
    }

    handleUserSelect = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown;}>, child: React.ReactNode) => {
        var user = (event.target.value as string);
        if (user) {
            this.setState({
                selectedUser: user
            });
        }
    }

    handleAddEmployee = () => {
        if (this.state.selectedSalary !== undefined && this.state.selectedUser !== undefined) {
            this.props.addEmployee({
                salary: this.state.selectedSalary,
                userId: this.state.selectedUser
            })
        }
    }

    cancelAdding = () => {
        this.setState({
            isAdding: false
        });
    }

	render() {
        return (
            <div className={classes.Container}>
                {this.state.isAdding? 
                <Card className={classes.Card}>
                    <h3>Add Employee</h3>
                    <TextField
                    error={this.state.salaryError !== undefined? true: false}
                    helperText={this.state.salaryError !== undefined? this.state.salaryError: ""}
                    value={this.state.selectedSalary? this.state.selectedSalary : ''}
                    className={classes.Input}
                    required
                    id="salary"
                    label="Salary"
                    type="number"
                    placeholder="Enter Employee Salary"
                    onChange={event => this.handleSalaryChange(event)} 
                    onBlur={this.handleSalary}
                    />
                    <FormControl className={classes.Form}>
						<InputLabel className={classes.InputLabel}>User:</InputLabel>
						<Select
							className={classes.Select}
							required
                            name = "user"
                            value={this.state.selectedUser? this.state.selectedUser : ''}
                            onChange={(event,child) => this.handleUserSelect(event,child)}
							>
							{this.props.users.map(u =>  (this.props.employees.findIndex(e => e.user.id === u?.id) < 0? 
								<MenuItem key={u.id} value={u.id} >
									{u.role + ": "+ u.name  }
								</MenuItem>
                                : null
                                ))
							}
						</Select>
					</FormControl>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<AddIcon  />}
                            onClick={this.handleAddEmployee}
                        >Add</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<CancelIcon  />}
                            onClick={this.cancelAdding}
                        >Cancel</Button>
                    </CardActions>
                </Card>
                : null}

				<MaterialTable
                title="Employees"
                columns={this.state.columns}
                data={this.props.employees}
                options={{
                    headerStyle: {
                        padding: '20px'
                    },
                    rowStyle: {
                        padding: '5px'
                    }
				}}
				actions={[
					{
						icon: 'add',
						tooltip: 'Add Employee',
						isFreeAction: true,
						onClick: (event) =>{ 
                            this.setState({
							isAdding: !this.state.isAdding
                        })
                        }
					}, 
				]}
                editable={{
                    onRowUpdate: (newData: Employee) =>
                        new Promise((resolve) => {
							this.props.updateEmployee(newData);
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
						var employees = [...this.props.employees];
                    	let employee = employees.splice(employees.indexOf(oldData), 1);
                    	this.props.deleteEmployee(employee[0]);
                        resolve();
					}),
                }}
                />
            </div>
        )
	}
}

const MapStateToProps = (state: RootStateOrAny) => {
    return {
        isLoading: state.employees.isLoading,
        employees: state.employees.employees,
        users: state.users.users
    }
}

const MapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getEmployees: () => dispatch(employeesInit()),
        getUsers: () => dispatch(usersInit()),
        updateEmployee: (employee: Employee) => dispatch(employeesUpdate(employee)),
        deleteEmployee: (employee: Employee) => dispatch(employeesDelete(employee)),
        addEmployee: (employee: AddEmployee) => dispatch(employeesAdd(employee)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Employees);