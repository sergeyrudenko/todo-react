import React, { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
  state = {
    searchString: ''
  };
  onChange = (e) => {
    const { onSearchChange } = this.props;
    onSearchChange(e.target.value);
  }

  render () {
    return (
      <input 
        placeholder="type to search" 
        className="search-input form-control"
        onChange={this.onChange}
      />
    );
  }

};

export default SearchPanel;