import React, { Component } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootStateOrAny, connect } from "react-redux";
import { AnyAction } from "redux";

import classes from "./Ingredients.module.css"
import MaterialTable from "material-table";
import { Ingredient } from "../../../store/ingredients/types";
import { ingredientInit, ingredientSend, ingredientDelete, ingredientUpdate } from "../../../store/ingredients/action";
import { CircularProgress } from "@material-ui/core";

interface IState {
    columns: Array<any>;
    data: Array<any>;
}

interface IProps {
    ingredients: Array<Ingredient>;
    getIngredients: () => any;
    isLoading: boolean;
    sendIngredient: (ingredient: Ingredient) => any;
    deleteIngredient: (ingredient: Ingredient) => any;
    updateIngredient: (ingredient: Ingredient) => any;
}

class Ingredients extends Component<IProps, IState> {

    constructor(props: IProps){
        super(props);

        this.state = {
            columns: [
                { title: "Ingredient", field: "name", type: "string", cellStyle: {padding: "20px"} },
                { title: "Quantity", field: "quantity", type: "numeric" },
                { title: "Price per item", field: "price", type: "numeric" },
                { title: "Expiration Date", field: "expirationDate", type: "datetime" },
            ],
            data: this.props.ingredients
        }
    }

    componentDidMount() {
        this.props.getIngredients();
    }

    render () {

        var ingredients = [...this.props.ingredients];
        
        var page;
        if (this.props.isLoading) {
			page = ( 
				<div className={classes.Spinner}>
					<CircularProgress size={100} />
				</div>
			);
		} else {
            page = (
                <MaterialTable
                title="Ingredients"
                columns={this.state.columns}
                data={this.props.ingredients}
                options={{
                    headerStyle: {
                        padding: '20px'
                    },
                    rowStyle: {
                        padding: '5px'
                    }
                }}
                editable={{
                    onRowAdd: (newData) => 
                        new Promise((resolve) => {
                            this.props.sendIngredient(newData);
                            resolve();
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            this.props.updateIngredient(newData);
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        let ingredient = ingredients.splice(ingredients.indexOf(oldData), 1);
                        this.props.deleteIngredient(ingredient[0]);
                        resolve();
                    }),
                }}
                />
            )
        }

        return (
            <div className={classes.DataTable}>
                {page}
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.ingredient.isLoading,
		ingredients: state.ingredient.ingredients
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
        getIngredients: () => dispatch(ingredientInit()),
        sendIngredient: (ingredient: Ingredient) => dispatch(ingredientSend(ingredient)),
        deleteIngredient: (ingredient: Ingredient) => dispatch(ingredientDelete(ingredient)),
        updateIngredient: (ingredient: Ingredient) => dispatch(ingredientUpdate(ingredient))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);