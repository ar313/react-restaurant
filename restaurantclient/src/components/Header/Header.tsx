import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import { RootStateOrAny, connect } from 'react-redux';
import { ILinkType } from '../../shared/LinkGenerator';


interface IState {
	links: ILinkType[]
}

interface IProps {
	isAuthenticated: boolean;
	token: string;
	links: Array<ILinkType>;
}

class Header extends Component<IProps> {

	render () {
		var links = [...this.props.links].filter(link => {
			return link.navbar ? link : false;
		});

		return (
			<div>
				<AppBar position="static">
					<NavBar links={links} />
				</AppBar>
			</div>
		);
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token
	}
};

export default connect(mapStateToProps)(Header);