import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, ClickAwayListener } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { ILinkType } from '../../../../shared/LinkGenerator';


interface IProps {
	links: ILinkType[]
}

interface IState {
	drawerIsOpen: boolean
}


class SideBar extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			drawerIsOpen: false
		}
	}

	closeDrawerClickHandler = (): void => {
		this.setState({
			drawerIsOpen: false
		})
	}

	openDrawerClickHandler = (): void => {
		this.setState({
			drawerIsOpen: true
		})
	}

	render () {
		let links = this.props.links.map(link => {
			return (
				<ListItem button key={link.linkName} color="inherit">
					<Link onClick={this.closeDrawerClickHandler} underline="none" color="inherit" component={RouterLink} to={link.linkPath}>
						<Box display="flex" flexDirection="row" alignItems="center">
							<ListItemIcon>{link.icon}</ListItemIcon>
							<ListItemText>{link.linkName}</ListItemText>
						</Box>
					</Link>
				</ListItem>
			)
		})

		return (
			<ClickAwayListener onClickAway={this.closeDrawerClickHandler}>
				<div>
					<IconButton onClick={this.openDrawerClickHandler} edge="start" color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton>
					
					<Drawer variant="persistent" anchor="left" open={this.state.drawerIsOpen}>
							<Box display="flex" flexDirection="row-reverse">
								<IconButton onClick={this.closeDrawerClickHandler}>
										<ChevronLeftIcon />
								</IconButton>
							</Box>

							<Divider />

							<List>
								{links}
							</List>
					</Drawer>
				</div>
			</ClickAwayListener>
		);
	} 
}

export default SideBar;