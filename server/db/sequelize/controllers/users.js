import passport from 'passport';
import { Models } from '../models';

const User = Models.User;
const UserRoles = {
  User: 'user',
  Manager: 'manager',
  Admin: 'admin'
}

export function all(req, res) {
  if (req.user && (req.user.role === UserRoles.Admin)) {
    User.findAll().then((users) => {
      res.json(users);
    }).catch((err) => {
      console.log(err);
      res.status(500).send('Error in first query');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
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
      password: req.body.password,
      role: req.body.role
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

export function remove(req, res) {
  if (req.user && (req.user.role === UserRoles.Admin)) {
    User.destroy({ where: { id: req.params.id } }).then(() => {
      res.status(200).send('Removed Successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to delete for some reason');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export function update(req, res) {
  if (req.user && (req.user.role === UserRoles.Admin)) {
    const query = { id: req.params.id };
    const data = req.body;

    User.update(data, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export default {
  login,
  logout,
  signUp,
  all,
  remove,
  update
};
