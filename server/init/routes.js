/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const travelsController = controllers && controllers.travels;

export default (app) => {
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.delete('/sessions', usersController.logout);
    app.post('/signUp', usersController.signUp);
    app.get('/user', usersController.all);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
  }

  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  if (travelsController) {
    app.get('/travel', loggedIn, travelsController.all);
    app.post('/travel', travelsController.add);
    app.put('/travel/:id', travelsController.update);
    app.delete('/travel/:id', travelsController.remove);
  } else {
    console.warn(unsupportedMessage('travels routes'));
  }
};
