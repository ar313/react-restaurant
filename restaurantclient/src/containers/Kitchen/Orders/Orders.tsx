import classes from './Orders.module.css';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Order } from '../../../store/orders/types';
import { ordersInit } from '../../../store/orders/action';

interface IState {

}

interface IProps {
	getOrders: () => void;
	Orders: Order[];
}

class Orders extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
	}

	componentDidMount() {
		this.props.getOrders();
	}

	renderOrders = (orders: Order[]) => {
		return orders.map(order => {
			var time = new Date (order.orderTime);
			return (
			<Card key={time.getTime()} className={classes.Card}>
				<CardContent>
					<Typography variant="h5" className={classes.title} color="textPrimary" gutterBottom>
						Order
					</Typography>
					<Typography>
						Time Ordered: <span className={classes.SmallFont}>{time.toLocaleString()}</span>
					</Typography>
					<Typography>
						Dishes:
						{order.dishes.map((di, index) => (
						<span key={di.name}> {di.name} x {di.quantity} {order.dishes.length-1 === index ? "." : ","} </span>
						//  Ingredients: {di.dish.ingredients.map((ing) => (<i>{ing}</i>)) } 
					))}
					</Typography>
					<br />
					<Typography variant="body1" className={classes.pos} color="textPrimary">
						Total Price: <span className={classes.SmallFont}>{order.totalPrice}$</span>
					</Typography>
				</CardContent>
			</Card>
		)});		
	}

	render() {
		var activeOrders = this.props.Orders.filter(o => o.isDelivered === false);
		var orders = this.props.Orders.filter(o => o.isDelivered === true);
		
		var activeOrdersRender = this.renderOrders(activeOrders);

		var ordersRender = this.renderOrders(orders);

		return (
			<div className={classes.Container}>
				<div className={classes.Orders}>
					<h3>Active Orders</h3>
					{activeOrders.length !== 0? activeOrdersRender : "No Active Orders"}
				</div>
				<Divider />
				<div className={classes.Orders}>
					<h3>Past Orders</h3>
					{orders.length !== 0? ordersRender : "No Past Orders" }
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.orders.isLoading,
		Orders: state.orders.orders
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getOrders: () => dispatch(ordersInit()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);