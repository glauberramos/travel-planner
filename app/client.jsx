import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import * as types from './utils/types';
import configureStore from './utils/configureStore';
import fetchDataForRoute from './utils/fetchDataForRoute';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  // if (window.__INITIAL_STATE__ !== null) {
  //   window.__INITIAL_STATE__ = null;
  //   return;
  // }

  store.dispatch({ type: types.CREATE_REQUEST });
  fetchDataForRoute(this.state)
    .then((data) => {
      return store.dispatch({ type: types.REQUEST_SUCCESS, data });
    });
}

render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
