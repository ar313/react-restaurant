import React, { Component, SyntheticEvent } from "react";
import { Grid, Button } from "@material-ui/core";
import { ValidationInput } from "../../../shared/IFormField";
import { validateRules } from '../../../shared/ValidationRules';
import FormGenerate from '../../../components/Forms/FormGenerate';

import classes from './Register.module.css';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { auth, authClear } from '../../../store/auth/action';
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router";

interface Inputs {
	email: ValidationInput;
	password: ValidationInput;
	confirmPassword: ValidationInput;
}

interface IState {
	Inputs: Inputs,
	formIsValid: boolean,
}

interface IProps {
	register: (email: string, password: string, isSignIn: boolean) => any;
	clear: () => any;
	isLoading: boolean;
	error: string;
	redirectUrl: string;
	canBeRedirected: boolean;
}

class Register extends Component<IProps, IState> {

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
				},
				confirmPassword: {
					rules: {
						confirm_password: ''
					},
					value: '',
					FieldProps:{
						onFocusLost: this.onBlurCheckValidity,
						isValid: false,
						isTouched: false,
						errorMessage: '',
						classes: classes.InputMedium,
						required: true,
						name: 'confirm_password',
						label: 'Confirm Password',
						type: 'password',
						variant: 'outlined',
					}
				},
			}
		}
	}

	componentWillUnmount() {
		this.props.clear();
	}
	
	onBlurCheckValidity = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) : void => {
		event.currentTarget.value = event.currentTarget.value.trim();
		this.checkValidity(	event.currentTarget.value, type);
	}

	checkValidity = (value: string, type: string) => {
		switch (type) {
			case 'password': {
					let validated = validateRules( value, type, this.state.Inputs.password.rules )
					let newPasswordInput = {
						...this.state.Inputs.password.FieldProps,
						isValid: validated.isValid,
						errorMessage: validated.errorMessage,
						isTouched: true
					};

					let password = value;
					let newConfirmPassword = {
						...this.state.Inputs.confirmPassword.rules,
						confirm_password: password,
					}
					let Inputs = { 
						...this.state.Inputs, 
						password:{ ...this.state.Inputs.password, FieldProps: newPasswordInput, value: value },
						confirmPassword: { ...this.state.Inputs.confirmPassword, rules: newConfirmPassword }
					};
					this.validateForm(Inputs);
				break;
			}
			case 'confirm_password': {
					let validated = validateRules( value, type, this.state.Inputs.confirmPassword.rules )
					let newPasswordInput = {
						...this.state.Inputs.confirmPassword.FieldProps,
						isValid: validated.isValid,
						errorMessage: validated.errorMessage,
						isTouched: true
					};
					
					let Inputs = { 
						...this.state.Inputs, 
						confirmPassword:{ 
							...this.state.Inputs.confirmPassword, 
							FieldProps: newPasswordInput,
							value: value
						}
					};
					this.validateForm(Inputs);
				break;
			}

			case 'email': {
				let validated = validateRules(value, type, this.state.Inputs.email.rules )
				let newEmailInput = {
					...this.state.Inputs.email.FieldProps,
					isValid: validated.isValid,
					errorMessage: validated.errorMessage,
					isTouched: true
				};
				
				let Inputs = { 
					...this.state.Inputs,
					email: { 
						...this.state.Inputs.email, 
						FieldProps: newEmailInput,
						value: value
					} 
				};
		
				this.validateForm(Inputs);
			}
		}
	}

	validateForm(Inputs: Inputs) {
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

	registerUser = (event: SyntheticEvent) => {
		event.preventDefault();
		if (this.state.formIsValid) {
			let email = this.state.Inputs.email.value.slice();
			let password = this.state.Inputs.password.value.slice();

			this.props.register(email, password, false);
		}
	}

	render () {

		let fields = Object.values(this.state.Inputs).map( (field) => {
			return field.FieldProps;
		});

		if(this.props.redirectUrl && this.props.canBeRedirected) {
			return <Redirect to={this.props.redirectUrl} />
		}

		return(
			<form className={classes.Form}>
				<Grid container spacing={5} direction="column" justify="center" alignItems="center">

					<FormGenerate Fields={fields} />
					<Grid item >
						<Button onClick={event => this.registerUser(event)} disabled={!this.state.formIsValid} type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
							Register
						</Button>
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
		redirectUrl: state.auth.redirectUrl
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		register: (email: string, password: string, isSignIn: boolean)  => 
			dispatch(auth(email, password, isSignIn)),
		clear: () => dispatch(authClear())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);