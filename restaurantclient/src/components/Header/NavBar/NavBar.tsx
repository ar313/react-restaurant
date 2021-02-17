import React, { Component } from 'react';
import { Toolbar, Hidden } from '@material-ui/core';
import SideBar from './SideBar/SideBar';
import TopBar from './TopBar/TopBar';
import { ILinkType } from '../../../shared/LinkGenerator';

interface IProps {
	links: ILinkType[]
}

class NavBar extends Component<IProps> {

	render () {
		return (
			<Toolbar>
				<Hidden smUp>
					<SideBar links={this.props.links}></SideBar>
				</Hidden>
				
				<Hidden xsDown>
					<TopBar links={this.props.links}></TopBar>
				</Hidden>
			</Toolbar>
		);
	}
}

export default NavBar;