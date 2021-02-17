import { ValidationRules } from './IFormField'

export function validateRules (value: string, type: string, rules?: ValidationRules,  ) {
	let isValid = true;
	let errorMessage = '';

	let displayName = type.slice();
	displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

	for (let i = 0; i < type.length; i++) {
		if (type.charAt(i) === type.charAt(i).toUpperCase()) {
			displayName = displayName.slice(0, i) + ' ' + type.slice(i);
		}
	}

	if(!rules) {
		return {
			isValid: isValid,
			errorMessage: errorMessage,
		}
	}

	if(rules.minLength && !minLength(value, rules.minLength) ) {
		isValid = false;
		errorMessage = displayName + ' needs to be at least '+ rules.minLength + ' characters long';
	}

	else if(rules.maxLength && !maxLength(value, rules.maxLength) ) {
		isValid = false;
		errorMessage = 'The field' + displayName + 'exceeds the max length';
	}
	
	else if(rules.email && !validateEmail(value)) {
		isValid = false;
		errorMessage = 'Please enter a valid email address';
	}
	else if(rules.hasDigit && !hasDigit(value)) {
		isValid = false;
		errorMessage = 'Needs at least 1 digit';
	}
	else if(rules.hasUppercase && !hasUppercase(value) ) {
		isValid = false;
		errorMessage = 'Needs at least 1 uppercase character';
	}
	else if(rules.specialCharacter && !specialCharacters(value) ) {
		isValid = false;
		errorMessage = 'Needs at least 1 special character';
	}
	else if(rules.confirm_password && !confirmPassword(rules.confirm_password, value)) {
		isValid = false;
		errorMessage = 'Password and Confirm Password do not match';
	}

	return {
		isValid: isValid,
		errorMessage: errorMessage,
	}
}


function minLength (value: string, minLength?: number): boolean {
	if(!minLength) { return true; }

	if(value.trim().length < minLength ) {
		return false
	} 

	return true;
}

function maxLength (value: string, maxLength?: number): boolean {
	if(!maxLength) { return true; }

	if(value.trim().length > maxLength ) {
		return false
	} 

	return true;
}

function specialCharacters (value: string): boolean {
	var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

	return format.test(value);
}

function hasDigit(value: string): boolean {
	return (/[0-9]/.test(value));
}

function hasUppercase(value: string): boolean {
	return(/[A-Z]/.test(value));
}

function confirmPassword(password: string, confirm_password: string): boolean {
	return password === confirm_password;
} 

function validateEmail(email: string): boolean {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}