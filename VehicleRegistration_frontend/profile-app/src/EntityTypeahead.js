/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './Header/Registration.css';

export default class EntityTypeahead extends Component {
	apiCallToFetchData = '';

	constructor(props) {
		super(props);
		this.apiCallToFetchData = props.apiCallToFetchData;
		this.searchHandler = this.searchHandler.bind(this);
		this.onEnterPressed = this.onEnterPressed.bind(this);

            
		this.state = {
			optionsData: [],
			isLoading: true,
			displayName: props.displayName || 'Type ahead',
			searchName: props.searchName,
			multiple: props.multiple || false,
			initialValue: props.initialValue,
			onChangeHandler: props.onChangeHandler,
			selected: []
			// onSearch: props.onSearch
		};
	}

	async componentDidMount() {
		fetch(this.apiCallToFetchData)
			.then(response => response.json())
			.then(data => { this.setState({ optionsData: data, isLoading: false }); })
	}

	findInitialSelectionIndex = (initialValue, options) => {
		var retVal = 0;
		for (var i = 0; i < options.length; i++) {
			if (options[i].id === initialValue.id) {
				retVal = i;
				break;
			}
		}
		return retVal;
	}

	searchHandler() {
		this.props.onSearch(this.state.selected)
	}

	onEnterPressed(e, text){
		if(e.key==="Enter"){
		}
	}

	render() {
		return (
      <div>
        <Typeahead
		  id={this.state.displayName}
          labelKey="name"
          options={this.state.optionsData}
          placeholder={this.state.displayName}
          onChange={this.state.onChangeHandler}
          onInputChange={(text, event) => this.props.onInputChange(text, event)}
          onKeyDown={(text, event) => this.onEnterPressed(text, event)}
        ></Typeahead>

        <div className="button-box">
          <a
            className="btn btn-ghost js--scroll-to-start"
            href="#"
            onClick={this.props.onUserSearch}
>
            {this.props.searchName}
            {/* SEARCH EXPERTS */}
          </a>
        </div>
      </div>
    );
	}
}