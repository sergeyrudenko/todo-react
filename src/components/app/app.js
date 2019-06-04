import React, { Component } from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form'
import ItemStatusFilter from '../item-status-filter'
import './app.css'



class App extends Component {
  id = 1;

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.id++
    };
  }

  state = {
    todoData: [ 
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filterButtons: [
      { label: 'All', isActive: true, id: 0 },
      { label: 'Active', isActive: false, id: 1, done: false },
      { label: 'Done', isActive: false, id: 2, done: true },
    ],
    activeFilter: 0
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return { todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]};
    });
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      return { todoData: [ ...todoData, newItem ]};
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToogleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'done')};
    });
  }

  onToogleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'important')};
    });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  search = (arr, term) => {
    if (term === '') return arr;
    return arr.filter((el) => {
      return el.label.toLowerCase().indexOf(term.toLowerCase()) !== -1;
    });
  }

  filterStatusChange = (id) => {
    this.setState(({ filterButtons }) => {
      const result = [];
      let activeFilter = 0;
      for (let i = 0; i < filterButtons.length; i++) {
        const isActive = filterButtons[i].id === id;
        if (isActive) activeFilter = filterButtons[i].id;
        result.push({ ...filterButtons[i], isActive });
      }
      return { filterButtons: result, activeFilter };
    });
  }

  filterByStatus = (arr, activeFilter) => {
    if (activeFilter === 0) return arr;
    const doneTerm = activeFilter === 2;
    return arr.filter((el) => el.done === doneTerm);
  }


  render () {
    const { todoData, term, filterButtons, activeFilter } = this.state;
    const temp = this.search(todoData, term);
    let undone = 0;
    const visibleTodos = this.filterByStatus(temp, activeFilter);

    const doneTotos = visibleTodos.filter((el) => {
      if (el.done === true) return true;
      undone++;
      return false;
    });

    return (<div className="app-main">
      <AppHeader active={undone} done={doneTotos.length}/>
      <div className="search-filter-bar">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter 
          filterButtons= {filterButtons} 
          filterStatusChange={this.filterStatusChange}
        />
      </div>

      <TodoList todos={visibleTodos} 
        onDeleted={this.deleteItem} 
        onToogleImportant={this.onToogleImportant} 
        onToogleDone={this.onToogleDone}
      />
      <ItemAddForm addItem={this.addItem}/>
    </div>);
  }
};

export default App;