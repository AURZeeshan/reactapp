// combineReducers - multiple reducers
import {  combineReducers } from 'redux';
import userReducer from './userReducer';

export default combineReducers({
  users:userReducer,
});
/*
import users from './usersReducer';
export default combineReducers(
  users,
)
*/
