import classes from './CashDesk.module.css';
import React, { Component } from 'react';
import axios from 'axios';
import storeProvider from '../../store/storeProvider';
import { Card, CardContent, Typography } from '@material-ui/core';

interface IProps {

}

interface CashDesk {
    id: string;
    cash: number;
}

interface IState {
    cashDesk?: CashDesk;
}

class CashDesk extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            cashDesk: undefined
        }
    }

    componentDidMount() {
        this.getUserCash();
    }

    getUserCash = () => {
        axios
        .get("https://localhost:5000/api/employee/cash", {
            headers: {
                Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
              }
        } )
        .then(response => this.setState({ cashDesk: response.data.cashDesk }))
        .catch(err => {
            console.log(err);
            return null;
        });
    };    

	render() {
		return (
			<div className={classes.CashDesk}>
                <h3 className={classes.Text}>Personal Cash Desk</h3>
                {this.state.cashDesk? 
                <Card className={classes.Card}>
				<CardContent>
					<Typography variant="h5" className={classes.title} color="textPrimary" gutterBottom>
						Money in Hand
					</Typography>
					<br />
					<Typography variant="body1" className={classes.pos} color="textPrimary">
						Total : <span className={classes.SmallFont}>{this.state.cashDesk.cash}$</span>
					</Typography>
				</CardContent>
			</Card>
            : "No Cash Desk Found"}
			</div>
		)
	}
}

export default CashDesk;