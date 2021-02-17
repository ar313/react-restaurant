import { Reducer } from "redux";
import { Recipe, RecipeActionTypes, RecipeState, RecipeTypes } from "./types";


export const initialState: RecipeState = {
    isLoading: false,
    recipes: Array<Recipe>()
}

const reducer: Reducer<RecipeState> = (state = initialState, action: RecipeActionTypes ) => {
    
    switch (action.type) {
        case RecipeTypes.RECIPE_START:  {
            return {
                ...state,
                isLoading: true
            }
        }
        case RecipeTypes.RECIPE_SUCCESS: {
            return {
                ...state,
                recipes: action.payload.recipes,
                isLoading: false
            }
        }
        case RecipeTypes.RECIPE_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        } 
        default: {
            return state;
        }
    }
}


export { reducer as RecipeReducer };