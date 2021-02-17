import { ValidationInput } from '../../../shared/IFormField';
import classes from './Checkout.module.css';

export interface ValidationInputs {
	firstName: ValidationInput,
	lastName: ValidationInput,
	country: ValidationInput,
	city: ValidationInput,
	address: ValidationInput,
	zip: ValidationInput,
	cardNumber: ValidationInput,
	expDate: ValidationInput,
	ccv: ValidationInput 
}

export function Inputs ( onBlurCheckValidity: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, type: string ) => void ) { 
	var input: ValidationInputs;
	input = { 
		firstName: {
			value: '',
			rules: {
				minLength: 2,
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'firstName',
				label: 'First Name',
				type: 'text',
				placeholder: 'Please enter your first name',
				variant: 'outlined',
			}
		},
		lastName: {
			value: '',
			rules: {
				minLength: 2,
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'lastName',
				label: 'Last Name',
				type: 'text',
				placeholder: 'Please enter your last name',
				variant: 'outlined',
			}
		},
		country: {
			value: '',
			rules: {
				minLength: 2,
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'country',
				label: 'Country',
				type: 'text',
				placeholder: 'Please enter your country',
				variant: 'outlined',
			}
		},
		city: {
			value: '',
			rules: {
				minLength: 2,
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'city',
				label: 'City',
				type: 'text',
				placeholder: 'Please enter your city',
				variant: 'outlined',
			}
		},
		address: {
			value: '',
			rules: {
				minLength: 2,
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'address',
				label: 'Address',
				type: 'text',
				placeholder: 'Please enter your address',
				variant: 'outlined',
			}
		},
		zip: {
			value: '',
			rules: {
				minLength: 4,
				maxLength: 5
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputSmall,
				required: true,
				name: 'zip',
				label: 'ZIP Code',
				type: 'number',
				placeholder: 'Please enter your zip code',
				variant: 'outlined',
			}
		},
		cardNumber: {
			value: '',
			rules: {
				minLength: 16,
				maxLength: 16
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputMedium,
				required: true,
				name: 'cardNumber',
				label: 'Card Number',
				type: 'number',
				placeholder: 'Please enter your card number',
				variant: 'outlined',
			}
		},
		expDate: {
			value: '',
			rules: {
				minLength: 4,
				maxLength: 4
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputSmall,
				required: true,
				name: 'expirationDate',
				label: 'Expiration Date',
				type: 'number',
				placeholder: 'Please enter your expiration date',
				variant: 'outlined',
			}
		},
		ccv: {
			value: '',
			rules: {
				minLength: 3,
				maxLength: 4
			},
			FieldProps:{
				onFocusLost: onBlurCheckValidity,
				isValid: false,
				isTouched: false,
				errorMessage: '',
				classes: classes.InputSmall,
				required: true,
				name: 'ccv',
				label: 'CCV',
				type: 'number',
				placeholder: 'Please enter your ccv found on the back of the card',
				variant: 'outlined',
			}
		},
	};

	return input;
}