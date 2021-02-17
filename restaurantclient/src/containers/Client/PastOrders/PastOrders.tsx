import classes from './PastOrders.module.css';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { userOrderGet } from '../../../store/userOrder/action';
import { PastOrder } from '../../../store/userOrder/types';

interface IState {

}

interface IProps {
	getOrders: () => void;
	pastOrders: PastOrder[];
}

class PastOrders extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
	}

	componentDidMount() {
		this.props.getOrders();
	}

	renderOrders = (orders: PastOrder[]) => {
		return orders.map(pastOrder => {
			var time = new Date (pastOrder.orderTime);
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
						{pastOrder.dishes.map((di, index) => (
						<span key={di.name}> {di.name} x {di.quantity}{pastOrder.dishes.length-1 === index ? "." : ","} </span>
					))}
					</Typography>
					<br />
					<Typography variant="body1" className={classes.pos} color="textPrimary">
						Total Price: <span className={classes.SmallFont}>{pastOrder.totalPrice}$</span>
					</Typography>
				</CardContent>
			</Card>
		)});		
	}

	render() {
		var activeOrders = this.props.pastOrders.filter(po => po.isDelivered === false);
		var pastOrders = this.props.pastOrders.filter(po => po.isDelivered === true);
		
		var activeOrdersRender = this.renderOrders(activeOrders);

		var pastOrdersRender = this.renderOrders(pastOrders);

		return (
			<div className={classes.Container}>
				<div className={classes.Orders}>
					<h3>Active Orders</h3>
					{activeOrders.length !== 0? activeOrdersRender : "No Active Orders"}
				</div>
				<Divider />
				<div className={classes.Orders}>
					<h3>Past Orders</h3>
					{pastOrders.length !== 0? pastOrdersRender : "No Past Orders" }
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.dish.isLoading,
		pastOrders: state.userOrder.pastOrders
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getOrders: () => dispatch(userOrderGet()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);