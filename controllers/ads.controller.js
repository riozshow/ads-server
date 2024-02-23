const sanitize = require('mongo-sanitize');
const { deleteImage } = require('../uploads/configS3');
const Ad = require('../models/Ad.model');

module.exports.getAllAds = (req, res) => {
  Ad.find({})
    .sort({ date: -1 })
    .then((ad) => res.send(ad));
};

module.exports.getAd = (req, res) => {
  const _id = sanitize(req.params.id);
  Ad.findOne({ _id })
    .then((ad) => res.send(ad))
    .catch(() => res.status(404).send({ message: 'Not found' }));
};

module.exports.searchAd = (req, res) => {
  const searchPhrase = req.params.searchPhrase;
  Ad.findOne({ title: { $regex: new RegExp(searchPhrase, 'g') } }).then((ad) =>
    ad ? res.send(ad) : res.status(404).send({ message: 'Not found' })
  );
};

module.exports.addAd = (req, res) => {
  const { title, content, price, location, image } = req.body;

  Ad.create({
    title,
    content,
    price,
    location,
    image,
    date: Date.now(),
    userId: req.session.user._id,
  })
    .then(() => res.send({ message: 'Ad succesfully created!' }))
    .catch(() =>
      res.status(500).send({ message: 'Something gone wrong. Try again.' })
    );
};

module.exports.editAd = (req, res) => {
  const _id = sanitize(req.params.id);

  Ad.findOneAndUpdate(
    { _id, userId: req.session.user._id },
    { $set: { ...req.body } }
  ).then((ad) => {
    if (ad) {
      if (ad.image) deleteImage(ad.image);
      return res.send({ message: 'Ad succesfully modified!' });
    }
    return res.status(404).send({ message: 'Not found' });
  });
};

module.exports.deleteAd = (req, res) => {
  const _id = sanitize(req.params.id);

  Ad.findOneAndDelete({ _id, userId: req.session.user._id }).then((ad) => {
    if (ad) {
      if (ad.image) deleteImage(ad.image);
      return res.send({ message: 'Ad succesfully deleted!' });
    }
    return res.status(404).send({ message: 'Not found' });
  });
};
