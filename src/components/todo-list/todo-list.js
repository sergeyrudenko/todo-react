import React from 'react';
import TodoListItem from '../todo-list-item'
import './todo-list.css'

const TodoList = ({ todos, onDeleted, onToogleImportant, onToogleDone }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item;
    return (
    <li key={ item.id } className="list-group-item">
      <TodoListItem { ...itemProps } 
      onDeleted={()=>{ onDeleted(id) }}
      onToogleImportant={()=>{ onToogleImportant(id) }}
      onToogleDone={()=>{ onToogleDone(id) }}
      />
    </li>
    );
  });
  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default TodoList;