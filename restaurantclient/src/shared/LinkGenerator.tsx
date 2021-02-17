import React from 'react';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import HistoryIcon from '@material-ui/icons/History';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import InfoIcon from '@material-ui/icons/Info';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import GroupIcon from '@material-ui/icons/Group';
import Login from '../containers/Account/Login/Login';
import Register from '../containers/Account/Register/Register';
import Orders from '../containers/Kitchen/Orders/Orders';
import Dishes from '../containers/Client/Dishes/Dishes';
import Recipes from '../containers/Kitchen/Recipes/Recipes';
import Ingredients from '../containers/Kitchen/Ingredients/Ingredients';
import Home from '../containers/Home/Home';
import Users from '../containers/Admin/Users/Users';
import Permissions from '../containers/Admin/Permissions/Permissions';
import Checkout from '../containers/Client/Checkout/Checkout';
import PastOrders from '../containers/Client/PastOrders/PastOrders';
import Deliveries from '../containers/Deliveries/Deliveries';
import MakeReservation from '../containers/Client/UserReservation/MakeReservation/MakeReservation';
import Reservations from '../containers/Reservations/Reservations';
import CashDesk from '../containers/CashDesk/CashDesk';
import Employees from '../containers/Employees/Employees';
import RestaurantDetails from '../containers/RestaurantDetails/RestaurantDetails';
import DishesDashboard from '../containers/Kitchen/DishesDashboard/DishesDashboard';
import OperatorOrders from '../containers/Operator/OperatorOrders/OperatorOrders';
import FinancialReports from '../containers/Financial/FinancialReports/FinancialReports';

export interface ILinkType{
	linkPath: string;
	icon?: any;
	linkName: string;
	component: JSX.Element;
	navbar: boolean;
}

export interface IRoleRoute {
	role: string;
	links: Array<ILinkType>;
}

export const roleRoutes: Array<IRoleRoute> = [
	{
		role: '',
		links: [ 
			{ 
				linkPath: "/Login", 
				component: <Login></Login>,
				icon: <AccountBoxIcon />,
				linkName: 'Login',
				navbar: true
			}, 
			{
				linkPath: "/Register",
				component: <Register canBeRedirected={true}></Register>,
				linkName: 'Register',
				navbar: false
			},
			{
				linkPath: "/",
				component: <Login></Login>,
				linkName: 'Default',
				navbar: false
			}
		]
	},
	{
		role: 'Admin',
		links: [
			{
				linkPath: "/Users",
				component: <Users></Users>,
				linkName: "Users",
				navbar: true
			},
			{
				linkPath: "/Permissions",
				component: <Permissions></Permissions>,
				linkName: "Permissions",
				navbar: true
			},
			{
				linkPath: "/",
				component: <Users></Users>,
				linkName: "Default",
				navbar: false
			},
		]
	},
	{
		role: 'Finance',
		links: [ 
			{
				linkPath: "/",
				component:<FinancialReports></FinancialReports>,
				linkName: 'Reports',
				icon: <BarChartIcon />,
				navbar: true
			},
			{
				linkPath: "/Orders",
				component:<Orders></Orders>, 
				linkName: 'Orders',
				icon: <ShoppingCartIcon />,
				navbar: true
			},
			{
				linkPath: "/",
				component:<FinancialReports></FinancialReports>, 
				linkName: 'Reports',
				navbar: false
			},

		]
	},
	{
		role: 'Manager',
		links: [ 
			{
				linkPath: "/Reservations",
				component: <Reservations></Reservations>,
				icon: <EventSeatIcon />,
				linkName: 'Reservations',
				navbar: true
			},
			{
				linkPath: "/Employees",
				component: <Employees></Employees>,
				icon: <GroupIcon />,
				linkName: 'Employees',
				navbar: true
			},
			{
				linkPath: "/Details",
				component: <RestaurantDetails></RestaurantDetails>,
				icon: <InfoIcon />,
				linkName: ' Details',
				navbar: true
			},
			{
				linkPath: "/",
				component:<Employees></Employees>,
				linkName: 'Default',
				navbar: false
			},
		]
	},
	{
		role: 'Kitchen',
		links: [ 
			{
				linkPath: "/",
				component:<Orders></Orders>, //change
				linkName: 'Orders',
				icon: <ShoppingCartIcon />,
				navbar: true
			},
			{ 
				linkPath: "/Recipes", 
				component:<Recipes></Recipes>,
				icon: <FastfoodIcon /> ,
				linkName: 'Recipes',
				navbar: true
			}, 
			{ 
				linkPath: "/Ingredients", 
				component:<Ingredients></Ingredients>,
				icon: <FilterFramesIcon /> ,
				linkName: 'Ingredients',
				navbar: true
			}, 
			{ 
				linkPath: "/Dishes", 
				component:<DishesDashboard></DishesDashboard>,
				icon: <ShoppingBasketIcon /> ,
				linkName: 'Dishes',
				navbar: true
			}, 
			{
				linkPath: "/",
				component:<Orders></Orders>, //change
				linkName: 'Default',
				navbar: false
			},
		]
	},
	{
		role: 'Waiter',
		links: [ 
			{
				linkPath: "/",
				component:<Orders></Orders>, //change
				linkName: 'Orders',
				icon: <ShoppingCartIcon />,
				navbar: true
			},
			{
				linkPath: "/CashDesk",
				component: <CashDesk></CashDesk>,
				linkName: "Cash Desk",
				icon: <LocalAtmIcon />,
				navbar: true
			},
		]
	},
	{
		role: 'Operator',
		links: [ 
			{
				linkPath: "/",
				component:<OperatorOrders></OperatorOrders>, //change
				linkName: 'Orders',
				icon: <ShoppingCartIcon />,
				navbar: true
			},
			{
				linkPath: "/",
				component:<OperatorOrders></OperatorOrders>, //change
				linkName: 'Default',
				navbar: false
			},
		]
	},
	{
		role: 'Delivery',
		links: [
			{
				linkPath: "/",
				component: <Deliveries></Deliveries>,
				linkName: "Deliveries",
				icon: <MotorcycleIcon />,
				navbar: true
			},
			{
				linkPath: "/CashDesk",
				component: <CashDesk></CashDesk>,
				linkName: "Cash Desk",
				icon: <LocalAtmIcon />,
				navbar: true
			},
			{
				linkPath: "/",
				component: <Users></Users>,
				linkName: "Default",
				navbar: false
			},
		]
	}, 
	{
		role: 'Client',
		links: [
			{
				linkPath: "/",
				component: <Dishes></Dishes>,
				icon: <ShoppingCartIcon /> ,
				linkName: 'Order Food',
				navbar: true
			}, 
			{ 
				linkPath: "/History", 
				component: <PastOrders></PastOrders>,
				icon: <HistoryIcon /> ,
				linkName: 'Past Orders',
				navbar: true
			},
			{
				linkPath: "/MakeReservation",
				component: <MakeReservation></MakeReservation>,
				icon: <EventSeatIcon />,
				linkName: 'Make Reservation',
				navbar: false
			},
			{
				linkPath: "/Reservations",
				component: <Reservations></Reservations>,
				icon: <EventSeatIcon />,
				linkName: 'Reservations',
				navbar: true
			},
			{
				linkPath: "/Checkout",
				component: <Checkout></Checkout>,
				icon: <ShoppingBasketIcon /> ,
				linkName: 'Checkout',
				navbar: false
			}, 
			{
				linkPath: "/",
				component: <Dishes></Dishes>,
				icon: <ShoppingBasketIcon /> ,
				linkName: 'Default',
				navbar: false
			}, 
		]
	},
]
