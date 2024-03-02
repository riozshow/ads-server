const express = require('express');
const requireLogin = require('../utils/middlewares/requireLogin');
const requireBody = require('../utils/middlewares/requireBody');
const saveImage = require('../utils/middlewares/saveImage');
const {
  getAllPosts,
  getPost,
  searchPost,
  addPost,
  editPost,
  deletePost,
} = require('../controllers/posts.controller');
const requireQuery = require('../utils/middlewares/requireQuery');

const router = express.Router();

const BODY = {
  POST: ['title', 'content', 'price', 'location'],
};

const QUERY = {
  GET_POSTS: ['page', 'limit'],
};

router.get('/', requireQuery(QUERY.GET_POSTS), getAllPosts);
router.get('/:id', getPost);
router.get('/search/:searchPhrase', requireQuery(QUERY.GET_POSTS), searchPost);
router.post(
  '/',
  requireLogin,
  saveImage('image'),
  requireBody(BODY.POST),
  addPost
);
router.patch('/:id', requireLogin, saveImage('image'), requireBody(), editPost);
router.delete('/:id', requireLogin, deletePost);

module.exports = router;
