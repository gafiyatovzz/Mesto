const express = require('express');

const router = express.Router();
const controller = require('../controllers/user');

const { celebrate, Joi } = require('../node_modules/celebrate');


router.get('/:id', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .alphanum(),
    about: Joi.string().required().min(2).max(30)
      .alphanum(),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), controller.getById);

router.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .alphanum(),
    about: Joi.string().required().min(2).max(30)
      .alphanum(),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), controller.getAll);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .alphanum(),
    about: Joi.string().required().min(2).max(30)
      .alphanum(),
  }),
}), controller.updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), controller.updateUserAvatar);

module.exports = router;
