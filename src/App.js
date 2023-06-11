import React from 'react';
import './App.css';
import TodoSubject from './Components/TodoSubject';
import CreateTodo from './Components/Createtodo';
import TodoList from './Components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoSubject /><br/>
        <CreateTodo /><br/>
        <TodoList /><br/>
      </header>
    </div>
  );
}

export default App;
