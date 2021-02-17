import { Button, Card, CardActions, CardContent, CircularProgress, Input, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { deliveriesComplete, deliveriesInit, deliveriesTake } from '../../store/deliveries/action';
import { Delivery } from '../../store/deliveries/types';
import classes from './Deliveries.module.css';

interface IProps {
	isLoading: boolean;
	deliveries: Array<Delivery>;
	getDeliveries: () => void;
	takeDelivery: (delivery: Delivery) => void;
	completeDelivery: (delivery: Delivery) => void;
}

interface IState {
	paidPrice?: number;
	priceError?: string;
}

class Deliveries extends Component<IProps, IState> {
	
	constructor(props: IProps) {
		super(props);

		this.state = {
			paidPrice: undefined,
			priceError: undefined
		};
	}

	componentDidMount() {
		this.props.getDeliveries();
	}

	takeOrderHandler = (delivery: Delivery) => {
		this.props.takeDelivery(delivery);
	}

	deliveredHandler = (delivery: Delivery) => {
		var paidPrice = this.state.paidPrice? this.state.paidPrice: 0;
		
		if (paidPrice < +delivery.totalPrice) {
			this.setState({
				priceError: "Price is lower than the total price."
			});
			return;
		} 

		delivery.paidPrice = paidPrice
		this.props.completeDelivery(delivery);
	}

	handlePriceChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, price: number) => {
		if (+event.currentTarget.value < price ) {
			this.setState({
				priceError: "Price is lower than the total price."
			});
		} else {
			this.setState({
				paidPrice: +event.currentTarget.value,
				priceError: undefined
			})
		}
	}

	renderDeliveries = (deliveries: Array<Delivery>) => {
			return deliveries.map(delivery => {
				var time = new Date (delivery.orderTime);
				return (
				<Card key={delivery.id} className={classes.Card}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							<b>Order &#8470;: {delivery.orderId}</b>
						</Typography>
						<Typography>
							Time Ordered: <span className={classes.SmallFont}>{time.toLocaleString()}</span>
						</Typography>
						<Typography>
							Address:
							<span className={classes.SmallFont}> 
								{" " + delivery.deliveryAddress.country.name}, {delivery.deliveryAddress.city.name}, {delivery.deliveryAddress.street}
							</span>
						</Typography>
						<Typography>
							Expect Payment: 
							<span className={classes.SmallFont}> {delivery.isPaid?"No": "Yes"}</span>
						</Typography>
						
						<Typography>
							Dishes:
							{delivery.orderItems.map((di, index) => (
							<span key={di.name}> {di.name} x {di.quantity}{delivery.orderItems.length-1 === index ? "." : ","} </span>
						))}
						</Typography>
						<br />
						<Typography variant="body1" className={classes.pos} color="textPrimary">
							Total Price: <span className={classes.SmallFont}><b>{delivery.totalPrice}$</b></span>
						</Typography>
					</CardContent>
					{delivery.isDelivered? null : 
					<CardActions>
						{delivery.isPaid || !delivery.deliveryPersonId? null : 
							<TextField
							error={this.state.priceError !== undefined? true: false}
							helperText={this.state.priceError !== undefined? this.state.priceError: ""}
							className={classes.Input}
							required
							id="price"
							label="Paid Sum"
							type="number"
							placeholder="Enter Sum Paid"
							onBlur={event => this.handlePriceChange(event, delivery.totalPrice)} 
							/>
						}
						{ delivery.deliveryPersonId && !delivery.isCancelled?
							<Button onClick={event => this.deliveredHandler(delivery)}>Delivered</Button>
						: <Button onClick={event => this.takeOrderHandler(delivery)} variant="contained" color="primary" >Take Delivery</Button>}
					</CardActions>
					}
				</Card>
			)});		
	}

	render() {

		if (this.props.isLoading) {
			return ( 
				<div className={classes.Spinner}>
					<CircularProgress size={100} />
				</div>
			)
		}

		var activeDeliveries = this.props.deliveries.filter(de => !de.isDelivered && !de.isCancelled && de.deliveryPersonId !== null);
		var pastDeliveries = this.props.deliveries.filter(de => de.isDelivered && !de.isCancelled);
		var awaitingDeliveries = this.props.deliveries.filter(de => !de.isDelivered && !de.isCancelled && de.deliveryPersonId === null);

		var renderedActiveDeliveries = this.renderDeliveries(activeDeliveries);
		var renderedPastDeliveries = this.renderDeliveries(pastDeliveries);
		var renderedAwaitingDeliveries = this.renderDeliveries(awaitingDeliveries);

		return (
			<div className={classes.Container}>
				<div className={classes.Deliveries}>
					<h3>
						Active Orders For Delivey
					</h3>
					{activeDeliveries.length !== 0 ? renderedActiveDeliveries : "No Active Deliveries"}
				</div>

				<div className={classes.Deliveries}>
					<h3>
						Awaiting Deliveries
					</h3>
					{awaitingDeliveries.length !== 0 ? renderedAwaitingDeliveries : "No New Orders"}
				</div>

				<div className={classes.Deliveries}>
					<h3>
						Past Deliveries
					</h3>
					{pastDeliveries.length !== 0 ? renderedPastDeliveries : "No Past Deliveries"}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.deliveries.isLoading,
		deliveries: state.deliveries.deliveries
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getDeliveries: () => dispatch(deliveriesInit()),
		takeDelivery: (delivery: Delivery) => dispatch(deliveriesTake(delivery)),
		completeDelivery: (delivery: Delivery) => dispatch(deliveriesComplete(delivery))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);