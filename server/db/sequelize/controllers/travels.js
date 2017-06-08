import _ from 'lodash';
import { Models, sequelize } from '../models';

const Travel = Models.Travel;
const UserRoles = {
  User: 'user',
  Manager: 'manager',
  Admin: 'admin'
}

export function all(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.User))) {
    let query;

    if (req.user.role === UserRoles.Admin) {
      query = Travel.findAll();
    } else {
      query = Travel.findAll({
        where: {
          userId: (req.user.id) || 9999
        }
      });
    }

    query.then((travels) => {
      res.json(travels);
    }).catch((err) => {
      console.log(err);
      res.status(500).send('Error in first query');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export function add(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.User))) {
    req.body.userId = req.user.id;

    Travel.create(req.body).then(() => {
      res.status(200).send('OK');
    }).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export function update(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.User))) {
    const query = { id: req.params.id, userId: req.user.id };
    const data = req.body;

    Travel.update(data, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export function remove(req, res) {
  if ((req.user !== undefined) && ((req.user.role === UserRoles.Admin) || (req.user.role === UserRoles.User))) {
    Travel.destroy({ where: { id: req.params.id, userId: req.user.id } }).then(() => {
      res.status(200).send('Removed Successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to delete for some reason');
    });
  } else {
    res.status(503).send('Not authorized.');
  }
}

export default {
  all,
  add,
  update,
  remove
};
