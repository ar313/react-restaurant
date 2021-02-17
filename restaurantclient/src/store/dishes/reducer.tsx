import { Reducer } from "redux";
import { DishState, DishActionTypes, DishTypes, Dish, Cart } from "./types";

export const initialState: DishState = {
	isLoading: false,
	Dishes: Array<Dish>(),
	Cart: Array<Cart>()
}

const reducer: Reducer<DishState> = (state = initialState, action: DishActionTypes ) => {

	switch (action.type) {
		case DishTypes.DISH_START : {
			return {
				...state,
				isLoading: true
			}
		}
		case DishTypes.DISH_SUCCESS: {
			var dishes = [...action.payload.dishes];

			return {
				...state,
				isLoading: false,
				Dishes: dishes
			}
		}
		case DishTypes.DISH_FAIL: {
			return {
				...state,
				isLoading: false
			}
		}
		case DishTypes.DISH_IMAGE_SUCCESS: {
			let dishes = [...state.Dishes];
			let dish = action.payload.dish;
			let index = dishes.findIndex(d => d.id === dish.id);
			dishes[index] = dish;
			return {
				...state,
				Dishes: dishes
			}
		}
		case DishTypes.CART_ADD: {
			let cart = [...state.Cart];
			let dish = action.payload.dish;
			let index = cart.findIndex(d => d.Dish.id === dish.id);
			
			if (index >= 0) {
				cart[index].Quantity += 1;	
			} else {
				cart.push({Dish: dish, Quantity: 1});
			}
			return {
				...state,
				Cart: cart
			}
		}
		case DishTypes.CART_CLEAR: {
			return {
				...state,
				Cart: Array<Cart>()
			}
		}
		case DishTypes.CART_REMOVE: {
			let cart = [...state.Cart];
			let dish = action.payload.dish
			let index = cart.findIndex(d => d.Dish.id === dish.id);

			cart[index].Quantity--;
			
			if (cart[index].Quantity <= 0) {
				cart.splice(index, 1);
			}
			
			return {
				...state,
				Cart: cart
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export { reducer as DishReducer };