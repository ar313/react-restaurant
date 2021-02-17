import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthReducer } from './store/auth/reducer';
import { watchAuth } from './store/auth/sagas';
import { watchDish } from './store/dishes/sagas';
import { watchIngredient } from './store/ingredients/sagas'
import { DishReducer } from './store/dishes/reducer';
import { IngredientReducer } from './store/ingredients/reducer';
import { signalRInvokeMiddleware } from './store/middleware/SignalR/SignalR';
import { RecipeReducer } from './store/recipes/reducer';
import { watchRecipe } from './store/recipes/sagas';
import storeProvider from './store/storeProvider';
import { UsersReducer } from './store/users/reducer';
import { watchUsers } from './store/users/sagas';
import { RolesReducer } from './store/roles/reducer';
import { watchRoles } from './store/roles/sagas';
import { AddressReducer } from './store/address/reducer';
import { watchAddress } from './store/address/sagas';
import { UserOrderReducer } from './store/userOrder/reducer';
import { watchUserOrder } from './store/userOrder/sagas';
import { DeliveriesReducer } from './store/deliveries/reducer';
import { watchDeliveries } from './store/deliveries/sagas';
import { TablesReducer } from './store/tables/reducer';
import { watchTables } from './store/tables/sagas';
import { watchReservations } from './store/reservations/sagas';
import { ReservationsReducer } from './store/reservations/reducer';
import { watchOrders } from './store/orders/sagas';
import { OrdersReducer } from './store/orders/reducer';
import { EmployeesReducer } from './store/employees/reducer';
import { watchEmployees } from './store/employees/sagas';

axios.defaults.baseURL = 'https://localhost:5000/'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const rootReducer = combineReducers({
	auth: AuthReducer,
	dish: DishReducer,
	ingredient: IngredientReducer,
	recipe: RecipeReducer,
	users: UsersReducer,
	roles: RolesReducer,
	address: AddressReducer,
	userOrder: UserOrderReducer,
	deliveries: DeliveriesReducer,
	tables: TablesReducer,
	reservations: ReservationsReducer,
	orders: OrdersReducer,
	employees: EmployeesReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleware();

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleWare, signalRInvokeMiddleware)));

storeProvider.init(configureStore);
const store = storeProvider.getStore();

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchDish);
sagaMiddleWare.run(watchIngredient);
sagaMiddleWare.run(watchRecipe);
sagaMiddleWare.run(watchUsers);
sagaMiddleWare.run(watchRoles);
sagaMiddleWare.run(watchAddress);
sagaMiddleWare.run(watchUserOrder);
sagaMiddleWare.run(watchDeliveries);
sagaMiddleWare.run(watchTables);
sagaMiddleWare.run(watchReservations);
sagaMiddleWare.run(watchOrders);
sagaMiddleWare.run(watchEmployees);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
