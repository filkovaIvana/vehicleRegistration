import React from 'react';
import {RecordList} from './RecordList';

const UserRegistrationList = () => 
(
 <RecordList
	crudApi="/crudApi/country/"
	editApi="/country/edit/"
	numColumns="4"
	tableHeaderText="Countries"
	addButtonText="Add Country"
	columnHeaderTextArr={["Name", "Official State Name", "2-Letter Code", "3-Letter Code"]}
	columnRecordAttributes={["name", "officialStateName", "codeAlpha2", "codeAlpha3"]}
	isCountry="true"
/>
)

export default UserRegistrationList;