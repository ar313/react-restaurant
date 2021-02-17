import React, { Component } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import classes from './Recipe.module.css';

interface IProps {
    title: string;
    clickSave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
	clickDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
	classes?: string;
}

export default class AccordionComponent extends Component<IProps> {

    render () {

        return (
            <Accordion className={this.props.classes} style={{}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    {this.props.title}
                </AccordionSummary>
                <AccordionDetails>
                    {this.props.children}
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                   {this.props.clickSave? <Button color="primary" onClick={this.props.clickSave}>Save</Button> : null}
                   {this.props.clickDelete? <Button color="secondary" onClick={this.props.clickDelete}>Delete</Button> : null}
                </AccordionActions>
            </Accordion>
        )
    }
}

