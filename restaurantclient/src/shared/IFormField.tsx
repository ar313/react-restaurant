export interface IFormField {
	onFocusLost: ((event:  React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => void);
	isValid?: boolean;
	isTouched: boolean;
	errorMessage?: string;
	classes?: string;
	required?: boolean;
	name: string;
	label: string;
	type: string;
	placeholder?: string;
	variant?: "standard" | "filled" | "outlined";
}


export interface ValidationRules {
	minLength?: number;
	maxLength?: number;
	email?: boolean;
	hasUppercase?: boolean;
	hasDigit?: boolean;
	specialCharacter?: boolean;
	confirm_password?: string;
}

export interface ValidationInput {
	value: string;
	rules?: ValidationRules;
	FieldProps: IFormField;
}

