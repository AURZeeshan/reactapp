// Usage:
// import * as user from './actions/UsersActions';
// import { fetchUser } from './actions/UsersActions';
// user.fetchUser();
import axios from 'axios';
import {FETCH_USER, FETCH_USERS, ADD_USER, FETCH_USER_FULFILLED, SET_USER_NAME, SET_USER_USERNAME} from '../actions/types';

export const ApiEndpoint = 'https://jsonplaceholder.typicode.com/users';

export const fetchUser =() => dispatcth => {
    // console.log('fetching...');
    axios.get(ApiEndpoint + '/1')
      // .then((res) => res.data)
      .then((res) => {
        // console.log('res: ', res.data);
        return res.data;
      })
      /*.then((users) => dispatcth({
            type: FETCH_USERS_START,
            payload: users
        }))*/
      .then((users) => {
          // console.log('users: ', users, ApiEndpoint);
          let obj = {
            type: FETCH_USER,
            payload: users
          };
          // console.log('dispatch: ',  obj);
          return dispatcth(obj);
          // return dispatcth(obj);
      })
      .catch(error => {
        console.log('error: ', error);
      })

}

export const fetchUsers =() => dispatcth => {
    // console.log('fetching...');
    axios.get(ApiEndpoint + '?_limit=10')
      // .then((res) => res.data)
      .then((res) => {
        // console.log('res: ', res.data);
        return res.data;
      })
      .then((users) => dispatcth({
            type: FETCH_USERS,
            payload: users
        }))
      .catch(error => {
        console.log('error: ', error);
      })
}

export const addUser =(userData) => dispatcth => {
    axios.post(ApiEndpoint, userData)
      // .then((res) => res.data)
      .then((res) => {
        // console.log('res: ', res.data);
        return res.data;
      })
      .then((user) => dispatcth({
            type: ADD_USER,
            payload: user
        }))
      .catch(error => {
        console.log('error: ', error);
      })
}
//
export function fetchUserFulfilled() {
  return {
    type: FETCH_USER_FULFILLED,
    payload: {
        name: 'Tereza',
        age: 35
    }
  }
}

export function setUserName(name) {
  return {
    type: SET_USER_NAME,
    payload: name
  }
}

export function setUserUsername(username) {
  return {
    type: SET_USER_USERNAME,
    payload: username
  }
}
