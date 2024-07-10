// composer for multiple enhancer
import { applyMiddleware, createStore, compose } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Middlewares
// const middleware = applyMiddleware(thunk);
// const middleware = applyMiddleware(logger, thunk);
// export default createStore(reducer, middleware);
const middleware = [thunk];
const initialState = {}; // []

/*const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)*/

// Implement redux chrome extension
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

// Adds a change listener. It will be called any time an action is dispatched
/*store.subscribe(() => {
  console.log('store changed: ', store.getState());
})
// Trigger a state change
store.dispatch({type: "FOO"})*/
export default store;