const User = require('../models/User.model');

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user.getPublicData()))
    .catch(() => res.status(404).send({ message: 'Not found' }));
};
