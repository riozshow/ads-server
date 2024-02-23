const express = require('express');
const requireLogin = require('../utils/middlewares/requireLogin');
const requireBody = require('../utils/middlewares/requireBody');
const saveImage = require('../utils/middlewares/saveImage');
const {
  getAllAds,
  getAd,
  searchAd,
  addAd,
  editAd,
  deleteAd,
} = require('../controllers/ads.controller');

const router = express.Router();

const BODY = {
  AD: ['title', 'content', 'price', 'location'],
};

router.get('/', getAllAds);
router.get('/:id', getAd);
router.get('/search/:searchPhrase', searchAd);
router.post('/', requireLogin, saveImage, requireBody(BODY.AD), addAd);
router.patch('/:id', requireLogin, saveImage, requireBody(), editAd);
router.delete('/:id', requireLogin, deleteAd);

module.exports = router;
