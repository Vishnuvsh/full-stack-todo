import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";   // 👈 CSS ഇമ്പോർട്ട്

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect (() =>{
    fetchTodos();
  }, []);

  const fetchTodos = async() =>{
    const res = await axios.get("http://127.0.0.1:8000/api/todo_app/");
    setTodos(res.data);
  }

  const AddTodo = async() =>{
    if(!title) return;
    await axios.post("http://127.0.0.1:8000/api/todo_app/", { title, completed: false });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async(todo)=> {
    await axios.put(`http://127.0.0.1:8000/api/todo_app/${todo.id}/`, {
      ...todo,
      completed: !todo.completed
    });
    fetchTodos();
  };

  const deleteTodo = async(id) =>{
    await axios.delete(`http://127.0.0.1:8000/api/todo_app/${id}/`);
    fetchTodos();
  }

  return (
    <div className="app-container">
      <h1 className="title">To-Do List</h1>

      <div className="input-area">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Add New Task"
          className="todo-input"
        />
        <button className="add-btn" onClick={AddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo =>(
          <li key={todo.id} className="todo-item">
            <span className={todo.completed ? "completed" : ""}>
              {todo.title}
            </span>

            <div className="actions">
              <button className="toggle-btn" onClick={() => toggleTodo(todo)}>
                Toggle
              </button>

              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
