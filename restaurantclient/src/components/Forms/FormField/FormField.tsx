import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { IFormField } from '../../../shared/IFormField';

interface IProps extends IFormField {

}

class FormField extends Component<IProps> {

	render () {
		
		return (
			<TextField
			error={!this.props.isValid && this.props.isTouched}
			helperText={this.props.errorMessage}
			className={this.props.classes}
			required={this.props.required}
			id={this.props.name}
			label={this.props.label}
			type={this.props.type}
			placeholder={this.props.placeholder}
			variant={this.props.variant}
			onBlur={(event) => this.props.onFocusLost(event, this.props.name)}
			/>
		)
	}
}

export default FormField;