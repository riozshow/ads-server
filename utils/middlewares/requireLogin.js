const Session = require('../../models/Session.model');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return Session.findOne({}).then((session) => {
      if (session) {
        req.session.user = JSON.parse(session.session).user;
        return next();
      }
      res.status(401).send({ message: 'You must be logged in' });
    });
  }

  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ message: 'You must be logged in' });
  }
};
