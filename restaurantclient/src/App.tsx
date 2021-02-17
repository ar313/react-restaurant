import React from 'react';
import { Switch, Route } from "react-router-dom"
import Layout from './hoc/Layout/Layout';
import './App.css';
import { connect, RootStateOrAny } from 'react-redux';
import JwtDecode from 'jwt-decode';
import { roleRoutes } from './shared/LinkGenerator';

interface IProps {
	isAuthenticated: boolean;
	token: string;
}

function App(props: IProps) {
	var Links = null;
	
	Links = RoleBasedRender(props);

	return (
		<div>
			{Links}
		</div>
	)
}

function RoleBasedRender(props: IProps) {

	var role = '';
	if (props.token) {
		var decoded: any = JwtDecode(props.token);
		role = decoded.role;
	}

	var links = null;

	switch(role) {
		case 'Admin': 
		case 'Finance':
		case 'Manager':
		case 'Kitchen': 
		case 'Waiter':
		case 'Operator' :
		case 'Delivery': 
		case 'Client': {
			let index = roleRoutes.findIndex(r => r.role === role);

			let roleLink = roleRoutes[index].links;
			if (roleLink) {	
				links = roleLink.map(link => {
					return (
						<Route exact={link.navbar? true: false } key={link.linkName} path={link.linkPath}>
							<Layout links={roleLink}>
								{link.component}
							</Layout>
						</Route>
					)
				});
			}
			break;
		}
		default: {
			let roleLink = roleRoutes[0].links
			links = roleLink.map(link => { 
				return (
					<Route key={link.linkName} path={link.linkPath}>
						<Layout links={roleLink}>
							{link.component}
						</Layout>
					</Route>
				)
			});
			break;
		}
	}

	return (
		<React.Fragment>
			<Switch>
				{links}
			</Switch>
		</React.Fragment>
	)
	
}


const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token
	}
};

export default connect(mapStateToProps)(App);
