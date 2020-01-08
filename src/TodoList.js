import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {

  render() {
    if (this.props.isLoading) {
      return <h2>Loading ...</h2>;
    }

    if (this.props.hasError) {
      return <h2>error</h2>;
    }
    const todos = this.props.todos.map(todo =>
      <Todo
        key={todo.id}
        setTodoStatus={this.props.setTodoStatus}
        handleRemove={this.props.handleRemove}
        {...todo}
      />
    )

    return(
      <ul>
        {todos}
      </ul>
    );
  }
}

export default TodoList