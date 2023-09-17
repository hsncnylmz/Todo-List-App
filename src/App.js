import './App.css';
import React, { useState, useEffect } from 'react'
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //? Bu belirtmiş olduğumuz tanımlamalar bizim input'a yazdıklarımızı tutmaya yarıyor
  const [inputText, setInputText] = useState("");
  //? Burada ise bu değişkene todo listemizin içeriği geliyor ve buradaki bilgiler her eklemede değişkenimizi tutmamıza yarıyor
  const [todos, setTodos] = useState([]);
  //? select listin çalışması için statüleri belirticez
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    filterHandler(todos);
    saveLocalTodos();
  }, [todos, status]) //eslint-disable-line

  //* Select kutusuna bastığında yapılacak işlemler
  const filterHandler = () => {
    switch (status) {
      case "completed":
        //? todos içinde eğer todo completed ise yani true döndürüyorsa filter içinde select te completed içinde olacak yani tamamlanmış görevler içinde
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //! localstorage ile todo listimizi kaydediyoruz ve sayfa yenilense dahi local de kayıtlı kalacak
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    } 
    else 
    {
      setTodos(JSON.parse(localStorage.getItem("todos")))
    }
  }

  return (
    <div className="App">
      <header>
        <h1>TODO LİSTESİ</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        //? todos ve TodoList i props olarak göndermek için
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;