import {FETCH_USERS_START, RECEIVE_USERS, FETCH_USERS_ERROR, ADD_USER, FETCH_USER, FETCH_USERS} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  user: {
    name: 'Tereza',
    username: 'tesi'
  },
  error: null
};

export default function reducer (state=initialState, action) {
  // console.log('reducer type: ', action.type, action.payload);
  switch(action.type) {
    case ADD_USER: {
      return {
        ...state,
        fetching: true,
        user: action.payload
      };
    }
    case FETCH_USER: {
      return {
        ...state,
        fetching: true,
        user: action.payload
      };
    }
    case FETCH_USERS: {
      return {
        ...state,
        fetching: true,
        users: action.payload
      };
    }
    case FETCH_USERS_START: {
      // console.log('reducer', action.payload);
      return {
        ...state,
        fetching: true,
        users: action.payload
      };
    }
    case RECEIVE_USERS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    case FETCH_USERS_ERROR :{
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    default:
     // console.log('state: ', state);
     return { state } // { ...state }
  }
}