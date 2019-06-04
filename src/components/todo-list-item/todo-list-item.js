import React from 'react';
import './todo-list-item.css';

const TodoListItem = (props) => {
  const { 
    label, onDeleted, onToogleImportant, onToogleDone, done, important,
  } = props;

  let classNames = 'todo-list-item';
  if (done) classNames += ' done';
  if (important) classNames += ' important';

  return(
    <div className={classNames}>
      <span onClick={ onToogleDone }>{label}</span>

    <button type="button" 
      className="btn btn-outline-success btn-sm float-right"
      onClick={onToogleImportant}>
      <i className="fa fa-exclamation" ></i> 
    </button>
    
    <button type="button" 
      className="btn btn-outline-danger btn-sm float-right"
      onClick={onDeleted}>
      <i className="fa fa-trash-o"></i>
    </button>

    </div>
  );
}

export default TodoListItem;