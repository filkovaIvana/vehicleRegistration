import React, { Component } from 'react';
import {  Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import './EntityDropdown.css';

export default class EntityDropdown extends Component {
	apiCallToFetchData = '';
		
	constructor(props) {
		super(props);
		this.apiCallToFetchData = props.apiCallToFetchData;

		this.state = {
				isDropdownOpen: false,
				optionsData: [],
				isLoading: true,
				displayName: 'Select'
		};
	}
	
	async componentDidMount() {
		fetch(this.apiCallToFetchData)
		.then(response => response.json())
		.then(data => { this.setState({optionsData: data, isLoading : false})})
	}

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  setDropdownDisplayName = (e) => {
	  this.setState({displayName: e.currentTarget.textContent})
  }
  
  toggle = () => {
	  const newValue = !this.state.isDropdownOpen; 
	  this.setState({
		  isDropdownOpen: newValue
		  }); 
  };
  
  handleOptionSelected = (option) => {
	  this.props.onChangeHandler('x');
	  
  }

	render() {
		const {optionsData, isLoading} = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

		const options = optionsData.map(option => {
			return <DropdownItem onClick={() => {this.props.onChangeHandler(this.props.fieldName, option); this.setState({displayName: option.name}) }}><div>{option.name}</div></DropdownItem>
		});

		return <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggle} className="dropdown">
		<DropdownToggle caret>
		{this.state.displayName}
		</DropdownToggle>
		<DropdownMenu 
		modifiers={{
			setMaxHeight: {
				enabled: true,
				order: 890,
				fn: (data) => {
					return {
						...data,
						styles: {
							...data.styles,
							overflow: 'auto',
							maxHeight: 300,
								
						},
					};
				},
			},
		}}
		>
		{options}
		</DropdownMenu>
		</Dropdown>
	}
}