export enum DishTypes {
	DISH_SUCCESS = "@@dish/DISH_SUCCESS",
	DISH_FAIL = "@@dish/DISH_FAIL",
	DISH_START = "@@dish/DISH_START",
	DISH_INIT = "@@dish/DISH_INIT",
	DISH_CLEAR = "@@dish/DISH_CLEAR",
	DISH_IMAGE_GET = "@@dish/DISH_IMAGE_GET",
	DISH_IMAGE_SUCCESS = "@@dish/DISH_IMAGE_SUCCESS",
	CART_CLEAR = "@@CART/CART_CLEAR",
	CART_ADD = "@@dish/CART_ADD",
	CART_REMOVE = "@@dish/CART_REMOVE"
}

export interface Dish {
	id: string;
	name: string;
	price: string;
	dishImage?: any;
	ingredients: Array<string>;
}

export interface Cart {
	Dish: Dish;
	Quantity: number;
}

export interface DishState {
	isLoading: boolean;
	Dishes: Array<Dish>;
	Cart: Array<Cart>;
}

export interface DishStart {
	type: typeof DishTypes.DISH_START
}

export interface DishSuccess {
	type: typeof DishTypes.DISH_SUCCESS,
	payload: { dishes: Array<Dish> },
}

export interface DishFail {
	type: typeof DishTypes.DISH_FAIL
}

export interface DishInit {
	type: typeof DishTypes.DISH_INIT
}

export interface CartAdd {
	type: typeof DishTypes.CART_ADD,
	payload: {
		dish: Dish
	}
}

export interface CartRemove {
	type: typeof DishTypes.CART_REMOVE,
	payload: {
		dish: Dish
	}
}

export interface CartClear {
	type: typeof DishTypes.CART_CLEAR;
}

export interface DishImageGet {
	type: typeof DishTypes.DISH_IMAGE_GET;
	payload: {
		dish: Dish
	}
}

export interface DishImageSuccess {
	type: typeof DishTypes.DISH_IMAGE_SUCCESS;
	payload: {
		dish: Dish
	}
}

export type DishActionTypes = 
	DishStart 
	| DishSuccess
	| DishFail
	| DishInit
	| CartAdd
	| CartRemove
	| CartClear
	| DishImageSuccess;