import { IngredientTypes, IngredientAdd, IngredientDelete, IngredientUpdate } from "./types";
import { takeEvery, put } from "redux-saga/effects";
import * as actions from "./action";


function* getIngredients() {
    try {
        //yield start(storeProvider.getStore());
        yield put(actions.ingredientStart());

	} catch (err) {
		console.log("Fetch Error:" + err);
		yield put(actions.ingredientFail());
	}

}

function* addIngredient(action: IngredientAdd) {
    try {
         yield put(actions.ingredientAdd(action.payload.ingredient));
    } catch(err) {
        console.log("Adding Error:" + err);
		yield put(actions.ingredientFail());
    }

}

function* deleteIngredient(action: IngredientDelete) {
    try {
        yield put(actions.ingredientRemove(action.payload.ingredient));
    } catch(err) {
        console.log("Delete Error: " + err);
		yield put(actions.ingredientFail());
    }
}

function* updateIngredient(action: IngredientUpdate) {
    try {
        yield put(actions.ingredientUpdated(action.payload.ingredient))
    } catch (err) {
        console.log("Update Error: " +err)
        yield put(actions.ingredientFail())
    }
}

export function* watchIngredient() {
    yield takeEvery(IngredientTypes.INGREDIENT_INIT, getIngredients);
    yield takeEvery(IngredientTypes.INGREDIENT_SEND, addIngredient);
    yield takeEvery(IngredientTypes.INGREDIENT_DELETE, deleteIngredient);
    yield takeEvery(IngredientTypes.INGREDIENT_UPDATE, updateIngredient);
}

