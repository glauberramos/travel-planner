/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const travelsController = controllers && controllers.travels;

export default (app) => {
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.delete('/sessions', usersController.logout);
    app.post('/signUp', usersController.signUp);
    app.post('/user', usersController.add);
    app.get('/user', usersController.all);
    app.delete('/user/:id', usersController.remove);
    app.put('/user/:id', usersController.update);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (travelsController) {
    app.get('/travel', travelsController.all);
    app.post('/travel', travelsController.add);
    app.put('/travel/:id', travelsController.update);
    app.delete('/travel/:id', travelsController.remove);
  } else {
    console.warn(unsupportedMessage('travels routes'));
  }
};
