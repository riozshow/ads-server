const express = require('express');
const controller = require('../controllers/images.controller');

const router = express.Router();

router.get('/:key', controller.getImage);

module.exports = router;
