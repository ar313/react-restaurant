import React, { Component, SyntheticEvent } from "react";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Grid, Button, Link, CircularProgress } from "@material-ui/core";
import classes from './Login.module.css';
import { validateRules } from '../../../shared/ValidationRules';
import FormGenerate from '../../../components/Forms/FormGenerate';
import { ValidationInput } from '../../../shared/IFormField';
import { connect, RootStateOrAny } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { auth, authClear } from "../../../store/auth/action";

interface ValidationInputs {
	email: ValidationInput,
	password: ValidationInput,
}

interface IState {
	Inputs: ValidationInputs,
	formIsValid: boolean,
}

interface IProps {
	login: (email: string, password: string, isSignIn: boolean) => any;
	clear: () => any;
	isLoading: boolean;
	error: string;
	redirectUrl: string;
	isAuthenticated: boolean;
}

class Login extends Component<IProps,IState> {
	
	constructor(props: IProps) {
		super(props);

		this.state = {
			formIsValid: false,
			Inputs: {
				email: {
					rules: {
						email:true
					},
					value: '',
					FieldProps:{
						onFocusLost: this.onBlurCheckValidity,
						isValid: false,
						isTouched: false,
						errorMessage: '',
						classes: classes.InputMedium,
						required: true,
						name: 'email',
						label: 'Email',
						type: 'email',
						placeholder: 'Please enter your email address',
						variant: 'outlined',
					}
				},
				password: {
					rules: {
						minLength: 6,
						hasUppercase: true,
						hasDigit: true,
						specialCharacter: true
					},
					value: '',
					FieldProps:{
						onFocusLost: this.onBlurCheckValidity,
						isValid: false,
						isTouched: false,
						errorMessage: '',
						classes: classes.InputMedium,
						required: true,
						name: 'password',
						label: 'Password',
						type: 'password',
						variant: 'outlined',
					}
				}
			},
		}
	}

	componentDidMount() {
		document.title = "Login";
	}

	componentWillUnmount() {
		this.props.clear();
	}
	
	onBlurCheckValidity = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) : void => {
		event.currentTarget.value = event.currentTarget.value.trim();
		this.checkValidity(	event.currentTarget.value, name);
	}

	checkValidity = (value: string, name: string) => {
		switch (name) {
			case 'password': {
					let validated = validateRules( value, name, this.state.Inputs.password.rules )
					let newPasswordInput = {
						...this.state.Inputs.password.FieldProps,
						isValid: validated.isValid,
						errorMessage: validated.errorMessage,
						isTouched: true
					};
					
					let Inputs = { 
						...this.state.Inputs, password:{ 
							...this.state.Inputs.password, 
							FieldProps: newPasswordInput,
							value: value
						} 
					};
			
					this.validateForm(Inputs);
				break;
			}
			case 'email': {
				let validated = validateRules(value, name, this.state.Inputs.email.rules )
				let newEmailInput = {
					...this.state.Inputs.email.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs, 
					email:{ 
						...this.state.Inputs.email, 
						FieldProps: newEmailInput,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
			}
		}
	}

	validateForm(Inputs: ValidationInputs) {
		let formValidity = true;

		Object.entries(Inputs).forEach((input) => {
			if(!input[1].FieldProps.isValid) {
				formValidity = false;
			}
		});

		this.setState({
			Inputs: Inputs,
			formIsValid: formValidity
		});
	
	}

	loginUser = (event: SyntheticEvent) => {
		event.preventDefault();
		if (this.state.formIsValid) {
			let email = this.state.Inputs.email.value.slice();
			let password = this.state.Inputs.password.value.slice();
			
			this.props.login(email, password, true);
		}
	}

	render () {

		let fields = Object.values(this.state.Inputs).map( (field) => {
			return field.FieldProps;
		});

		if (this.props.isAuthenticated) {
			this.props.clear();
			return <Redirect to={this.props.redirectUrl} />
		} else if (this.props.isLoading) {
			return <div className = {classes.Spinner}> <CircularProgress size={100} /> </div>
		}

		return(
			<form className={classes.Form}>
				<Grid spacing={5} container direction={"column"} justify="center" alignItems="center">

					<FormGenerate Fields={fields} />

					<Grid item >
						<Button onClick={event => this.loginUser(event)} disabled={!this.state.formIsValid} type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
							Login
						</Button>
					</Grid>

					<Grid item >
						<Link underline="none" color="inherit" component={RouterLink} to="/Register">
							<Button type="button" variant="contained" size="small" color="secondary" className={classes.margin}>
								Go To Register Page
							</Button>
						</Link>
					</Grid>
				</Grid>
			</form>
		);
	}
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isLoading: state.auth.isLoading,
		error: state.auth.errors,
		redirectUrl: state.auth.redirectUrl,
		isAuthenticated: state.auth.isAuthenticated
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		login: (email: string, password: string, isSignIn: boolean)  => 
			dispatch(auth(email, password, isSignIn)),
		clear: () => dispatch(authClear())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);