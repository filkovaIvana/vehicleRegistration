import React from 'react';
import { Row, Col, FormGroup, Label, FormText } from 'reactstrap';
import EntityTypeahead from './EntityTypeahead.js';

type Props = {
	fieldName: string,
	label: string,
    apiCallToFetchData: string,
    displayName: string,
    searchName: string,
    initialValue: string,
    onChangeHandler: () => void,
    onInputChange: () => void,
    onSearch: () => void,
    onUserSearch: () => void,
  };

const LabelledTypeahead = (props: Props) =>
 (
      <FormGroup>
        <Row>
          <Col align="left" sm={{ size: 2 }}>
            <Label for={props.fieldName}>{props.label}</Label>
          </Col>
          <Col>
            <EntityTypeahead
              apiCallToFetchData={props.apiCallToFetchData}
              displayName={props.displayName}
              onChangeHandler={props.onChangeHandler}
              onSearch={props.onSearch}
              onUserSearch={props.onUserSearch}
            //   onAreaSearch={this.props.}
              onInputChange={props.onInputChange}
              initialValue={props.initialValue}
              searchName={props.searchName}
            />
            {props.hintText && <FormText>{props.hintText}</FormText>}
          </Col>
        </Row>
      </FormGroup>
	);
	export default LabelledTypeahead;
