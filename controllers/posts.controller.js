const sanitize = require('mongo-sanitize');
const { deleteImage } = require('../uploads/configS3');
const Post = require('../models/Post.model');

module.exports.getAllPosts = (req, res) => {
  const { limit, page } = req.query;
  Post.find()
    .skip(limit * page)
    .limit(limit)
    .sort({ date: -1 })
    .then((post) => res.send(post));
};

module.exports.getPost = (req, res) => {
  const _id = sanitize(req.params.id);
  Post.findOne({ _id })
    .then((post) => res.send(post))
    .catch(() => res.status(404).send({ message: 'Not found' }));
};

module.exports.searchPost = (req, res) => {
  const searchPhrase = sanitize(req.params.searchPhrase);
  const { limit, page } = req.query;

  Post.find({ title: { $regex: new RegExp(searchPhrase, 'gi') } })
    .skip(limit * page)
    .limit(limit)
    .sort({ date: -1 })
    .then((posts) =>
      posts ? res.send(posts) : res.status(404).send({ message: 'Not found' })
    );
};

module.exports.addPost = (req, res) => {
  const { title, content, price, location, image } = req.body;

  Post.create({
    title,
    content,
    price,
    location,
    image,
    date: Date.now(),
    userId: req.session.user._id,
  })
    .then((post) => res.send({ message: 'Post succesfully created!', post }))
    .catch(() =>
      res.status(500).send({ message: 'Something gone wrong. Try again.' })
    );
};

module.exports.editPost = (req, res) => {
  const _id = sanitize(req.params.id);

  Post.findOneAndUpdate(
    { _id, userId: req.session.user._id },
    { $set: { ...req.body } }
  ).then((post) => {
    if (post) {
      if (req.body.image && post.image) deleteImage(post.image);
      return res.send({
        message: 'Post succesfully modified!',
        post: { image: req.body.image },
      });
    }
    return res.status(404).send({ message: 'Not found' });
  });
};

module.exports.deletePost = (req, res) => {
  const _id = sanitize(req.params.id);

  Post.findOneAndDelete({ _id, userId: req.session.user._id }).then((post) => {
    if (post) {
      if (post.image) deleteImage(post.image);
      return res.send({ message: 'Post succesfully deleted!' });
    }
    return res.status(404).send({ message: 'Not found' });
  });
};
