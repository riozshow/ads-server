const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const Session = require('../models/Session.model');

module.exports.register = async (req, res) => {
  const { login, password, passwordRep, phone, avatar } = req.body;

  if (password !== passwordRep) {
    return res.status(400).send({ message: 'Passwords must be the same' });
  }

  if (await User.findOne({ login })) {
    return res
      .status(409)
      .send({ message: `Login '${login}' is already taken` });
  }

  await User.create({
    login,
    password: await bcrypt.hash(password, 10),
    phone,
    avatar,
  });

  res
    .status(201)
    .send({ message: `User '${login}' has been successfully created!` });
};

module.exports.login = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user.getSessionData();
    return res.status(200).send({ message: 'Login successfull!' });
  }

  res.status(400).send({ message: `Login or password are incorrect` });
};

module.exports.logout = async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    await Session.deleteMany();
  }
  req.session.destroy();
  res.send({ message: 'Logout successfull!' });
};

module.exports.getUser = (req, res) => {
  res.send({ user: req.session.user });
};
