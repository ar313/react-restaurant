import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import classes from './Dish.module.css';

interface IProps {
	id: string
	imageTitle: string;
	imageLink?: string;
	dishName: string;
	dishDescription: string;
	dishPrice: string;
	onAddClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, dishId: string) => any;
}

const styles = 
{

	media: {
	height: 200,
	width: '100%',
	}
};

class Dish extends Component<IProps> {

	render () {
		var imageHref = this.props.imageLink ? this.props.imageLink : "no image";
		
		return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
				className={classes.media}
				style={{height: 200, width:"100%", objectFit: "scale-down"}}
				image={imageHref}
				title={this.props.imageTitle}
				/>
				<CardContent className={classes.Content}>
				<Typography gutterBottom variant="h5" component="h2">
					{this.props.dishName}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{this.props.dishDescription}
				</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button onClick={(event) => this.props.onAddClick(event, this.props.id)} size="small" color="primary">
					Add To cart
				</Button>
				<div className={classes.Wrapper}>
					<div className={classes.Price}>
						Price: {this.props.dishPrice}$
					</div>
				</div>
			</CardActions>
		</Card>
		);
	}

}

export default Dish;