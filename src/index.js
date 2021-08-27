import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { getUsers } from './actions/users.actions';

//dev tools

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(getUsers());


ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
