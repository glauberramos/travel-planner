import _ from 'lodash';
import { Models, sequelize } from '../models';

const Travel = Models.Travel;

export function all(req, res) {
  Travel.findAll({
    where: {
      userId: (req.user && req.user.id) || 9999
    }
  }).then((travels) => {
    res.json(travels);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

export function add(req, res) {
  req.body.userId = req.user.id;
  Travel.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export function remove(req, res) {
  Travel.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
}

export default {
  all,
  add,
  remove
};
