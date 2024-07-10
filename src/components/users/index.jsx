import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserForm from './Form';
import { fetchUser, fetchUsers } from '../../store/actions/userActions';

class Users extends Component {
  componentWillMount() {
    // console.log('mount user: ', this.props.fetchUser());
    this.props.fetchUser();
    this.props.fetchUsers();
  }
  render() {
    let userItems = '';
    let userItem = '';
    const {user, users} = this.props;
    // console.log('props: ', this.props.users, 'user: ', user, 'users:', users);
    if(users !== undefined) {
      userItems = users.map(user => (
          <div key={user.id}>
            <h3>More users {user.name}</h3>
            <p>{user.username}</p>
          </div>
        ));
    }

    if(user !== undefined) {
      userItem = <div><h3>One user {user.name}</h3><p>{user.username}</p></div>
    }
    // const title = <React.Fragment><h1>Users</h1><p>This is users page</p></React.Fragment>
    // console.log('props: ', this.props.todos);
    return (
      <div>
        <h1>Users</h1><p>This is users page</p>
        <UserForm />
        {userItem}
        {userItems}
      </div>
    )
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  // users: PropTypes.array.isRequired,
}

// get new items from the state
// and map them into properties
const mapStateToProps = (store, ownProps) => {
  // ... computed data from state and optionally ownProps
  // console.log('mapping: ', store.users, ownProps);
  return ({
    // users: action.payload in reducers
    //users are set in reducers for fetchUsers, user for fetchUser
    user: store.users.user,
    users: store.users.users,
  })
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  fetchUser,
  fetchUsers,
}
// null - replace with map state properties
// export default connect(null, {fetchUser})(Users);
// export default connect(mapStateToProps, {fetchUser, fetchUsers})(Users);
export default connect(mapStateToProps, mapDispatchToProps)(Users);