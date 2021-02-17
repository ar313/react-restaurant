import { Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { Component } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Ingredient } from "../../../store/ingredients/types";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import classes from "./Recipes.module.css"
import AccordionComponent from "../../../components/Accordion/Accordion";
import { recipeAdd, recipeDelete, recipeInit, recipeUpdate } from "../../../store/recipes/action";
import { ingredientInit } from "../../../store/ingredients/action";
import { Recipe } from "../../../store/recipes/types";

interface IProps {
   ingredients: Array<Ingredient>;
   recipes: Recipe[];
   isLoading: boolean;
   getRecipes: () => any;
   getIngredients: () => any;
   updateRecipe: (recipe: Recipe) => any;
   deleteRecipe: (recipe: Recipe) => any;
   addRecipe: (name: string) => any;
}

interface RecipeType {
    id: string,
    name: string,
    selectedIngredient: String;
    Ingredients: Ingredient[];
    selectedQuantity: string;
    selectableIngredients: Ingredient[];
}

interface IState {
    recipes: RecipeType[];
    AddingMode: boolean;
    firstLoad: boolean;
    openDialog: boolean;
    recipeToDeleteId: string; 
    newRecipe: string;
}

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

class Recipes extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            recipes: [],
            AddingMode: false,
            firstLoad: true,
            openDialog: false,
            recipeToDeleteId: "",
            newRecipe: ""
        }
        this.props.getRecipes();
        this.props.getIngredients();
    }

    comparerTakeUnique = (element1: Array<Ingredient>, element2: Array<Ingredient>  ) : Array<Ingredient> => {
        var result = [...element2];
        var indices = Array<number>();
        
        for (let i = 0; i < element1.length; i++) {
            
            let index = element2.findIndex(el => el.id === element1[i].id)
            
            if (index >= 0) {
                indices.push(index);
            }
        }

        indices.sort();

        for (let i = indices.length-1; i >= 0; i-- ) {
            result.splice(indices[i], 1);
        }

        return result;
    }

    initializeChoice = () => {
        var recipes = Array<RecipeType>();

        if(this.props.recipes.length === 0 || this.props.ingredients.length === 0) {
            return;
        }

        this.props.recipes.forEach(element => {
            var selectableIngredients = this.comparerTakeUnique(element.ingredients, this.props.ingredients);
            recipes.push({
                id: element.id,
                name: element.name,
                Ingredients: element.ingredients,
                selectedIngredient: '',
                selectedQuantity: '',
                selectableIngredients: selectableIngredients
            })
        });

        this.setState({
            recipes: recipes,
            firstLoad: false
        });
        
    }

    getRecipe = (recipeId: string) => {
        let recipes = [...this.state.recipes];
        let recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
        let recipe = recipes.splice(recipeIndex, 1);
        
        return {recipe: recipe[0], index: recipeIndex};
    }

    setRecipe = (recipe: any) => {
        let recipes = [...this.state.recipes];
        recipes[recipe.index] = recipe.recipe;

        return recipes;
    }

    handleChange = (event: React.ChangeEvent<{value: unknown}>, recipeId: string) => {
        let name = event.target.value as string;
        let recipe = this.getRecipe(recipeId);

        var selectableIngredients = this.comparerTakeUnique(recipe.recipe.Ingredients, this.props.ingredients);
        recipe.recipe.selectableIngredients = selectableIngredients;

        recipe.recipe.selectedIngredient = name;

        let recipes = this.setRecipe(recipe);
        this.setState({
            recipes: recipes
        })
    }

    handleQuantityChange = (event: React.ChangeEvent<{value: unknown}>, recipeId: string) => {
        let quantity = event.target.value as string;
        let recipe = this.getRecipe(recipeId);
        
        if (Number.parseInt(quantity) <= 0) {
            quantity = '1'
        }

        recipe.recipe.selectedQuantity = quantity;

        let recipes = this.setRecipe(recipe);

        this.setState({
            recipes: recipes
        })
    }

    handleDelete = (IngredientToDelete: Ingredient, recipeId: string) => () => {
        let recipe = this.getRecipe(recipeId);
        var selectableIngredients = [...recipe.recipe.selectableIngredients];
        selectableIngredients.push(IngredientToDelete);
        
        let localIngredients = [...recipe.recipe.Ingredients];
        let index = localIngredients.findIndex(el => el.name === IngredientToDelete.name)
        localIngredients.splice(index, 1);
        recipe.recipe.selectableIngredients = selectableIngredients;
        recipe.recipe.Ingredients = localIngredients;
        

        let recipes = this.setRecipe(recipe);

        this.setState({
            recipes: recipes
        })
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: string) => {
        let recipe = this.getRecipe(recipeId);
        let selectableIngredients = [...recipe.recipe.selectableIngredients];
        let localIngredients = [...this.props.ingredients];

        let index = localIngredients.findIndex(el => el.name === recipe.recipe.selectedIngredient)
        let ingredient = localIngredients.splice(index, 1);
        let selectableIndex = selectableIngredients.findIndex(el => el.name === recipe.recipe.selectedIngredient);
        selectableIngredients.splice(selectableIndex, 1);

        if (ingredient) {
            if (recipe.recipe.selectedQuantity.length === 0 
                || recipe.recipe.selectedIngredient.length === 0){
                return;
            }
            ingredient[0].quantity = +recipe.recipe.selectedQuantity;
            let ings = [...recipe.recipe.Ingredients]
            ings.push(ingredient[0]);

            recipe.recipe.selectedQuantity = '';
            recipe.recipe.selectedIngredient = '';
            recipe.recipe.Ingredients = ings;
            recipe.recipe.selectableIngredients = selectableIngredients;

            let recipes = this.setRecipe(recipe);
            this.setState({
                recipes: recipes
            })
        }
    }

    handleRecipeSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: string) => {
        let recipe = this.getRecipe(recipeId);


        this.props.updateRecipe({
            id: recipe.recipe.id,
            name: recipe.recipe.name,
            ingredients: recipe.recipe.Ingredients
        })
    }

    handleRecipeDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let recipe = this.getRecipe(this.state.recipeToDeleteId);

        var recipes = [...this.state.recipes];

        recipes.splice(recipe.index, 1);

        this.props.deleteRecipe({
            id: recipe.recipe.id,
            name: recipe.recipe.name,
            ingredients: recipe.recipe.Ingredients
        });

        this.setState({
            openDialog: false,
            recipeToDeleteId: "",
            recipes: recipes
        })
    }

    handleNewRecipeChange = (event: React.ChangeEvent<{value: string}>) => {
        let recipeName = event.currentTarget.value;

        this.setState({
            newRecipe: recipeName
        })       
    }

    handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
        this.props.addRecipe(this.state.newRecipe);

        this.setState ({
            newRecipe: '',
            firstLoad: true,
            recipes: []
        })
    }

    handleAddingMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
        var adding = this.state.AddingMode;
        this.setState( {
            AddingMode: !adding
        })
    }

    handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            openDialog: false,
        })
    }

    handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: string) => {
        this.setState({
            openDialog: true,
            recipeToDeleteId: recipeId
        })
    }

    GenerateRecipe = () => {
        return this.state.recipes.map((recipe) => {
            return (
                <AccordionComponent key={recipe.id} 
                    clickSave={(event) => this.handleRecipeSave(event, recipe.id)} 
                    clickDelete={(event) => this.handleOpenDialog(event, recipe.id)} 
                    title={recipe.name}>
                    <div className={classes.Container}>
                        <FormControl style={{minWidth: 120}}>
                            <InputLabel className={classes.InputLabel}>Ingredient</InputLabel>
                            <Select
                                className = {classes.Select}
                                value={recipe.selectedIngredient}
                                MenuProps={MenuProps}
                                onChange={(event) => this.handleChange(event, recipe.id)}
                            >
                                {recipe.selectableIngredients.map((ing) => (
                                    <MenuItem key={ing.id} value={ing.name} >
                                        {ing.name}
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl style={{minWidth: 100, maxWidth: 280 }}>
                            <InputLabel>Quantity</InputLabel>
                            <Input value={recipe.selectedQuantity} onChange={(event) => this.handleQuantityChange(event, recipe.id)} type="number" /> 
                            
                        </FormControl>
                        <FormControl style={{maxWidth: 120, paddingLeft: 10 , paddingTop: 10}}>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AddCircleIcon />}
                                    onClick={(event) => this.handleClick(event, recipe.id)}
                                >
                                    Add
                            </Button>
                        </FormControl>
                        <FormControl style={{paddingLeft: 33, paddingTop: 18}} className={ recipe.Ingredients.length !== 0 ? classes.FormControl : ""}>
                            <div>
                                <label className={classes.RecipeLabel}>Ingredients:</label>
                            </div>
                            <div className={classes.Chips}>
                                {recipe.Ingredients.map((ing) => (
                                <Chip
                                    color="secondary"
                                    variant="outlined"
                                    onDelete={this.handleDelete(ing, recipe.id)}
                                    key={ing.id} 
                                    label={ing.name + " (" + ing.quantity +")"} 
                                    className={classes.Chip} />
                                ))}
                            </div>
                        </FormControl>
                    </div>
                </AccordionComponent>
            )
        })
    }

    GenerateAddRecipe = () => {
        return (
            <div className={classes.AddMenu}>
                <FormControl style={{minWidth: 120}}>
                <InputLabel className={classes.InputLabel}>Recipe Name</InputLabel>
                <Input
                    value={this.state.newRecipe}
                    onChange={this.handleNewRecipeChange}
                    className={classes.Select}
                />
            </FormControl>
            <FormControl style={{maxWidth: 120, paddingLeft: 10 , paddingTop: 10}}>
                <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                        onClick={this.handleAdd}
                    >
                        Save
                </Button>
            </FormControl>
        </div>
        )
    }

    shouldComponentUpdate(props: IProps, state: IState) {
        if (props.recipes !== this.props.recipes
            || props.recipes !== this.props.recipes 
            || props !== this.props 
            || state !== this.state ) {
            if (this.state.firstLoad && this.props.recipes.length > 0) {
                this.initializeChoice();
            }
            return true;
        }
        return false;
    }

    render () {

        if (this.props.isLoading) {
            return ( <div className={classes.Spinner}>
                        <CircularProgress size={100} />
                    </div>
            );
        }

        let recipes = null;

        recipes = this.GenerateRecipe();

        let addRecipe = null;
        if (this.state.AddingMode) {
            addRecipe = this.GenerateAddRecipe();
        }

        return (
            <div className={classes.Recipe}>
                <h3>Recipes</h3>
                {recipes}
                {addRecipe}
                <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You are about to delete this recipe. Are you sure?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(event) => this.handleRecipeDelete(event)} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Button onClick={this.handleAddingMode} startIcon={<AddCircleIcon />}>
                    Add
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state: RootStateOrAny) => {
    return {
        recipes: state.recipe.recipes,
        ingredients: state.ingredient.ingredients,
        isLoading: state.recipe.isLoading
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getRecipes: () => dispatch(recipeInit()),
        getIngredients: () => dispatch(ingredientInit()),
        updateRecipe: (recipe: Recipe) => dispatch(recipeUpdate(recipe)),
        deleteRecipe: (recipe: Recipe) => dispatch(recipeDelete(recipe)),
        addRecipe: (name: string) => dispatch(recipeAdd(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);