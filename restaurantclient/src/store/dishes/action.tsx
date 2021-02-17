import { DishTypes, Dish } from "./types";
import { action } from "typesafe-actions";

export const dishStart = () => action(DishTypes.DISH_START);
export const dishFail = () => action(DishTypes.DISH_FAIL);
export const dishInit = () => action(DishTypes.DISH_INIT);
export const cartClear = () => action(DishTypes.CART_CLEAR);

export const dishImageGet = (dish: Dish) => {
	return {
		type: DishTypes.DISH_IMAGE_GET,
		payload: {
			dish: dish
		}
	}
}

export const dishImageSuccess = (dish: Dish) => {
	return {
		type: DishTypes.DISH_IMAGE_SUCCESS,
		payload: {
			dish: dish
		}
	}
}

export const dishSuccess = (dishes: Array<Dish>) => { 
	return {
		type: DishTypes.DISH_SUCCESS,
		payload:{
			dishes: dishes
		}
	}
}

export const cartAdd = (dish: Dish) => {
	return {
		type: DishTypes.CART_ADD,
		payload: {
			dish: dish
		}
	}
}

export const cartRemove = (dish: Dish) => {
	return {
		type: DishTypes.CART_REMOVE,
		payload: {
			dish: dish
		}
	}
}