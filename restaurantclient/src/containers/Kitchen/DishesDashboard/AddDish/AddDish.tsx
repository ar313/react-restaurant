import classes from './AddDish.module.css';
import { Button, Checkbox, Fab, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Recipe } from '../../../../store/recipes/types';
import { connect, RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { recipeInit } from '../../../../store/recipes/action';
import axios from 'axios';
import storeProvider from '../../../../store/storeProvider';

interface IProps {
	recipes: Array<Recipe>;
	getRecipes: () => void;
}

interface IState {
	filesrc: string;
	file: any;
	newDishRecipes: Array<Recipe>;
}

class AddDish extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = {
			filesrc: '',
			newDishRecipes: Array<Recipe>(),
			file: null
		}
	}

	componentDidMount() {
		this.props.getRecipes();
	}

	handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.currentTarget.files !== null && event.currentTarget.files.length > 0){
			this.setState({
				filesrc: URL.createObjectURL(event.currentTarget.files[0]),
				file: event.currentTarget.files[0],
			})
		} else {
			this.setState({
				filesrc: ''
			})
		}
	}

	handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		var recipes = [...this.state.newDishRecipes];
		if (checked) {
			var recipe = this.props.recipes.find(r => r.name === event.currentTarget.name);
			if (recipe !== undefined && recipes.findIndex(r => r.name === recipe?.name) < 0) {
				recipes.push(recipe);
			}
		} else {
			var index = recipes.findIndex(r => r.name === event.currentTarget.name);

			if (index >= 0) {
				recipes.splice(index, 1);
			}
		}

		this.setState({
			newDishRecipes: recipes
		})
	}

	handleAddDish = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		var dish = event.currentTarget.dish.value;
		var price = event.currentTarget.price.value;
		var description = event.currentTarget.description.value;

		var data = {
			dish: dish,
			price: price,
			description: description,
			recipes: this.state.newDishRecipes
		}

		this.uploadFile(data);
	}

	addDish = (data: any) => {

		axios.post("https://localhost:5000/api/dishes", data ,{
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
			  }
		} )
		.then(response => {
			
		})
		.catch(err => {
			console.log(err);
			return null;
		});
	}

	uploadFile = (data: any) => {
		const formData = new FormData();
		formData.append('files', this.state.file);
		console.log(formData);
		axios.post("https://localhost:5000/api/dishes/image/add", formData ,{
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token,
				'Content-Type': 'multipart/form-data'
			  }
		} )
		.then(response => {
			data.file = response.data.image;
			this.addDish(data);
		})
		.catch(err => {
			console.log(err);
			return null;
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleAddDish}>
					<Grid direction="column" alignItems="center" alignContent="center">
						<FormControl className={classes.Form}>
							<div>
								<h5>Dish Image: </h5>
								<img className={classes.Image} src={this.state.filesrc}></img>
							</div>
							<label htmlFor="upload-photo">
							<input
								style={{ display: 'none' }}
								id="upload-photo"
								name="upload-photo"
								type="file"
								onChange={(event) => this.handleImageChange(event)}
							/>
							<Fab
								color="secondary"
								size="small"
								component="span"
								aria-label="add"
								variant="extended"
							>
								<AddIcon /> Upload photo
							</Fab>
							</label>
							<br />
							<br />
						</FormControl>
						<FormControl className={classes.Form}>
							<TextField
								name="dish"
								label="Dish Name"
								required
							/>
						</FormControl>
						<FormControl className={classes.Form}>
							<TextField
								name="price"
								type="number"
								label="Price"
								required
							/>
						</FormControl>
						<FormControl className={classes.Form}>
							<TextField
								name="description"
								multiline
								label="Description"
								required
							/>
						</FormControl>
						<FormControl className={classes.Form}>
							<FormLabel component="legend">Choose Recipes: </FormLabel>
							<FormGroup>
								{this.props.recipes?.map(recipe => {
									return (
										<FormControlLabel key={recipe.id}
										control={<Checkbox onChange={this.handleCheckbox} name={recipe.name} />}
										label={recipe.name}
										/>
									)
								})}
							</FormGroup>
						</FormControl>
					</Grid>
					<Button type="submit">Add</Button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.dish.isLoading,
		recipes: state.recipe.recipes,
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		getRecipes: () => dispatch(recipeInit()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDish);