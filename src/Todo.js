import React, { Component } from 'react';

class Todo extends Component {

  render() {
    const className = this.props.done ? 'done' : 'undone';
    const link = this.props.done ? '元に戻す' : '完了!';
    return(
      <li className={className}>
        <span>{this.props.id}</span>
        <span>:{this.props.title} </span>
        <a href="" onClick={(e) => { e.preventDefault(); this.props.setTodoStatus(this.props)}}>{link}</a>
        <p>{this.props.desc}</p>
      </li>
    );
  }
}

export default Todo