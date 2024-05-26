import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';

export default class ChipsWithTypeahead extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
				fieldName: props.fieldName,
				label : props.label,
				apiCallToFetchData: props.apiCallToFetchData
		};
	}

	render() {
		return <FormGroup>
		<Row>
		<Col>
		<Label for={this.state.fieldName}>{this.state.label}</Label>
		</Col>
		<Col>
		<Input type="text" name={this.state.fieldName} id={this.state.fieldName} value={this.state.initialValue || ''}
		autoComplete={this.state.fieldName}/>
		</Col>
		</Row>
		</FormGroup>
	}
		
}