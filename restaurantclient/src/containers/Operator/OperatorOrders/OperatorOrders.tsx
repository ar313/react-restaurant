import classes from './OperatorOrders.module.css';
import { Button, Card, CardActions, CardContent, Collapse, Divider, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Order } from '../../../store/orders/types';
import { ordersCancel, ordersInit } from '../../../store/orders/action';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import AddOrder from '../../../components/AddOrder/AddOrder';
import { dishInit } from '../../../store/dishes/action';
import axios from 'axios';
import { Cart, Dish } from '../../../store/dishes/types';
import storeProvider from '../../../store/storeProvider';
import { City, Country } from '../../../store/address/types';
import { Alert } from '@material-ui/lab';
import { dishItems } from '../../../store/userOrder/types';

interface IState {
	countries?: Country[];
	cities?: City[];
	cart: Cart[];
	isAdding: boolean;
	selectedDish?: Dish;
	selectedQuantity: number;
	selectedCountry?: Country;
    selectedCity?: City;
	selectedStreet?: string;
	stateError: string;
	status: string;
}

interface IProps {
	getOrders: () => void;
	getDishes: () => void;
	Dishes?: Dish[];
	Orders: Order[];
	cancelOrder: (order: Order) => void;
	
}

class OperatorOrders extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			isAdding: false,
			cart: Array<Cart>(),
			selectedQuantity: 1,
			stateError: '',
			status: ''
		}
	}

	componentDidMount() {
		this.props.getOrders();
		this.props.getDishes();
		this.getAddress();
	}
	
	getAddress = () => {
		axios.get("https://localhost:5000/api/address/variables", {
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => { 
			return this.setState({ 
					countries: response.data.countries,
					cities: response.data.cities,
				})
			}
		)
		.catch(err => {
			return null;
		});
	}
    
    handleCancelOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, order: Order) => {
        this.props.cancelOrder(order);
	}

	handleDeleteItem = (id: string) => {
		var cart = [...this.state.cart];
		var index = cart.findIndex(d => d.Dish.id === id);
		cart.splice(index, 1);

		this.setState({
			cart: cart,
		})
	}

	handleDishChange = (event: React.ChangeEvent<{name?: string | undefined;value: unknown;}>) => {
        var dishes = this.props.Dishes;
        if (!dishes) {
            return;
        }

        var dish = dishes.find(d => d.name === event.target.value)

        if (dish) {
            this.setState({
                selectedDish: dish
            });
        }
    }

    handleQuantityChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        var value = +event.currentTarget.value;

        if (value <= 0) {
            return;
        }

        this.setState({
            selectedQuantity: value
        })
    }
	
	handleCountryChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => {
		var countries = this.state.countries;
        if (!countries) {
            return;
        }

        var country = countries.find(d => d.name === event.target.value)

        if (country) {
            this.setState({
                selectedCountry: country
            });
        }
	}

	handleCityChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => {
		var cities = this.state.cities;
        if (!cities) {
            return;
        }

        var city = cities.find(d => d.name === event.target.value)

        if (city) {
            this.setState({
                selectedCity: city
            });
        }
	}

	handleStreetChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        var value = event.currentTarget.value;

        this.setState({
            selectedStreet: value
        })
    }
	
	handleAddDish = (dish?: Dish, quantity?: number) => {
		if(dish && quantity) {
			var cart = [...this.state.cart];
			var index = cart.findIndex(c => c.Dish.id === dish.id);

			if (index >= 0) {
				cart[index].Quantity = quantity
			} else {
				cart.push({
					Dish: dish,
					Quantity: quantity
				});
			}

			this.setState({
				cart: cart
			});
		}
	}

	renderOrders = (orders: Order[]) => {
		return orders.map(order => {
			var time = new Date (order.orderTime);
			return (
			<Card key={time.getTime()} className={classes.Card}>
				<CardContent>
					<Typography variant="h5" className={classes.title} color="textPrimary" gutterBottom>
						Order: {order.id}
					</Typography>
					<Typography>
						Time Ordered: <span className={classes.SmallFont}>{time.toLocaleString()}</span>
					</Typography>
					<Typography>
						Dishes:
						{order.dishes.map((di, index) => (
						<span key={di.name}> {di.name} x {di.quantity} {order.dishes.length-1 === index ? "." : ","} </span>
					))}
					</Typography>
					<br />
					<Typography variant="body1" className={classes.pos} color="textPrimary">
						Total Price: <span className={classes.SmallFont}>{order.totalPrice}$</span>
					</Typography>
				</CardContent>
                {order.isDelivered || order.isCancelled? null :
                    <CardActions>
                        <Button onClick={event => this.handleCancelOrder(event, order)} size="small" color="secondary">
                            Cancel Order
                        </Button>
                    </CardActions>
                }
			</Card>
		)});		
	}

	switchAdding = () => {
		var adding = this.state.isAdding;
		this.setState({
			isAdding: !adding
		})
	}

	addOrder = () => {
		if (!this.state.selectedStreet || !this.state.selectedCountry || this.state.cart.length === 0)
		{
			this.setState({
				stateError: "Please fill all fields and add items to cart"
			});
			return;
		}

		this.setState({
			stateError: ""
		});

		
		var dishItems = Array<dishItems>();
		this.state.cart.forEach(e => dishItems.push({ name: e.Dish.name, quantity:e.Quantity}) );
		
		var Address = {
			id: '00000000-0000-0000-0000-000000000000',
			name: 'Operator Address',
			street: this.state.selectedStreet,
			country: this.state.selectedCountry,
			city: this.state.selectedCity
		}

		var order = {
			dishes: dishItems,
			isForDelivery: true,
			deliveryAddress: Address,
			paymentType: 'Cash',
		};

		axios.post("https://localhost:5000/order", order ,{
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => { 
			if (response.status === 200) {
				this.setState({
					status: "Succesfully Added",
					selectedQuantity: 1,
					selectedDish: undefined,
					selectedCity: undefined,
					selectedCountry: undefined,
					selectedStreet: '',
					isAdding: false
				})
			}
		}
		)
		.catch(err => {
			return null;
		});
	}

	handleCloseError = () => {
		this.setState({
			stateError: ''
		});
	}

	handleCloseSuccess = () => {
		this.setState({
			status: ''
		});
	}

	render() {
        var activeOrders = this.props.Orders.filter(o => o.isDelivered === false && !o.isCancelled);
        var cancelledOrders = this.props.Orders.filter(o => o.isDelivered === false && o.isCancelled);
		var orders = this.props.Orders.filter(o => o.isDelivered === true);
		
		var activeOrdersRender = this.renderOrders(activeOrders);
        var cancelledOrdersRender = this.renderOrders(cancelledOrders);
		var ordersRender = this.renderOrders(orders);

		var alert = this.state.stateError? (<Alert onClose={this.handleCloseError} severity="error">{this.state.stateError}</Alert>) : null;
		var status = this.state.status? (<Alert onClose={this.handleCloseSuccess} severity="success">{this.state.status}</Alert>) : null;
		var addOrder = <AddOrder
					handleAddOrder={this.addOrder}
					onDeleteItem={this.handleDeleteItem}
					selectedCity={this.state.selectedCity} 
					selectedCountry={this.state.selectedCountry}
					selectedStreet={this.state.selectedStreet}
					handleCityChange={this.handleCityChange}
					handleCountryChange={this.handleCountryChange}
					handleStreetChange={this.handleStreetChange}
					handleDishChange={this.handleDishChange}
					handleQuantityChange={this.handleQuantityChange}
					selectedDish={this.state.selectedDish}
					selectedQuantity={this.state.selectedQuantity}
					AddDish={this.handleAddDish}
					isForDelivery={false} 
					dishes={this.props.Dishes} 
					cities={this.state.cities}
					cart={this.state.cart}
					countries={this.state.countries} />

		return (
			<div className={classes.Container}>
				<Collapse in={this.state.stateError.length>0}>
					{alert}
				</Collapse>
				<Collapse in={this.state.status.length>0}>
					{status}
				</Collapse>
				<Collapse in={this.state.isAdding} style={{ transitionDelay: this.state.isAdding ? '500ms' : '200ms' }}>
					<div>
						{addOrder}
					</div>
				</Collapse >
                <Button
                variant="contained"
				color={!this.state.isAdding? "primary" : "secondary" }
				onClick={this.switchAdding}
                startIcon={!this.state.isAdding? <AddIcon /> : <CancelIcon /> }>
                   {!this.state.isAdding? "Add Order" : "Cancel Adding" }
                </Button>
				<Collapse in={!this.state.isAdding} style={{ transitionDelay: !this.state.isAdding ? '500ms' : '200ms' }}>
					<div className={classes.Orders}>
						<h3>Active Orders</h3>
						{activeOrders.length !== 0? activeOrdersRender : "No Active Orders"}
					</div>
					<Divider />
					<div className={classes.Orders}>
						<h3>Past Orders</h3>
						{orders.length !== 0? ordersRender : "No Past Orders" }
					</div>
					<Divider />
					<div className={classes.Orders}>
						<h3>Cancelled Orders</h3>
						{cancelledOrdersRender.length !== 0? cancelledOrdersRender : "No Cancelled Orders" }
					</div>
				</Collapse>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.orders.isLoading,
		Orders: state.orders.orders,
		Dishes: state.dish.Dishes,
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getDishes: () => dispatch(dishInit()),
        getOrders: () => dispatch(ordersInit()),
        cancelOrder: (order: Order) => dispatch(ordersCancel(order))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorOrders);