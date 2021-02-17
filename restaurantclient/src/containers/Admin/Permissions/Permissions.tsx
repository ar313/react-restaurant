import { Button, Chip, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import MaterialTable from "material-table";
import React,{ Component } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import classes from './Permissions.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import { rolesInit, rolesUpdate } from "../../../store/roles/action";
import { Permission, Role } from "../../../store/roles/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

interface ISelectedPermission {
	role: Role,
	permission: Permission
}

interface IState {
	columns: Array<any>;
	selectedPermissions: Array<ISelectedPermission>;
	roles: Array<Role>;
	firstLoad: boolean;
}

interface IProps {
	getRoles: () => any;
	updateRole: (role: Role) => any;
	isLoading: boolean;
	roles: Array<Role>;
	permissions: Array<Permission>;
}

//edit permission Admin Panel
class Permissions extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			columns: [
				{ title: 'Role', field: 'name' },
			],
			selectedPermissions: [],
			roles: this.props.roles,
			firstLoad: true,
		}
	}

	componentDidMount() {
		this.props.getRoles();
	}

	handleChange = (event: React.ChangeEvent<{value: unknown}>, roleId: string) => {
		let permissions = this.props.permissions.map(a => ({...a}));
		let permissionIndex = permissions.findIndex(p => p.name === event.target.value);
		let permission = permissions.splice(permissionIndex, 1);

		var selectedPermissions = [...this.state.selectedPermissions];
		var selectedRoleIndex = selectedPermissions.findIndex(sr => sr.role.id === roleId);
		selectedPermissions[selectedRoleIndex].permission = permission[0];

		this.setState({
			selectedPermissions: selectedPermissions
		});
	}

	handleAddPermission = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, roleId: string) => {
		var selectedPermissions = [...this.state.selectedPermissions];
		var selectedPermissionIndex = selectedPermissions.findIndex(s => s.role.id === roleId);
		var selectedPermission = {...selectedPermissions[selectedPermissionIndex]};

		if (selectedPermission?.permission.name.length === 0) {
			return;
		}

		var roles = [...this.state.roles];
		var roleIndex = roles.findIndex(r => r.id === roleId);
		var permission = roles[roleIndex].permissions.findIndex(p => p.id === selectedPermission?.permission.id);

		if (permission < 0) {
			roles[roleIndex].permissions.push({...selectedPermission.permission});
			selectedPermission.permission.id = '';
			selectedPermission.permission.name = '';
			selectedPermissions[selectedPermissionIndex] = selectedPermission;

			this.setState({
				selectedPermissions: selectedPermissions,
				roles: roles
			})
		}
	}

	handleDeletePermission = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, roleId: string, permissionId: string) => {
		var roles = [...this.state.roles];
		var roleIndex = roles.findIndex( r => r.id === roleId);
		var permissionIndex = roles[roleIndex].permissions.findIndex(p => p.id === permissionId);
		roles[roleIndex].permissions.splice(permissionIndex, 1);
		
		this.setState({
			roles: roles
		})
	}

	handleSavePermissions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, roleId: string) => {
		var roles = [...this.state.roles];
		var roleIndex = roles.findIndex( r => r.id === roleId);
		var role = roles[roleIndex];
		this.props.updateRole(role);
	}

	generateDetails = (rowData: Role) => {

		var selectedPermission = this.state.selectedPermissions.find(r => {
			return r.role.id === rowData.id
		});

		var selectedPermissions = [...this.state.selectedPermissions];

		if (!selectedPermission) {
			selectedPermission = {
				role: rowData,
				permission: {
					id: '',
					name: ''
				}
			}
			selectedPermissions.push(selectedPermission);
			
			this.setState({
				selectedPermissions: selectedPermissions
			})
		}

		var permissions = rowData.permissions.map(p => {
			return (
				<Chip 
					key={p.id}
					onDelete={(event) => this.handleDeletePermission(event, rowData.id, p.id)} 
					className={classes.Chip} 
					color="secondary" 
					variant="default" 
					label={p.name} />
			)
		});

		var allPermissions = this.props.permissions.map(a => ({...a}));;
		var selectablePermissions = this.props.permissions.map(a => ({...a}));;
		
		if (rowData.permissions.length > 0) {
			selectablePermissions = allPermissions.filter((value) => {
				return rowData.permissions.findIndex(p => p.id === value.id) < 0;
			});
		}

		return (
			<div className={classes.Details}>
				<div>
					{permissions}
				</div>
				<div className={classes.Buttons}>
					<FormControl style={{minWidth: 300}}>
						<InputLabel className={classes.InputLabel}>Permission</InputLabel>
						<Select
							className = {classes.Select}
							MenuProps={MenuProps}
							value={selectedPermission.permission.name}
							onChange={(event) => this.handleChange(event, rowData.id)}
						>
							{selectablePermissions.map((p) => (
								<MenuItem key={p.id} value={p.name} >
									{p.name}
								</MenuItem>
								))
							}
						</Select>
					</FormControl>
					<Button
							variant="outlined"
							color="primary"
							className={classes.Button}
							startIcon={<AddCircleIcon />}
							onClick={(event) => this.handleAddPermission(event, rowData.id)}
						>
							Add
					</Button>
					<Button
							variant="outlined"
							color="secondary"
							className={classes.Button}
							startIcon={<SaveIcon />}
							onClick={(event) => this.handleSavePermissions(event, rowData.id)}
						>
							Save
					</Button>
				</div>
			</div>
		)
	}

    render () {

		if (this.props.isLoading) {
			return null
		} else if (this.props.roles.length > 0 && this.state.firstLoad ) {
			this.setState({
				roles: this.props.roles,
				firstLoad: false
			})
		}

		var data = [...this.state.roles];
		data.sort((a, b) => {
			if ( a.name < b.name ){
				return -1;
			  }
			  if ( a.name > b.name ){
				return 1;
			  }
			  return 0;
		});
        return (
            <div className={classes.Container}>
                <MaterialTable
					title="Permissions Panel"
					columns={this.state.columns}
					data={data}
					onRowClick={(event, rowData, togglePanel) => { if(togglePanel) togglePanel() }}
					detailPanel={(rowData: Role) => this.generateDetails(rowData) }
					/>
            </div>
        )
    }
}


const mapStateToProps = (state: RootStateOrAny) => {
    return {
		roles: state.roles.roles,
		permissions: state.roles.permissions,
		isLoading: state.roles.isLoading
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
		getRoles: () => dispatch(rolesInit()),
		updateRole: (role: Role) => dispatch(rolesUpdate(role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);