import React, { Component } from 'react';
import { Grid, CircularProgress, Fab, TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DishComponent from '../../../components/Dish/Dish';
import { RootStateOrAny, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import classes from './DishesDashboard.module.css';
import { dishInit } from '../../../store/dishes/action';
import {  Dish } from '../../../store/dishes/types';
import MaterialTable from 'material-table';
import AddDish from './AddDish/AddDish';

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
}

interface IState {
	shoppingCart: Array<IDishInfo>;
    totalPrice: number;
    columns: Array<any>;
	isAdding: boolean;
}

class DishesDashboard extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			shoppingCart: Array<IDishInfo>(),
            totalPrice: 0,
            columns: [
                { title: "Id", field: "id", type: "string", cellStyle: {padding: "20px"}, editable: 'never' },
                { title: "Name", field: "name", type: "numeric", cellStyle: {padding: "20px"}},
                { title: "Price", field: "price", type: "numeric", cellStyle: {padding: "20px"}},
                ],
			isAdding: false,
		}
	}

	componentDidMount() {
		this.props.getDishes();
	}

	getDish = (dishId: string) => {
		var dishes = [...this.props.Dishes];

		var dish = dishes.find(dish => dish.id === dishId);

		return dish;

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
						onAddClick={(event) => event.preventDefault()} 
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

		return (
			<div className={classes.Container}>
				<AddDish></AddDish>
                <MaterialTable
                title="Dishes"
                columns={this.state.columns}
                data={this.props.Dishes}
                options={{
                    headerStyle: {
                        padding: '20px'
                    },
                    rowStyle: {
                        padding: '5px'
                    }
				}}
				actions={[
					{
						icon: 'add',
						tooltip: 'Add Employee',
						isFreeAction: true,
						onClick: (event) =>{ 
                            this.setState({
							isAdding: !this.state.isAdding
                        })
                        }
					}, 
				]}
                editable={{
                    onRowUpdate: (newData: Dish) =>
                        new Promise((resolve) => {
							//this.props.updateEmployee(newData);
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
						var Dishes = [...this.props.Dishes];
                    	let dish = Dishes.splice(Dishes.indexOf(oldData), 1);
                    	//this.props.deleteEmployee(employee[0]);
                        resolve();
					}),
                }}
                />
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.dish.isLoading,
		Dishes: state.dish.Dishes,
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getDishes: () => dispatch(dishInit()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(DishesDashboard);