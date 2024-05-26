import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Label, FormText, FormFeedback } from 'reactstrap';
import './App.css';

export default class LabelledTextField extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
				fieldName: props.fieldName,
				specialId: props.specialId,
				label : props.label,
				inputValue: props.initialValue || '',
				onChangeHandler : props.onChangeHandler,
				hintText : props.hintText
		};
		
	}
	
	handleChange = (event, id) => {
	    const target = event.target;
		const value = target.value;
	    const name = this.state.fieldName;
	    this.setState({inputValue : value});
		this.state.onChangeHandler(name, value, this.state.specialId);
	  }
	
	render() {
		let isValid = false;
		if (this.state.inputValue && this.state.inputValue !== '' ){
			isValid = this.state.inputValue.length > 0;
		}
		
		return <FormGroup>
		<Row className="rowClass">
		<Col align="left" sm={{size:2}}>
		<Label for={this.state.fieldName} className="labelClass">{this.state.label}</Label>
		</Col>
		<Col>
		{isValid ?
		<Input type="text" 
			name={this.state.fieldName} 
			id={this.state.fieldName} 
			value={this.state.inputValue} 
			onChange={e => this.handleChange(e, this.state.id)} />
		:
		<Input type="text" invalid
			name={this.state.fieldName} 
			id={this.state.fieldName} 
			value={this.state.inputValue} 
			onChange={e => this.handleChange(e, this.state.id)} />
		}
		{!isValid && <FormFeedback className="white-text">This field cannot be empty.</FormFeedback>}
		{this.state.hintText && <FormText>{this.state.hintText}</FormText>}
		
		</Col>
		</Row>
		</FormGroup>
	}
}