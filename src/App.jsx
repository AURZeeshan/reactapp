import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import PropTypes from 'prop-types';
import axios from 'axios';
import './App.css';
import Todos from './components/todos/Index';
import AddTodo from './components/todos/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Users from './components/users/';

class App extends Component {

  state = {
    todos: [],
    apiEndpoint: 'https://jsonplaceholder.typicode.com/todos',
    limitTodos: '?_limit=10'
  }

  componentDidMount() {
    axios.get(this.state.apiEndpoint + this.state.limitTodos)
      .then(res => console.log(this.setState({todos: res.data})))
      .catch(error => console.log('error: ', error));
  }

  markComplete = (id) => {
    console.log('markComplete: ', id);
    this.setState({ todos: this.state.todos.map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  delTodo = (id) => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    axios.delete(this.state.apiEndpoint + '/' + id)
      .then((res) => {
        this.setState({ todos: [...this.state.todos.filter((todo) => todo.id !== id)] });
      })
      .catch((error) => console.log('Error: ', error));
  }

  addTodo = (title) => {
    axios.post(this.state.apiEndpoint, {title: title, completed: false})
      .then((res) => {
        this.setState({ todos: [...this.state.todos, res.data] });
      })
      .catch((error) => console.log('Error: ', error));
  }

  render() {
    // console.log('todos: ', this.state.todos);
    return (
      <Router>
      {/*{userItem}
      {userItems} */}
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
            </React.Fragment>
          )} />

          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />

        </div>
      </div>
      </Router>
    );
  }
}

export default App;
