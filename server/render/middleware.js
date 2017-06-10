/* eslint no-param-reassign: 0, dot-notation: 0*/
import { createMemoryHistory, match } from 'react-router';
import axios from 'axios';
import createRoutes from '../../app/routes';
import configureStore from '../../app/utils/configureStore';
import * as types from '../../app/utils/types';
import pageRenderer from './pageRenderer';
import fetchDataForRoute from '../../app/utils/fetchDataForRoute';

export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const userRole = req.user ? req.user.role : '';

  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true,
      userRole
    }
  }, history);

  const routes = createRoutes(store);

  const ssrAuth = (cookie) => {
    if (arguments.length === 0) {
      axios.interceptors.request.handlers = [];
    } else {
      axios.interceptors.request.use((config) => {
        config.headers['cookie'] = cookie;
      }, (error) => {
        return Promise.reject(error);
      });
    }
  };

  if (authenticated) {
    ssrAuth(req.headers.cookie);
  }

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      store.dispatch({ type: types.CREATE_REQUEST });
      fetchDataForRoute(props)
        .then(() => {
           if (authenticated) ssrAuth();
        })
        .then((data) => {
          store.dispatch({ type: types.REQUEST_SUCCESS, data });
          const html = pageRenderer(store, props);
          res.status(200).send(html);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json(error);
        });
    } else {
      res.sendStatus(404);
    }
  });
}
