import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: true },
        { id: 3, text: 'Deploy to Netlify', completed: false },
    ]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.todoInput;
                addTodo(input.value);
                input.value = '';
            }}>
                <input type="text" name="todoInput" placeholder="Add a new todo" />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
