import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { Component } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { usersDelete, usersInit, usersUpdate } from "../../../store/users/action";
import { Role, User } from "../../../store/users/types";
import Register from "../../Account/Register/Register";
import classes from './Users.module.css';


interface IProps {
	users: Array<User>;
	roles: Array<Role>;
	getUsers: () => any;
	isLoading: boolean;
	updateUser: (user: User) => any;
	deleteUser: (user: User) => any;
}

interface IState {
	columns: Array<any>;
	firstLoad: boolean;
	isAdding: boolean;
}

class Users extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
		   columns: [],
		   firstLoad: true,
		   isAdding: false
        }
	}

	componentDidMount() {
		this.props.getUsers();
	}

	setRoles = () => {
		if (this.props.roles.length > 0) {
			var roles = this.props.roles.reduce(function(role: any, currentRole: any, i) {
				role[currentRole] = currentRole;
				return role;
				}, {});
			this.setState({ columns: [
				{ title: "Name", field: "name", type: "string", cellStyle: {padding: "20px"}, editable: 'never' },
				{ title: "Email", field: "email", type: "string", cellStyle: {padding: "20px"}, editable: 'never' },
				{ title: "Role", field: "role", type: "string", lookup: roles }
			],
			firstLoad: false
		});
		}
	}

	render () {
		if (this.state.firstLoad) {
			this.setRoles();
		}

		if (this.props.isLoading) {
			return (
				<div className={classes.Spinner}>
					<CircularProgress size={100} />
				</div>
			)
		}

		var addUser = null;
		
		if (this.state.isAdding) {
			addUser = (
				<div className={classes.Add}><h3>Add User</h3>
					<Register canBeRedirected={false}></Register>
				</div>
			)	
		}

        return (
            <div className={classes.Container}>
                //ResetPassword Button
				{addUser}
				<MaterialTable
                title="Users"
                columns={this.state.columns}
                data={this.props.users}
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
						tooltip: 'Add User',
						isFreeAction: true,
						onClick: (event) => this.setState({
							isAdding: !this.state.isAdding
						})
					}, 
					{
						icon: 'autorenew',
						tooltip: 'Reset Password',
						onClick: (event) => alert("test")
					}
				]}
                editable={{
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
							this.props.updateUser(newData);
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
						var users = [...this.props.users];
                    	let user = users.splice(users.indexOf(oldData), 1);
                    	this.props.deleteUser(user[0]);
                        resolve();
					}),
                }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		users: state.users.users,
		roles: state.users.roles,
		isLoading: state.users.isLoading
	}
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getUsers: () => dispatch(usersInit()),
		deleteUser: (user: User) => dispatch(usersDelete(user)),
		updateUser: (user: User) => dispatch(usersUpdate(user)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);