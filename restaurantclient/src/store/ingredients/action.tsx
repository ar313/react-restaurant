import { IngredientTypes, Ingredient } from "./types";
import { action } from "typesafe-actions";

export const ingredientStart = () => action(IngredientTypes.INGREDIENT_START);
export const ingredientFail = () => action(IngredientTypes.INGREDIENT_FAIL);
export const ingredientInit = () => action(IngredientTypes.INGREDIENT_INIT);

export const ingredientSuccess = (ingredients: Array<Ingredient>) => {
    return {
        type: IngredientTypes.INGREDIENT_SUCCESS,
		payload: {
			ingredients: ingredients
		}
    }
}

export const ingredientSend = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_SEND,
        payload: {
            ingredient: ingredient
        }
    }
}

export const ingredientAdd = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_ADD,
        payload: {
            ingredient: ingredient
        }
    }
}

export const ingredientDelete = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_DELETE,
        payload: {
            ingredient: ingredient
        }
    }
}

export const ingredientRemove = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_REMOVE,
        payload: {
            ingredient: ingredient
        }
    }
}

export const ingredientUpdate = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_UPDATE,
        payload: {
            ingredient: ingredient
        }
    }
}

export const ingredientUpdated = (ingredient: Ingredient) => {
    return {
        type: IngredientTypes.INGREDIENT_UPDATED,
        payload: {
            ingredient: ingredient
        }
    }
}