import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from './fetch-data';
import { fetchTravelData } from './fetch-travel-data';
import { App, Vote, LoginOrRegister, Travel } from './pages';

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
      <IndexRoute component={Vote} fetchData={fetchVoteData} />
      <Route path="travelBoard" component={Travel} fetchData={fetchTravelData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  );
};
