import { FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { Component, ReactNode } from 'react';
import axios from 'axios';
import classes from './FinancialReports.module.css';
import storeProvider from '../../../store/storeProvider';

interface CostReport {
    id: string;
    name: string;
    cost: string;
}

interface Report {
    id: string
    totalPrice: string;
    createdOn: Date; 
    cost: string;
    profit: string;
    costReports: Array<CostReport>;
}

interface IState {
    columns: Array<any>;
    data: Array<Report>;
    dailyReports: Array<Report>;
    monthlyReports: Array<Report>;
    daily: boolean
}

interface IProps {

}


class FinancialReports extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            columns: [
                { title: 'Creation Date', headerStyle: {width: 200, minWidth: 200}, cellStyle: {width: 200, minWidth: 200}, 
                    field: 'createdOn', render: (rowData: Report) => { 
                    var date = new Date(rowData.createdOn) 

                    return date.toLocaleString();
                }
                },
                { title: 'Total', field: 'totalPrice' },
                { title: 'Cost', field: 'cost' },
                { title: 'Net Profit', field: 'profit' },
            ],
            data: Array<Report>(),
            dailyReports: Array<Report>(),
            monthlyReports: Array<Report>(),
            daily: false
        };
    }

    componentDidMount() {
        document.title = "Financial Reports"
        this.getDailyReports();
        this.getMonthlyReports();
    }

    getDailyReports = () => {
        axios.get("https://localhost:5000/api/reports/daily", {
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => { 
			return this.setState({ 
                dailyReports: response.data.dailyReports,
                data: this.state.daily? response.data.dailyReports : this.state.data
			    })
			}
		)
		.catch(err => {
			return null;
		});
    }

    getMonthlyReports = () => {
        axios.get("https://localhost:5000/api/reports/monthly", {
			headers: {
				Authorization: `Bearer `+ storeProvider.getStore().getState().auth.token
			  }
		} )
		.then(response => { 

			return this.setState({ 
                monthlyReports: response.data.monthlyReports,
                data: this.state.daily? this.state.data : response.data.monthlyReports 
				})
			}
		)
		.catch(err => {
			return null;
		});
    }

    handleSwitchReports = () => {
        var daily = this.state.daily;
        var data = daily? this.state.monthlyReports : this.state.dailyReports 
        
        this.setState({
            daily: !daily,
            data: data
        })
    }

    generateDetailsPanel = (rowData: Report): ReactNode => {
        return  (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="cost-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rowData.costReports.map(costReport => (
                    <TableRow key={costReport.id}>
                        <TableCell component="th" scope="row">
                        {costReport.name}
                        </TableCell>
                        <TableCell align="right">{costReport.cost}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        );
    }

	render() {
		return (
            <div className={classes.Container}>
                <Tooltip arrow title="Switch between daily and monthly reports" aria-label="add">
                  <FormControlLabel
                        control={<Switch checked={this.state.daily} onChange={this.handleSwitchReports} />}
                        label={this.state.daily? "Daily" : "Monthly"}
                    />
                </Tooltip>
                <MaterialTable 
                title={this.state.daily? "Daily Financial Reports" : "Monthly Financial Reports"}
                columns={this.state.columns}
                data={this.state.data}
                onRowClick={(event, rowData, togglePanel) => { if(togglePanel) togglePanel() }}
                detailPanel={(rowData) => this.generateDetailsPanel(rowData)}
                />
            </div>
		)
	}
}

export default FinancialReports;