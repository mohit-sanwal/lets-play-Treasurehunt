import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

require('./index.html');

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

import createHistory from 'history/createBrowserHistory'

import { Router, Route, browserHistory,hashHistory,IndexRoute } from 'react-router'

import { syncHistoryWithStore ,routerReducer, routerMiddleware} from 'react-router-redux'


const middleware = routerMiddleware(history)




const store = createStore(reducer,
  compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));




const container = document.querySelector('#app-container');


ReactDOM.render(
  <AppContainer>
   <App/>
  </AppContainer>
  , container
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>
      , container
    );
  });
}
