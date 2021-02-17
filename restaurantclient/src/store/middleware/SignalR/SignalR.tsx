import * as SignalR from '@microsoft/signalr';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';
import { AuthActionTypes } from '../../auth/types';
import { ingredientFail, ingredientSuccess } from '../../ingredients/action';
import { Ingredient, IngredientActionTypes, IngredientTypes } from '../../ingredients/types';

var connection: SignalR.HubConnection;

var firstConnect = true;

export function signalRInvokeMiddleware(store: any) {
    return (next: any) => async (action: IngredientActionTypes | AuthActionTypes) => {
		if (connection && connection.state !== "Connected") {
			return;
		}

		if (store.getState().auth.token && firstConnect) {
			var decoded: any = JwtDecode(store.getState().auth.token);
			var role = decoded.role;
			if ( role === ('Kitchen' || 'Admin')) {
				signalRRegisterCommands(store, store.getState().auth.token);
				firstConnect = false;
			}
		}
	
        try {
            switch (action.type) {
            case IngredientTypes.INGREDIENT_START:
                connection.invoke('GetIngredients');
                break;   
            case IngredientTypes.INGREDIENT_ADD:
                connection.invoke('AddIngredient', action.payload.ingredient)
                break;
            case IngredientTypes.INGREDIENT_REMOVE: 
                connection.invoke('DeleteIngredient', action.payload.ingredient.id);
                break;
            case IngredientTypes.INGREDIENT_UPDATED:
                connection.invoke('UpdateIngredient', action.payload.ingredient);
                break;
            }

        } catch(err){
            store.dispatch(ingredientFail())
        }  

        return next(action);
    }
}

export async function signalRRegisterCommands(store: any, token: string) {

	var cookieToken = Cookies.get('token')?? null;
	var accessToken =  cookieToken? cookieToken  : token;

    connection = new SignalR.HubConnectionBuilder().withUrl('https://localhost:5000/ingredients', {
        transport: SignalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
        accessTokenFactory: () => { return accessToken; }
    }).build();

    connection.on('GetIngredients', (data: Ingredient[]) => {
        store.dispatch(ingredientSuccess(data));
    });
    
	start(store);
}

function start(store: any) {

    connection.start().then(() => {
		connection.invoke('GetIngredients');
    }).catch((_err: any) => {
        store.dispatch(ingredientFail())
    });
}
