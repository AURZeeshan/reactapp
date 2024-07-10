import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px solid #ccc',
      textDecoration: this.props.todo.completed ? 'line-through': 'none'
    }
  };

  render() {
    const { id, title } = this.props.todo;

    return (
        <div style={this.getStyle()}>
          <input type="checkbox" style={chkStyle} onChange={this.props.markComplete.bind(this,id)} /> {''}
          <p>{title}</p>
          <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)} >x</button>
        </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  padding: '5px 10px',
  cursor: 'pointer',
  float: 'right',
  marginTop: '-20px'
}

const chkStyle = {
    float: 'left',
    padding: '10px',
    margin: '5px 10px 0 0',
}
export default TodoItem;