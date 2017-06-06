import _ from 'lodash';
import { Models, sequelize } from '../models';

const Travel = Models.Travel;

export function all(req, res) {
  Travel.findAll().then((travels) => {
    res.json(travels);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

export function add(req, res) {
  Travel.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export default {
  all,
  add
};
