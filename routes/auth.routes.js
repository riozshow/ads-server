const express = require('express');
const controller = require('../controllers/auth.controller');
const tryCatch = require('../utils/middlewares/tryCatch');
const requireBody = require('../utils/middlewares/requireBody');
const requireLogin = require('../utils/middlewares/requireLogin');
const saveImage = require('../utils/middlewares/saveImage');

const router = express.Router();

const BODY = {
  LOGIN: ['login', 'password'],
  REGISTER: ['login', 'password', 'phone'],
};

router.get('/user', tryCatch, controller.getUser);
router.post(
  '/register',
  tryCatch,
  saveImage,
  requireBody(BODY.REGISTER),
  controller.register
);
router.post('/login', tryCatch, requireBody(BODY.LOGIN), controller.login);
router.delete('/logout', tryCatch, requireLogin, controller.logout);

module.exports = router;
