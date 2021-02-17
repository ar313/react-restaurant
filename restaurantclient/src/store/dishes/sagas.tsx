import { takeEvery, put } from "redux-saga/effects";
import { Dish, DishImageGet, DishTypes } from "./types";
import * as actions from "./action";
import axios from "axios";
import storeProvider from "../storeProvider";
import { action } from "typesafe-actions";

function* getDishes() {
	try {
		yield put(actions.dishStart());
		
		const url = '/api/dishes'

		const response = yield axios.get("https://localhost:5000" + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			}
		});

		if (response.status === 200) {

			var dishes = response.data.dishes;
			for (var item of dishes) {
				item.dishImage = "https://localhost:5000/api/dishes/image/"+ item.id
			}
			yield put(actions.dishSuccess(dishes));
		}

	} catch (err) {
		console.log(err);
		yield put(actions.dishFail());
	}
}

function* getImages(action: DishImageGet) {
	try {
		// yield put(actions.dishStart());
		// var dish = action.payload.dish;
		// const url = '/api/dishes/image/'+ dish.id
		// const response = yield axios.get("https://localhost:5000" + url, {
        //     headers: {
        //         Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
		// 	}
		// });

		// if (response.status === 200) {
		// 	dish.dishImage = response.config.url;
		// 	yield put(actions.dishImageSuccess(dish));

		// }

	} catch (err) {
		console.log(err);
		yield put(actions.dishFail());
	}
}

export function* watchDish() {
	yield takeEvery(DishTypes.DISH_INIT, getDishes);
	yield takeEvery(DishTypes.DISH_IMAGE_GET, getImages);
}