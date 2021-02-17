export enum IngredientTypes {
	INGREDIENT_SUCCESS = "@@ingredient/INGREDIENT_SUCCESS",
	INGREDIENT_FAIL = "@@ingredient/INGREDIENT_FAIL",
	INGREDIENT_START = "@@ingredient/INGREDIENT_START",
	INGREDIENT_INIT = "@@ingredient/INGREDIENT_INIT",
	INGREDIENT_REGISTERED = "@@ingredient/INGREDIENT_REGISTERED",
    INGREDIENT_CLEAR = "@@ingredient/INGREDIENT_CLEAR",
    INGREDIENT_ADD = "@@ingredient/INGREDIENT_ADD",
    INGREDIENT_SEND = "@@ingredient/INGREDIENT_SEND",
    INGREDIENT_DELETE = "@@ingredient/INGREDIENT_DELETE",
    INGREDIENT_REMOVE = "@@ingredient/INGREDIENT_REMOVE",
    INGREDIENT_UPDATE = "@@ingredient/INGREDIENT_UPDATE",
    INGREDIENT_UPDATED = "@@ingredient/INGREDIENT_UPDATED"
}

export interface Ingredient {
    id?: string;
    name: string;
    quantity: number;
    price: number;
    expirationDate: string;
}

export interface IngredientState {
    ingredients: Array<Ingredient>;
    isLoading: boolean;
}

export interface IngredientStart {
    type: typeof IngredientTypes.INGREDIENT_START;
}

export interface IngredientSuccess {
    type: typeof IngredientTypes.INGREDIENT_SUCCESS;
    payload: {
        ingredients: Array<Ingredient>
    };
}

export interface IngredientInit {
    type: typeof IngredientTypes.INGREDIENT_INIT;
}

export interface IngredientFail {
    type: typeof IngredientTypes.INGREDIENT_FAIL;
}

export interface IngredientAdd {
    type: typeof IngredientTypes.INGREDIENT_ADD;
    payload: {
        ingredient: Ingredient
    }
}

export interface IngredientDelete {
    type: typeof IngredientTypes.INGREDIENT_DELETE;
    payload: {
        ingredient: Ingredient
    }
}

export interface IngredientRemove {
    type: typeof IngredientTypes.INGREDIENT_REMOVE;
    payload: {
        ingredient: Ingredient
    }
}

export interface IngredientSend {
    type: typeof IngredientTypes.INGREDIENT_SEND;
    payload: {
        ingredient: Ingredient
    }
}

export interface IngredientUpdate {
    type: typeof IngredientTypes.INGREDIENT_UPDATE;
    payload: {
        ingredient: Ingredient
    }
}

export interface IngredientUpdated {
    type: typeof IngredientTypes.INGREDIENT_UPDATED;
    payload: {
        ingredient: Ingredient
    }
}

export type IngredientActionTypes = 
	IngredientStart 
	| IngredientSuccess
	| IngredientFail
    | IngredientInit
    | IngredientAdd
    | IngredientRemove
    | IngredientUpdated;