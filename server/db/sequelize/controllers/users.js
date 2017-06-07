import passport from 'passport';
import { Models } from '../models';

const User = Models.User;

export function all(req, res) {
  User.findAll().then((users) => {
    res.json(users);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

export function login(req, res, next) {
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }

    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.sendStatus(200);
    });
  })(req, res, next);
}

export function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

export function signUp(req, res, next) {
  User.findOne({ where: { email: req.body.email } }).then((existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = User.build({
      email: req.body.email,
      password: req.body.password
    });

    return user.save().then(() => {
      req.logIn(user, (err) => {
        if (err) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    });
  }).catch(err =>
    next(err)
  );
}

export default {
  login,
  logout,
  signUp,
  all
};
