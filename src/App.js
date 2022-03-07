import { useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputHandler = (e) => {
    setTodo(e.target.value);
  };
  const addTodo = () => {
    const newTodo = { id: uuidv4(), info: todo, complete: false };
    setTodoList((todoList) => [...todoList, newTodo]);
    setTodo("");
  };

  const clearAllTodo = () => {
    setTodoList([]);
  };
  const TodoItem = ({ item }) => {
    function strikeText(id) {
      const newTodoList = todoList.map((item) => {
        return item.id === id ? { ...item, complete: !item.complete } : item;
      });
      setTodoList(newTodoList);
    }
    function deleteTodo(id) {
      const newTodoList1 = todoList.filter((item) => item.id !== id);
      setTodoList(newTodoList1);
    }
    return (
      <div className="todo">
        <div
          key={item.id}
          style={{ textDecoration: item.complete ? "line-through" : "none" }}
          onClick={() => strikeText(item.id)}
        >
          {item.info}
        </div>
        <button className="delete" onClick={() => deleteTodo(item.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  };
  return (
    <div className="App">
      <input type="text" onChange={inputHandler} value={todo} />
      <button onClick={addTodo}>Add</button>
      <button onClick={clearAllTodo}>Clear All</button>
      <div className="tasks">
        {todoList.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
