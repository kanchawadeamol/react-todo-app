import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("TodoList")) || [];
    setTodos(todoList);
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    localStorage.setItem("TodoList", JSON.stringify(newTodos));
    const todoList = JSON.parse(localStorage.getItem("TodoList")) || [];
    setTodos(todoList);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    let NewTodoUpdated = [];
    const updatedList = JSON.parse(localStorage.getItem("TodoList")) || [];
    NewTodoUpdated = updatedList.map((item) =>
      item.id === todoId ? newValue : item
    );

    localStorage.setItem("TodoList", JSON.stringify(NewTodoUpdated));
    setTodos(NewTodoUpdated);

    // // setTodos((prev) =>
    // //   prev.map((item) => (item.id === todoId ? newValue : item))
    // // );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    localStorage.setItem("TodoList", JSON.stringify(removedArr));
    const removedTodoList = JSON.parse(localStorage.getItem("TodoList")) || [];
    setTodos(removedTodoList);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>TODO APP</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
