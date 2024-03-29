import passport from 'passport';
import { Models } from '../models';

const User = Models.User;
const UserRoles = {
  User: 'user',
  Manager: 'manager',
  Admin: 'admin'
};

export function all(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.Manager))) {
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
  passport.authenticate('local', (authErr, user) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }

    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.status(200).send({userRole: user.role });
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
      role: UserRoles.User
    });

    return user.save().then(() => {
      req.logIn(user, (err) => {
        if (err) return res.sendStatus(401);
        return res.status(200).send({userRole: user.role });
      });
    });
  }).catch(err =>
    next(err)
  );
}

export function add(req, res, next) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.Manager))) {
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
        res.status(201).send('Added successfully');
      });
    }).catch(err =>
      next(err)
    );
  } else {
    res.status(503).send('Not authorized.');
  }
}

export function remove(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.Manager))) {
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
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.Manager))) {
    const query = { id: req.params.id };
    const data = req.body;

    User.findOne({ where: query}).then((existingUser) => {
      if (existingUser) {
        existingUser.updateAttributes(data)
        .then(() => {
          res.status(200).send('Updated successfully');
        }).catch((err) => {
          console.log(err);
          res.status(500).send('We failed to save for some reason');
        });
      } else {
        res.status(404).send('Couldn\'t find user');
      }
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export default {
  login,
  logout,
  signUp,
  add,
  all,
  remove,
  update
};
