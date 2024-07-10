import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addUser} from '../../store/actions/userActions';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      address: {},
      company: {},
      email: '',
      phone: '',
      website: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Use dynamic names for inputs
  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email
    }
    this.props.addUser(obj);
    this.setState({name: '', username: '', email: ''});
  };
  render() {
    return (
        <form style={{ display:'flex' }} onSubmit={this.onSubmit}>
          <input type="text" name="name" placeholder="Name"  style={{flex:'10', padding: '10px'}} value={this.state.name} onChange={this.onChange} />
          <input type="text" name="username" placeholder="Username"  style={{flex:'10', padding: '10px'}} value={this.state.username} onChange={this.onChange} />
          <input type="text" name="email" placeholder="Email"  style={{flex:'10', padding: '10px'}} value={this.state.email} onChange={this.onChange} />
          <input type="submit" value="Submit" className="btn" style={{flex:'1'}} />
        </form>
    );
  }
}

// PropTypes
CreateUser.propTypes = {
  addUser: PropTypes.func.isRequired
}

export default connect(null, {addUser})(CreateUser);
// export default AddUser;