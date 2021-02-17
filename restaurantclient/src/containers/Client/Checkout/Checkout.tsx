import { ListItem, ListItemText, ListItemSecondaryAction, 
	IconButton, Box, Button, Divider, List, Paper, FormControl, 
	InputLabel, MenuItem, Select, FormControlLabel, 
	TextField, RadioGroup, Radio, FormLabel, Grid, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { Component, SyntheticEvent } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import AccordionComponent from "../../../components/Accordion/Accordion";

import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import { Cart, Dish } from '../../../store/dishes/types';
import { IDishInfo } from '../Dishes/Dishes';
import { cartAdd, cartRemove } from '../../../store/dishes/action';
import classes from './Checkout.module.css';
import { addressAdd, addressDelete, addressInit, addressUpdate } from '../../../store/address/action';
import { Address, Country, City } from '../../../store/address/types';
import { validateRules } from '../../../shared/ValidationRules';
import { Inputs, ValidationInputs } from './CheckoutInputs';
import FormGenerate from '../../../components/Forms/FormGenerate';
import { userOrderAdd, userOrderClear } from '../../../store/userOrder/action';
import {  Order } from '../../../store/userOrder/types';
import { Redirect } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

interface IProps {
	Cart: Array<Cart>;
	addToCart: (dish: Dish) => any;
	removeFromCart: (dish: Dish) => any;
	getAddresses: () => any;
	addAddress: (address: Address) => any;
	deleteAddress: (address: Address) => any;
	updateAddress: (address: Address) => any;
	addUserOrder: (order: Order) => any;
	clearOrderedStatus: () => any;
	Dishes: Array<IDishInfo>;
	Countries: Country[];
	Addresses: Address[];
	Cities: City[];
	ordered: boolean;
}

interface IState {
	selectedAddress: Address | undefined;
	adding: boolean;
	paymentType: string;
	Inputs: ValidationInputs;
	formIsValid: boolean;
	error: IError;
	redirect: boolean;
}

interface IError {
	open: boolean;
	message: string;
}

class Checkout extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		
		var error = {
			open: false,
			message:''
		}
		if (this.props.Cart.length === 0) {
			error.open = true;
			error.message = "Cart is empty";
		}

		this.state = {
			selectedAddress: undefined,
			adding: false,
			paymentType: "cash",
			Inputs: {...Inputs(this.onBlurCheckValidity)},
			formIsValid: false,
			error: error,
			redirect: false,
		};
	}

	componentDidMount() {
		this.props.getAddresses();
	}

	onBlurCheckValidity = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) : void => {
		event.currentTarget.value = event.currentTarget.value.trim();
		this.checkValidity(	event.currentTarget.value, name);
	}

	checkValidity = (value: string, name: string) => {
		switch (name) {
			case 'firstName': {
					let validated = validateRules( value, name, this.state.Inputs.firstName.rules )
					let firstName = {
						...this.state.Inputs.firstName.FieldProps,
						isValid: validated.isValid,
						errorMessage: validated.errorMessage,
						isTouched: true
					};
					
					let Inputs = { 
						...this.state.Inputs, 
						firstName:{ 
							...this.state.Inputs.firstName, 
							FieldProps: firstName,
							value: value
						} 
					};
			
					this.validateForm(Inputs);
				break;
			}
			case 'lastName': {
				let validated = validateRules(value, name, this.state.Inputs.lastName.rules )
				let lastName = {
					...this.state.Inputs.lastName.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, 
					lastName:{ 
						...this.state.Inputs.lastName, 
						FieldProps: lastName,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'country': {
				let validated = validateRules( value, name, this.state.Inputs.country.rules )
				let country = {
					...this.state.Inputs.country.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, country:{ 
						...this.state.Inputs.country, 
						FieldProps: country,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'city': {
				let validated = validateRules( value, name, this.state.Inputs.city.rules )
				let city = {
					...this.state.Inputs.city.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, city:{ 
						...this.state.Inputs.city, 
						FieldProps: city,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'address': {
				let validated = validateRules( value, name, this.state.Inputs.address.rules )
				let address = {
					...this.state.Inputs.address.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, address:{ 
						...this.state.Inputs.address, 
						FieldProps: address,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'zip': {
				let validated = validateRules( value, name, this.state.Inputs.zip.rules )
				let zip = {
					...this.state.Inputs.zip.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, zip:{ 
						...this.state.Inputs.zip, 
						FieldProps: zip,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'cardNumber': {
				let validated = validateRules( value, name, this.state.Inputs.cardNumber.rules )
				let cardNumber = {
					...this.state.Inputs.cardNumber.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, cardNumber:{ 
						...this.state.Inputs.cardNumber, 
						FieldProps: cardNumber,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'expirationDate': {
				let validated = validateRules( value, name, this.state.Inputs.expDate.rules )
				let expDate = {
					...this.state.Inputs.expDate.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, expDate:{ 
						...this.state.Inputs.expDate, 
						FieldProps: expDate,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
			case 'ccv': {
				let validated = validateRules( value, name, this.state.Inputs.ccv.rules )
				let ccv = {
					...this.state.Inputs.ccv.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, ccv:{ 
						...this.state.Inputs.ccv, 
						FieldProps: ccv,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
				break;
			}
		}
	}

	validateForm(Inputs: ValidationInputs) {
		let formValidity = true;

		Object.entries(Inputs).forEach((input) => {
			if(!input[1].FieldProps.isValid) {
				formValidity = false;
			}
		});

		this.setState({
			Inputs: Inputs,
			formIsValid: formValidity
		});
	
	}

	getDish = (dishId: string) => {
		var dishes = [...this.props.Dishes];

		var dish = dishes.find(dish => dish.id === dishId);

		return dish;

	}

	calculatePrice = (cart: Cart[]) => {
		var total = 0;
		
		cart.forEach(item => {
			total += +item.Dish.price * item.Quantity;
		});

		return total;
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

	handleAddingMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		var adding = this.state.adding;
		this.setState({
			adding: !adding
		})
	}

	handleAddChange = (event: React.ChangeEvent<{value: unknown;}>) => {

	}

	handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		let name = (event.currentTarget.elements[0] as HTMLInputElement).value;
		let country = this.props.Countries.find(c => c.name === (event.currentTarget.elements[1] as HTMLInputElement).value);
		let city = this.props.Cities.find(c => c.name === (event.currentTarget.elements[2] as HTMLInputElement).value);
		let street = (event.currentTarget.elements[3] as HTMLInputElement).value;
		
		if (country && city) {
			
			this.props.addAddress({
				id: '',
				name: name,
				country: country,
				city: city,
				street: street
			});

			this.setState({
				adding: false
			})
		}
		
	}

	handleChooseAddress = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, addressId: string) => {
		var addresses = [...this.props.Addresses];
		var addressIndex = addresses.findIndex(a => a.id === addressId);

		this.setState({
			selectedAddress: addresses[addressIndex]
		})
	}

	handleDeleteAddress = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, addressId: string) => {
		var addresses = [...this.props.Addresses];
		var addressIndex = addresses.findIndex(a => a.id === addressId);

		this.props.deleteAddress(addresses[addressIndex]);
	}

	handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			paymentType: (event.target as HTMLInputElement).value
		});
	}

	handleOrder = (event: SyntheticEvent) => {
		event.preventDefault();

		if (this.props.Cart.length === 0) {
			this.setState({
				error: {
					open: true,
					message: "Cart is empty."
				}
			})
			return;
		}
		
		if (!this.state.selectedAddress) {
			this.setState({
				error: {
					open: true,
					message: "Please choose a delivery address."
				}
			})
			return;
		}

		
		var orderItems = this.props.Cart.map(item =>
			({
				name: item.Dish.name,
				quantity: item.Quantity
			})
		);
		
		var order:Order = {
			dishes: orderItems,
			isForDelivery: true,
			deliveryAddress: this.state.selectedAddress,
			paymentType: this.state.paymentType 
		}
		
		if (this.state.formIsValid && this.state.paymentType === 'credit_card') {
			
			order.billingAddress = {
				firstName: this.state.Inputs.firstName.value.slice(),
				lastName: this.state.Inputs.lastName.value.slice(),
				country: this.state.Inputs.country.value.slice(),
				city: this.state.Inputs.city.value.slice(),
				address: this.state.Inputs.address.value.slice(),
				zip: this.state.Inputs.zip.value.slice()
			};

			order.creditCard = {
				cardNumber: this.state.Inputs.cardNumber.value.slice(),
				expirationDate: this.state.Inputs.expDate.value.slice(),
				ccv: this.state.Inputs.ccv.value.slice()
			};
		}

		this.props.addUserOrder(order);
	}

	closeError = () => {
		this.setState({
			error: {
				open: false,
				message: ''
			}
		})
	}

	componentDidUpdate() {
		if (this.props.ordered) {
			this.redirectPage();
		}
	}

	redirectPage = () => {
		setTimeout(() =>{
			this.setState({ redirect: true });
			this.props.clearOrderedStatus(); 
			}, 3000);
		
	}
	
	render() {

		var adding = this.state.adding? (
			<form className={classes.Add} onSubmit={this.handleAdd}>
				<FormControl className={classes.Form}>
					<TextField name="address" required label="Name" />
					<FormControl className={classes.Form}>
						<InputLabel className={classes.InputLabel}>Country</InputLabel>
						<Select
							className = {classes.Select}
							MenuProps = {MenuProps}
							required
							name = "country"
							>
							{this.props.Countries.map(p => (
								<MenuItem key={p.id} value={p.name} >
									{p.name}
								</MenuItem>
								))
							}
						</Select>
					</FormControl>
					<FormControl className={classes.Form}>
						<InputLabel className={classes.InputLabel}>City</InputLabel>
						<Select
							required
							className={classes.Select}
							MenuProps={MenuProps}
							name = "city"
						>
							{this.props.Cities.map((p) => (
								<MenuItem key={p.id} value={p.name} >
									{p.name}
								</MenuItem>
								))
							}
						</Select>
					</FormControl>
					<FormControl className={classes.Form}>
						<TextField name="street" required label="Street" />
					</FormControl>

					<Button type="submit" color="secondary" startIcon={<AddCircleIcon />}>
						Save
					</Button>
				</FormControl>
			</form>
		) : null;

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

		var addresses = this.props.Addresses.map( address => (
			<div 
				key={address.id} 
				className={classes.Address}
				>
					<Button color="primary" onClick={(event) => this.handleChooseAddress(event, address.id)}>
						Select
					</Button>
					<AccordionComponent
						clickDelete={(event) => this.handleDeleteAddress(event, address.id)} 
						title={address.name}
						classes={this.state.selectedAddress?.id === address.id? classes.Selected: undefined}
						>
						
						<FormControl className={classes.Form}>
							<InputLabel className={classes.InputLabel}>Country</InputLabel>
							<Select
								disabled
								className = {classes.Select}
								MenuProps={MenuProps}
								value={address.country.name}
								onChange={(event) => alert('test')}
							>
								{this.props.Countries.map(p => (
									<MenuItem key={p.id} value={p.name} >
										{p.name}
									</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<FormControl className={classes.Form}>
							<InputLabel className={classes.InputLabel}>City</InputLabel>
							<Select
								disabled
								className={classes.Select}
								MenuProps={MenuProps}
								value={address.city.name}
								onChange={(event) => alert('test')}
							>
								{this.props.Cities.map((p) => (
									<MenuItem key={p.id} value={p.name} >
										{p.name}
									</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<FormControl className={classes.Form}>
							<TextField disabled required id="standard-basic" label="Address" value={address.street} />
						</FormControl>
					</AccordionComponent>
				</div>
			)
		)

		var payment = (
			<FormControl component="fieldset">
				<FormLabel >Payment Type</FormLabel>
			<RadioGroup row aria-label="payment" name="payment" value={this.state.paymentType} onChange={this.handlePaymentChange}>
				<FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
				<FormControlLabel value="cash" control={<Radio />} label="Pay on delivery" />
			</RadioGroup>
			</FormControl>
		)

		let fields = Object.values(this.state.Inputs).map( (field) => {
			return field.FieldProps;
		});

		let error = this.state.error.message.length !== 0 ? (
			<Collapse in={this.state.error.open}>
				<Alert severity="error" onClose={this.closeError}>
					{this.state.error.message}
				</Alert>
			</Collapse>
		) : null;
		
		return (
			<div className={classes.Checkout}>
					{this.props.ordered? 
					<Collapse in={true}>
						<Alert  onClose={this.closeError}>
							Successfully Ordered
						</Alert>
						{this.state.redirect? <Redirect to="/" /> : null}
					</Collapse> : 
					
				<React.Fragment>
					<div>
						{error}
						<h3>Delivery Address</h3>
						{addresses}
						{adding}
						<Button onClick={(event) => this.handleAddingMode(event)} startIcon={<AddCircleIcon />}>
							{this.state.adding? 'Cancel' : 'Add'}
						</Button>
						{this.props.Cart.length !== 0 ? 
						<Box right="10%" top="20%" position="absolute" className={classes.Cart}>
							<Paper className={classes.Paper} color="primary">
								<h3>Cart</h3>
								<List>
									{cartItems}
								</List>
								<Divider />
								<p>
									Total Price:  {price.toFixed(2)}$
								</p>
							</Paper>
						</Box>
						: null
						}
					</div>
					<Divider />
					<div className={classes.Payment}>
						<h3>
							Payment
						</h3>
						{payment}
						{this.state.paymentType !== 'credit_card' ? null : 
							<Grid spacing={2} direction="row" container className={classes.PaymentForm}>
								<FormGenerate Fields={fields} />
							</Grid>
						}
					</div>
					<Divider />
					<p>Total Price: <b>{this.calculatePrice(this.props.Cart).toFixed(2)}$</b></p>
					<div className={classes.Order}>
						<Button onClick={this.handleOrder} 
						disabled={
							this.state.paymentType === 'credit_card'? !this.state.formIsValid : this.state.selectedAddress? false: true } color="primary" variant="contained">
							Order
						</Button>
					</div>
				</React.Fragment>
				}
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.address.isLoading,
		Dishes: state.dish.Dishes,
		Cart: state.dish.Cart,
		Addresses: state.address.addresses,
		Countries: state.address.countries,
		Cities: state.address.cities,
		ordered: state.userOrder.ordered
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getAddresses: () => dispatch(addressInit()),
		addToCart: (dish: Dish) => dispatch(cartAdd(dish)),
		removeFromCart: (dish: Dish) => dispatch(cartRemove(dish)),
		addAddress: (address: Address) => dispatch(addressAdd(address)),
		deleteAddress: (address: Address) => dispatch(addressDelete(address)),
		updateAddress: (address: Address) => dispatch(addressUpdate(address)),
		addUserOrder: (order: Order) => dispatch(userOrderAdd(order)),
		clearOrderedStatus: () => dispatch(userOrderClear()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);