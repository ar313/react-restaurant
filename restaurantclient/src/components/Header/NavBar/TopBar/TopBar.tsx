import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link,  Box } from '@material-ui/core';
import { ILinkType } from '../../../../shared/LinkGenerator';

interface IProps {
	links: ILinkType[]
}

interface IState {
}

class TopBar extends Component<IProps, IState> {
	
	render () {
		let links = this.props.links.map(link => {
			return (
				<Button key={link.linkName} color="inherit">
					<Link underline="none" color="inherit" component={RouterLink} to={link.linkPath}>
						<Box display="flex" flexDirection="row" alignItems="center">
							{link.icon}
							{link.linkName}
						</Box>
					</Link>
				</Button>
			)
		});

		return (
			<Grid
			container
			direction="row"
			justify="flex-end"
			alignItems="center"
			>
				{links}
			</Grid>
		);
	}
}

export default TopBar;