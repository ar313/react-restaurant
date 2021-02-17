import React, { Component } from "react";
import FormField from './FormField/FormField';
import { IFormField } from '../../shared/IFormField';
import { Grid } from "@material-ui/core";

interface IProps {
	Fields: IFormField[],
}

class FormGenerate extends Component<IProps> {

	render() {
		let formItems = this.props.Fields.map( (field, index) => (
			<Grid item key={field.name}>
				<FormField
					isValid={field.isValid}
					isTouched={field.isTouched}
					errorMessage={field.errorMessage}
					classes={field.classes}
					required={field.required}
					name={field.name}
					label={field.label}
					type={field.type}
					placeholder={field.placeholder}
					variant={field.variant}
					onFocusLost={field.onFocusLost}
				/>
			</Grid>
		))

		return (
			<React.Fragment>
				{formItems}
			</React.Fragment>
		)
	}
}

export default FormGenerate;