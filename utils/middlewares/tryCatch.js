module.exports = (req, res, next) => {
  try {
    next();
  } catch {
    res
      .status(500)
      .send({ message: 'Something gone wrong. Please try again.' });
  }
};
