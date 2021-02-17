import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import axios from 'axios';
import storeProvider from '../../store/storeProvider';
import { Address, City, Country } from '../../store/address/types';
import classes from './RestaurantDetails.module.css';

interface IProps {

}

interface Details {
	id: string;
	openingHour: number;
	closingHour: number;
	details: string;
	address: Address;
}

interface IState {
	restaurantDetails?: Details;
	countries?: Country[],
	cities?: City[],
	isLoading: boolean
}

class RestaurantDetails extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		this.getDetails();
	}

	getDetails = () => {
		axios.get("https://localhost:5000/api/details", {
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => { 
			if (response.data.restaurantDetails.address === null ){
				var address: Address; 
				address = {
					id: '00000000-0000-0000-0000-000000000000',
					name: 'RestaurantDetails',
					country: response.data.countries[0],
					city: response.data.cities[0],
					street: ''
				}
				response.data.restaurantDetails.address = address;
			}
			return this.setState({ 
					restaurantDetails: response.data.restaurantDetails,
					countries: response.data.countries,
					cities: response.data.cities,
					isLoading: false
				})
			}
		)
		.catch(err => {
			console.log(err);
			return null;
		});
	}

	updateDetails = () => {
		axios.put("https://localhost:5000/api/details/" + this.state.restaurantDetails?.id, this.state.restaurantDetails ,{
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => this.setState({ 
			restaurantDetails: response.data.restaurantDetails,
			isLoading: false
		}))
		.catch(err => {
			console.log(err);
			return null;
		});
	}

	handleNumberChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		var details = Object.assign({}, this.state.restaurantDetails);
		var value = +event.currentTarget.value;
		switch(event.currentTarget.name) {
			case 'OpeningHour' : {
				if (value < 24 && value >= 0 ) {
					details.openingHour = value;
				}				
				break;
			}
			case 'ClosingHour': {
				if (value < 24 && value >= 0 ) { 
					details.closingHour = value;
				}
				break;
			}
		}

		this.setState({
			restaurantDetails: details
		})
	}

	handleSelectChange = (event: React.ChangeEvent<{
		name?: string | undefined;
		value: unknown;
	}>) => {
		var value = event.currentTarget.value;
		var details = Object.assign({}, this.state.restaurantDetails);

		switch(event.currentTarget.name) {
			case 'City' : {
				var city = this.state.cities?.find(c => c.name === value);
				if (city)
					details.address.city = city;
				break;
			}
			case 'Country': {
				var country = this.state.countries?.find(c => c.name === value);
				if (country)
					details.address.country = country;
				break;
			}
		}
		this.setState({
			restaurantDetails: details
		})
	}

	handleStringChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		var value = event.currentTarget.value;
		var details = Object.assign({}, this.state.restaurantDetails);

		switch(event.currentTarget.name) {
			case 'Details' : {
				details.details = value;			
				break;
			}
			case 'Street': {
				details.address.street = value;
				break;
			}
		}
		this.setState({
			restaurantDetails: details
		})
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading</div>;
		}

		return (
            <div className={classes.Container}>
				<h3>Restaurant Details</h3>
				<Grid spacing={2} direction="column" alignContent="center" container>
					<FormControl className={classes.Form}>
						<TextField name="OpeningHour" onChange={event => this.handleNumberChange(event)} value={this.state.restaurantDetails?.openingHour} type="number" label="Opening Hour" />
					</FormControl>

					<FormControl className={classes.Form}>
						<TextField name="ClosingHour" onChange={event => this.handleNumberChange(event)} value={this.state.restaurantDetails?.closingHour} type="number" label="Closing Hour"/>
					</FormControl>

					<FormControl className={classes.Form}>
						<TextField name="Details" onChange={event => this.handleStringChange(event)} value={this.state.restaurantDetails?.details} label="Details" />
					</FormControl>

					<FormControl className={classes.Form}>
							<InputLabel className={classes.InputLabel}>Country</InputLabel>
							<Select
								className={classes.Select}
								required
								name = "Country"
								value={this.state.restaurantDetails?.address?.country.name}
								>
								{this.state.countries?.map(p => (
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
							className = {classes.Select}
							required
							name="City"
							value={this.state.restaurantDetails?.address?.city.name}
							onChange={event => this.handleSelectChange(event)}
							>
							{this.state.cities?.map(p => (
								<MenuItem key={p.id} value={p.name} >
									{p.name}
								</MenuItem>
								))
							}
						</Select>
					</FormControl>
					<FormControl className={classes.Form}>
						<TextField name="Street" onChange={event => this.handleStringChange(event)} value={this.state.restaurantDetails?.address?.street} label="Street" />
					</FormControl>
					<FormControl>
						<Button color="secondary" onClick={this.updateDetails}>Save</Button>
					</FormControl>
				</Grid>
            </div>
		)
	}
}

export default RestaurantDetails;