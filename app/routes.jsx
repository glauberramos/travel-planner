import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchTravelData, fetchUserData } from './fetch-data';
import AppPage from './components/app/AppPage';
import UserPage from './components/user/UserPage';
import TravelPage from './components/travel/TravelPage';
import LoginOrRegisterPage from './components/auth/LoginOrRegisterPage';

export default (store) => {
  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const redirectLogin = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login'
      });
    }

    callback();
  };

  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={TravelPage} fetchData={fetchTravelData} onEnter={redirectLogin} />
      <Route path="trips" component={TravelPage} fetchData={fetchTravelData} onEnter={redirectLogin} />
      <Route path="users" component={UserPage} fetchData={fetchUserData} onEnter={redirectLogin} />
      <Route path="login" component={LoginOrRegisterPage} onEnter={redirectAuth} />
    </Route>
  );
};
