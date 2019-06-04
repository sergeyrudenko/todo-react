import React, { Component } from 'react';
import './item-status-filter.css';

class ItemStatusFilter extends Component {
  render (){ 
    const { filterButtons, filterStatusChange } = this.props;
    return (
      <div className="btn-group">
        {filterButtons.map((el) => {
          const { label, isActive, id } = el;
          let className = "btn";
          className += isActive ? " btn-info" : " btn-outline-secondary";
          return (
          <button type="button" key={id}
            className={className}
            onClick={() => { filterStatusChange(id) }}
            >
            {label}
          </button>);
        })}
        {/* <button type="button" 
          className="btn btn-info"
           >All</button>
        <button type="button" 
          className="btn btn-outline-secondary" >Active</button>
        <button type="button" 
          className="btn btn-outline-secondary" >Done</button> */}
      </div>
    );
  }
};

export default ItemStatusFilter;