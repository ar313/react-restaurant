import { Button, Card, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { City, Country } from '../../store/address/types';
import { Cart, Dish } from '../../store/dishes/types';
import classes from './AddOrder.module.css';
import AddIcon from '@material-ui/icons/Add';

interface IProps {
    countries?: Country[];
    cities?: City[];
    dishes?: Dish[];
    cart?: Cart[];
    isForDelivery: boolean;
    selectedDish?: Dish;
    selectedQuantity: number;
    selectedCountry?: Country;
    selectedCity?: City;
    selectedStreet?: string;
    AddDish: (dish?: Dish, quantity?: number) => void;
    handleAddOrder: () => void;
    onDeleteItem: (id: string) => void;
    handleDishChange: (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void;
    handleQuantityChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleCountryChange: (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void;
    handleCityChange: (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void;
    handleStreetChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

interface IState {

}

class AddOrder extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedQuantity: 1,
            selectedDish: undefined
        };
    }

	render() {
        var total = 0;
		return (
			<div className={classes.AddOrder}>
                <h3>Add Order</h3>
                <Card className={classes.Card}>
                    <Grid direction="column" >
                        <FormControl className={classes.Form}>
                            <InputLabel className={classes.InputLabel}>Dishes</InputLabel>
                            <Select
                                className={classes.Select}
                                required
                                name="Dishes"
                                value={this.props?.selectedDish?.name}
                                onChange={event => this.props.handleDishChange(event)}
                                >
                                {this.props.dishes?.map(p => (
                                    <MenuItem key={p.id} value={p.name} >
                                        {p.name}
                                    </MenuItem>
                                    ))
                                }
                            </Select>                          
                            <TextField 
                                onChange={(event) => this.props.handleQuantityChange(event)}
                                value={this.props?.selectedQuantity} 
                                type="number" 
                                label="Quantity"
                                className={classes.Input} /> 
                            <Button 
                                onClick={event => this.props.AddDish(this.props.selectedDish, this.props.selectedQuantity)} 
                                className={classes.Button} 
                                color="primary" 
                                startIcon={<AddIcon />} >
                                    Add Dish
                            </Button>
                        </FormControl>
                        <FormControl className={classes.FormTwo}>
                            <Card className={classes.InnerCard}>
                                <h4>Cart</h4>
                                {this.props.cart?.map(c => {
                                    total += (+c.Dish.price * c.Quantity);
                                    return (<Chip
                                        key={c.Dish.id}
                                        className={classes.Chip}
                                        label={c.Dish.name + " x" + c.Quantity}
                                        color="secondary" 
                                        onDelete={event => this.props.onDeleteItem(c.Dish.id)}/>
                                    )
                                })}
                            </Card>
                        </FormControl>
                        <Divider />
                        <h5>Delivery Address</h5>
                        <FormControl className={classes.Form}>
                            <InputLabel className={classes.InputLabel}>Country</InputLabel>
                            <Select
                                className={classes.Select}
                                required
                                name="Country"
                                value={this.props.selectedCountry}
                                onChange={(event) => this.props.handleCountryChange(event)}
                                >
                                {this.props.countries?.map(p => (
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
                                value={this.props.selectedCity}
                                onChange={(event) => this.props.handleCityChange(event)}
                                >
                                {this.props.cities?.map(p => (
                                    <MenuItem key={p.id} value={p.name} >
                                        {p.name}
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            <TextField
                                value={this.props.selectedStreet}
                                onChange={event => this.props.handleStreetChange(event)}
                                label="Street" 
                             />
                        </FormControl>
                        <div>
                        <p><b>Total Price: {total}$</b></p>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.Button}
                            onClick={this.props.handleAddOrder}
                            startIcon={<AddIcon />}>
                                Add Order
                        </Button>
                        </div>
                    </Grid>
                </Card>
			</div>
		)
	}
}

export default AddOrder;