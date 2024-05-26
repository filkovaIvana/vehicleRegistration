import React from 'react';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';
type Props = {
	fieldName: string,
	label: string,
	initialValue: string,
}

const LabelledTextArea = (props: Props) => 
 (<FormGroup>
		<Row>
		<Col align="left" sm={{size:2}}>
		<Label for={props.fieldName}>{props.label}</Label>
		</Col>
		<Col>
		<Input 
			type="textarea" 
			name={props.fieldName} 
			id={props.fieldName} 
			autoComplete={props.fieldName} 
			value={props.initialValue}/>
		</Col>
		</Row>
		</FormGroup>
);

export default LabelledTextArea;
