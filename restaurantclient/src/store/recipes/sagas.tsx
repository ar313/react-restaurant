import { put, takeEvery } from 'redux-saga/effects';
import * as actions from './action';
import { RecipeAdd, RecipeDelete, RecipeTypes, RecipeUpdate } from './types';
import axios from 'axios';
import storeProvider from '../storeProvider';

var baseUrl = "https://localhost:5000";

function* getRecipes() {
    try {
        yield put(actions.recipeStart());
        var url = "/api/recipe"

        var response = yield axios.get(baseUrl + url, {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        });

        if (response.status === 200) {
            var recipes = response.data.recipes;
            yield put(actions.recipeSuccess(recipes))
        }

    } catch(err) {
        console.log(err);
        yield put(actions.recipeFail());
    }
}

function* addRecipe(action: RecipeAdd) {
    try {
        yield put(actions.recipeStart());

        let url = '/api/recipe';

        var response = yield axios.post(baseUrl + url, {name: action.payload.name});

        if (response.status === 200) {
            var recipes = response.data.recipes;
            yield put(actions.recipeSuccess(recipes));
        }
    } catch (err) {
        yield put(actions.recipeFail());
    }
}

function* updateRecipe(action: RecipeUpdate) {
    try {
        yield put(actions.recipeStart());

        let url = '/api/recipe/' + action.payload.recipe.id;

        var response = yield axios.put(baseUrl + url, action.payload.recipe);

        if (response.status === 200) {
            var recipes = response.data.recipes;
            yield put(actions.recipeSuccess(recipes));
        }
    } catch (err) {
        yield put(actions.recipeFail());
    }
}

function* deleteRecipe(action: RecipeDelete) {
    try {
        yield put(actions.recipeStart());

        let url = '/api/recipe/' + action.payload.recipe.id;

        var response = yield axios.delete(baseUrl + url);

        if (response.status === 200) {
            var recipes = response.data.recipes;
            yield put(actions.recipeSuccess(recipes));
        }

    } catch (err) {
        yield put(actions.recipeFail());
    }
}

export function* watchRecipe() {
    yield takeEvery(RecipeTypes.RECIPE_INIT, getRecipes);
    yield takeEvery(RecipeTypes.RECIPE_UPDATE, updateRecipe);
    yield takeEvery(RecipeTypes.RECIPE_DELETE, deleteRecipe);
    yield takeEvery(RecipeTypes.RECIPE_ADD, addRecipe);
}