import { IngredientState, IngredientActionTypes, IngredientTypes } from "./types";
import { Reducer } from "redux";

const initialState: IngredientState = {
    ingredients: [],
    isLoading: false
}

const reducer: Reducer<IngredientState> = (state = initialState, action: IngredientActionTypes ) => {
    
    switch(action.type) {
        case IngredientTypes.INGREDIENT_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case IngredientTypes.INGREDIENT_SUCCESS: {
            let newIngredients = action.payload.ingredients;
            
            return {
                ...state,
                isLoading: false,
                ingredients: newIngredients
            }
        }
        case IngredientTypes.INGREDIENT_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        // case IngredientTypes.INGREDIENT_ADD: {
        //     let newIngredients = [...state.ingredients]
        //     newIngredients.push(action.payload.ingredient);
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         ingredients: newIngredients,
        //         isLoading: false,
        //     }
        // }
        // case IngredientTypes.INGREDIENT_REMOVE: {
        //     let newIngredients = [...state.ingredients];
        //     let index = newIngredients.findIndex(el => el.id === action.payload.ingredient.id);

        //     newIngredients.splice(index, 1);

        //     return {
        //         ...state,
        //         ingredients: newIngredients,
        //         isLoading: false,
        //     }
        // }
        // case IngredientTypes.INGREDIENT_UPDATED: {
        //     let newIngredients = [...state.ingredients]
        //     let index = newIngredients.findIndex(el => el.id === action.payload.ingredient.id);
        //     newIngredients[index] = action.payload.ingredient;

        //     return {
        //         ...state,
        //         ingredients: newIngredients,
        //         isLoading: false
        //     }
        // }
        default:
            return state;
    }
}

export { reducer as IngredientReducer };