import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchTravelData, fetchUserData } from './fetch-data';
import { App, Vote, LoginOrRegister, Travel, User } from './pages';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Travel} fetchData={fetchTravelData} />
      <Route path="users" component={User} fetchData={fetchUserData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  );
};
