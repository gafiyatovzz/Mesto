const router = require('express').Router();

const controller = require('../controllers/card');
const { celebrate, Joi } = require('../node_modules/celebrate');

// eslint-disable-next-line
const regx = /http[s]?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(\w+\.[a-zA-Z]{2,6}))(:\d{2,5})?(\/[a-zA-Z0-9\/]*)?#?/i;

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regx),
    owner: Joi.string().required(),
  }),
}), controller.createCard);

router.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regx),
    owner: Joi.string().required(),
    likes: Joi.string().default([]),
    createdAt: Joi.date().default(Date.now),
  }),
}), controller.getCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), controller.deleteCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), controller.disLike);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), controller.addLike);


module.exports = router;
