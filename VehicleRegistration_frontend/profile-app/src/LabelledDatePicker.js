import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

type Props = {
	fieldName: string,
	label: sting,
	initialValue: string,
}

 const LabelledDatePicker= (props: Props) => (
 <FormGroup>
		<Row>
		<Col align="right" sm={{size:2}}>
		<Label for={props.fieldName}>{props.label}</Label>
		</Col>
		<Col>
		<DatePicker selected={Date.parse(props.initialValue)} />
		</Col>
		</Row>
		</FormGroup>
);

export default LabelledDatePicker;