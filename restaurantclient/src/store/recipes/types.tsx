import { Ingredient } from "../ingredients/types";

export enum RecipeTypes {
    RECIPE_SUCCESS = "@@recipe/RECIPE_SUCCESS",
    RECIPE_START = "@@recipe/RECIPE_START",
    RECIPE_INIT = "@@recipe/RECIPE_INIT",
    RECIPE_FAIL = "@@recipe/RECIPE_FAIL",
    RECIPE_ADD = "@@recipe/RECIPE_ADD",
    RECIPE_UPDATE = "@@recipe/RECIPE_UPDATE",
    RECIPE_DELETE = "@@recipe/RECIPE_DELETE",
}

export interface Recipe {
    id: string;
    name: string;
    ingredients: Array<Ingredient>;
}


export interface RecipeState {
    isLoading: boolean;
    recipes: Array<Recipe>;
}

export interface RecipeStart {
    type: typeof RecipeTypes.RECIPE_START
}

export interface RecipeSuccess {
    type: typeof RecipeTypes.RECIPE_SUCCESS
    payload: {
        recipes: Array<Recipe>
    }
}

export interface RecipeUpdate {
    type: typeof RecipeTypes.RECIPE_UPDATE
    payload: {
        recipe: Recipe
    }
}

export interface RecipeAdd {
    type: typeof RecipeTypes.RECIPE_ADD
    payload: {
        name: string
    }
}

export interface RecipeDelete {
    type: typeof RecipeTypes.RECIPE_DELETE
    payload: {
        recipe: Recipe
    }
}

export interface RecipeFail {
    type: typeof RecipeTypes.RECIPE_FAIL
}

export type RecipeActionTypes = 
    RecipeStart
    | RecipeSuccess
    | RecipeFail;