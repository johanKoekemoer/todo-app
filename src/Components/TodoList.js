// Import React + Firebase instance + Firebase functions
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';

// Import Icons for the Todo buttons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

// Functional component: TodoList for listing Todo subjects that have been created
function TodoList() {

  //Declare state variables
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedSubject, setEditedSubject] = useState('');

  // Fetches and listens to updates for the todo items from Firebase database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(updatedTodos);
    });

    return () => unsubscribe();// Cancels the listerner when the component is unmounted
  }, []);

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const markCompleted = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      completed: true,
    });
  };

  const handleEdit = (todo) => {
    if (!todo.completed) {
      setEditTodo(todo);
      setEditedSubject(todo.Subject);
    }
  };

  const handleEditChange = (event) => {
    setEditedSubject(event.target.value);
  };

  const updateSubject = async () => {
    await updateDoc(doc(db, 'todos', editTodo.id), {
      Subject: editedSubject,
    });
  };

  const handleEditDone = () => {
    setEditTodo(null);
    updateSubject();
  };

  // JSX structure for TodoList component
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <div key={todo.id} className={`todo-strip ${todo.completed ? 'completed' : ''}`}>
          {editTodo === todo ? (
            <div>
              <input
                type="text"
                className="edit-input"
                value={editedSubject}
                onChange={handleEditChange}
                autoFocus
              />
              <button id="done-button" onClick={handleEditDone}>
                <DoneIcon />
              </button>
            </div>
          ) : (
            <span>{todo.Subject}</span>
          )}
          {!editTodo && (
            <div>
              {!todo.completed && (
                <button id="complete-button" onClick={() => markCompleted(todo.id)}>
                  <CheckCircleOutlineIcon />
                </button>
              )}
              {!todo.completed && (
              <button onClick={() => handleEdit(todo)}>
                <EditIcon />
              </button>
              )}
              <button id="delete-button" onClick={() => deleteTodo(todo.id)}>
                <DeleteOutlineIcon />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;