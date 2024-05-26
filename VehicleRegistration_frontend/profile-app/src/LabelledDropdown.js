import React, { Component } from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import EntityDropdown from './EntityDropdown.js';

export default class LabelledDropdown extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
				fieldName: props.fieldName,
				label : props.label,
				initialValue: props.initialValue,
				apiCallToFetchData: props.apiCallToFetchData,
				displayName: props.displayName
		};
	}

	render() {
		return <FormGroup>
		<Row>
		<Col align="right" sm={{size:2}}>
		<Label for={this.state.fieldName}>{this.props.label}</Label>
		</Col>
		<Col>
		<EntityDropdown 
		    fieldName={this.props.fieldName}
			apiCallToFetchData={this.state.apiCallToFetchData} 
			initialValue={this.props.initialValue}
			onChangeHandler={this.props.onChangeHandler}
		/>
		</Col>
		</Row>
		</FormGroup>
	}
		
}