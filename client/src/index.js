import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';

const store = configureStore();

// Stylesheets
import './scss/styles.scss';

ReactDOM.render(
  <Provider onUpdate={() => window.scrollTo(0, 0)} store={store}>
    <BrowserRouter basename="react-movies" >
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'));
