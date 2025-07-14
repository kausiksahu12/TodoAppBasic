import React, { useState, useEffect } from 'react';
import './Todo.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const [history, setHistory] = useState({});

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('todoHistory')) || {};
    setHistory(storedHistory);
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { text: task, completed: false }]);
      setSuccessMessage('✅ Added successfully!');
      setShowPopup(true);

      const updatedHistory = { ...history };
      if (!updatedHistory[today]) {
        updatedHistory[today] = [];
      }
      updatedHistory[today].push(task);
      localStorage.setItem('todoHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);

      setTask('');

      setTimeout(() => {
        setSuccessMessage('');
        setShowPopup(false);
      }, 3000);
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <div className="background-text">This is your daily task</div>

      {/* Hamburger Menu */}
      <div className="menu-bar" onClick={() => setShowHistoryMenu(!showHistoryMenu)}>
        &#9776;
      </div>

      {/* Side History Menu */}
      {showHistoryMenu && (
        <div className="history-sidebar">
          <h3>🕘 Daily History</h3>
          {Object.keys(history).map((day) => (
            <div key={day}>
              <strong>{day}</strong>
              <ul>
                {history[day].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <h1>WHAT ARE YOU WANT</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {successMessage && <p className="success">{successMessage}</p>}

      {showPopup && (
        <div className="popup">
          🎉 Congratulations! It is added in your history.
          <div className="balloons">
            <div className="balloon red"></div>
            <div className="balloon blue"></div>
            <div className="balloon green"></div>
          </div>
        </div>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {todo.text}
            <div className="buttons">
              <button onClick={() => toggleComplete(index)}>✔</button>
              <button onClick={() => deleteTask(index)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
