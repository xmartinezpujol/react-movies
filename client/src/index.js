import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './components/App';


const store = configureStore();

// Stylesheets
import './scss/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={'react-movies'} >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'));
