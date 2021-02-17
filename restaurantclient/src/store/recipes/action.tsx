import { action } from "typesafe-actions";
import { Recipe, RecipeTypes } from "./types";

export const recipeStart = () => action(RecipeTypes.RECIPE_START);
export const recipeFail = () => action(RecipeTypes.RECIPE_FAIL);
export const recipeInit = () => action(RecipeTypes.RECIPE_INIT);

export const recipeUpdate = (recipe: Recipe) => {
    return {
        type: RecipeTypes.RECIPE_UPDATE,
        payload: {
            recipe: recipe
        }
    }
}

export const recipeAdd = (recipeName: string) => {
    return {
        type: RecipeTypes.RECIPE_ADD,
        payload: {
            name: recipeName
        }
    }
}

export const recipeDelete = (recipe: Recipe) => {
    return {
        type: RecipeTypes.RECIPE_DELETE,
        payload: {
            recipe: recipe
        }
    }
}

export const recipeSuccess = (recipes: Recipe[]) => {
    return {
        type: RecipeTypes.RECIPE_SUCCESS,
        payload: {
            recipes: recipes
        }
    }
}

