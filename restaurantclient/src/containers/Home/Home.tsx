import React, { Component } from 'react';
import MakeReservation from '../Client/UserReservation/MakeReservation/MakeReservation';

class Home extends Component {
		// <Dishes></Dishes> Tested needs images fix
		// <Ingredients></Ingredients> Tested has warnings remove delay later
		// <Recipes></Recipes> no known fixes needed
	render() {
		return (
			<React.Fragment>
				<MakeReservation></MakeReservation>
			</React.Fragment>
		)
	}
}

export default Home;