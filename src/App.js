import React, { Component } from 'react';
import TodoList from './TodoList';
import Form from './Form'
import './App.css';

class App extends Component {
  constructor() {
    super()
    const todos = []
    this.state = {
      todos: todos,
      countTodoId: 0,
      isLoading: false,
      hasError: false,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const countTodoId = this.state.countTodoId + 1
    let title = e.target.title.value
    if (title=== '') {
      title = "【デフォルト値】reactの勉強"
    }
    let desc = e.target.desc.value
    if (desc === '') {
      desc = "【デフォルト値】todoアプリを作っています"
    }

    this.setState({
      ...this.state,
      todos: this.state.todos.concat({
        id: countTodoId,
        title: title,
        desc: desc,
        done: false,
      }),
      countTodoId: countTodoId
    })

    e.target.title.value = '';
    e.target.desc.value = ''
  }

  setTodoStatus(el) {
    console.log(el)
    const todos = this.state.todos.map(td => {
      if (td.id === el.id) {
        td.done = !td.done
      }
      return td
    })
    this.setState({
      ...this.state,
      todos,
    })
  }

  handleRemove(i) {
    const todos = this.state.todos.filter(res => res.id !== i)
    this.setState({
      ...this.state,
      todos
    })
  }

  fetchData(url) {
    this.setState({ isLoading: true })
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.setState({ isLoading: false })
      return response
    })
    .then((response) => response.json())
    .then((data) => {
      let countTodoId = this.state.countTodoId
      const todos = data.map(data => {
        const todo = Object.assign({}, data, { id: countTodoId++, done: false })
        return todo
      })
      console.log(todos);
      this.setState({
        todos,
        countTodoId: todos.length - 1
      })
    })
    .catch(() => this.setState({ hasError: true }))
  }

  componentDidMount() {
    this.fetchData('data.json');
  }

  render() {
    return (
      <div className="App">
        <h1>todoアプリを作ってみた</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
        <TodoList
          todos={this.state.todos}
          setTodoStatus={this.setTodoStatus.bind(this)}
          handleRemove={this.handleRemove.bind(this)}
          //isLoading={this.state.isLoading}
          //hasError={this.state.hasError}
        />
      </div>
    );
  }
}

export default App;
