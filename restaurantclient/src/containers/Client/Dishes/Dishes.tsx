import React, { Component } from 'react';
import { Grid, CircularProgress, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Paper, Button, Divider } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DishComponent from '../../../components/Dish/Dish';
import { RootStateOrAny, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import classes from './Dishes.module.css';
import { cartAdd, cartRemove, dishInit } from '../../../store/dishes/action';
import { Cart, Dish } from '../../../store/dishes/types';
import { Link } from 'react-router-dom';

export interface IDishInfo {
	id: string;
	name: string;
	ingredients: Array<string>;
	price: string;
	dishImage: string;
}

interface IProps {
	isLoading: boolean;
	getDishes: () => void;
	Dishes: Array<IDishInfo>;
	Cart: Array<Cart>;
	addToCart: (dish: Dish) => any;
	removeFromCart: (dish: Dish) => any;

}

interface IState {
	shoppingCart: Array<IDishInfo>;
	totalPrice: number;
}

class Dishes extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			shoppingCart: Array<IDishInfo>(),
			totalPrice: 0
		}
	}

	componentDidMount() {
		document.title = "Dishes";
		this.props.getDishes();
	}

	calculatePrice = (cart: Cart[]) => {
		var total = 0;
		
		cart.forEach(item => {
			total += +item.Dish.price * item.Quantity;
		});

		return total;
	}

	getDish = (dishId: string) => {
		var dishes = [...this.props.Dishes];

		var dish = dishes.find(dish => dish.id === dishId);

		return dish;

	}

	addToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, dishId: string) => {
		var dish = this.getDish(dishId);

		if (dish !== undefined) {
			this.props.addToCart(dish);
		}
	}

	removeFromCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, dishId: string) => {
		var dish = this.getDish(dishId);

		if (dish !== undefined) {
			this.props.removeFromCart(dish);
		}
	}
	
	render() {
		var dishes = this.props.Dishes.map(dish => {
			return (
				<Grid key={dish.id} container item sm={4} >
					<DishComponent
						id={dish.id}
						dishName={dish.name} 
						dishDescription={"Ingredients: " + dish.ingredients.join(', ')}
						imageLink={dish.dishImage}
						imageTitle={dish.name}
						dishPrice={dish.price}
						onAddClick={event => this.addToCart(event, dish.id)} 
					></DishComponent>
				</Grid>
			)
		});

		if (this.props.isLoading) {
			return ( 
				<div className={classes.Spinner}>
					<CircularProgress size={100} />
				</div>
			)
		}

		var price = this.calculatePrice(this.props.Cart);
		var cartItems = this.props.Cart.map((cartItem) => {
			var cost = (+cartItem.Dish.price*cartItem.Quantity).toFixed(2) +"$";
			return (
				<ListItem key={cartItem.Dish.id} style={{paddingRight: 96}}>
					<ListItemText
						primary={cartItem.Dish.name + "  x" + cartItem.Quantity + " = " + cost}
					/>
					<ListItemSecondaryAction>
						<IconButton onClick={(event) => this.addToCart(event, cartItem.Dish.id)} edge="end" aria-label="add">
							<AddIcon />
						</IconButton>
						<IconButton onClick={(event) => this.removeFromCart(event, cartItem.Dish.id)} edge="end" aria-label="delete">
							{cartItem.Quantity>1?<RemoveIcon /> : <DeleteIcon/>}
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			)
		})

		return (
			<div>
				{this.props.Cart.length !== 0 ? 
				<Box right="10%" top="20%" position="absolute" className={classes.Cart}>
					<Paper className={classes.Paper} color="primary">
						<h3>Cart</h3>
						<List>
							{cartItems}
						</List>
						<Divider />
						<p>
							{price.toFixed(2)}$
						</p>
						<Link className={classes.NoDecoration} to="/Checkout" >
							<Button variant="contained" color="primary">		
								Go To Checkout
							</Button>
						</Link>
					</Paper>
				</Box>
				: null
				}
				<div className={classes.Container}>
					<Grid
						className={classes.Dishes}
						container
						direction="row"
						alignItems="center"
					>
						{dishes}
					</Grid>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.dish.isLoading,
		Dishes: state.dish.Dishes,
		Cart: state.dish.Cart
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getDishes: () => dispatch(dishInit()),
		addToCart: (dish: Dish) => dispatch(cartAdd(dish)),
		removeFromCart: (dish: Dish) => dispatch(cartRemove(dish))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Dishes);