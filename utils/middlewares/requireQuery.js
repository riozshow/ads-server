const filters = {
  limit: (val) => parseInt(val) <= 5,
  page: (val) => !isNaN(parseInt(val)),
};

module.exports = (query = []) => {
  return (req, res, next) => {
    const missed = query.filter((param) => !req.query[param]);
    if (missed.length) {
      return res
        .status(400)
        .send({ message: `Missed query params: ${missed.join(', ')}` });
    }

    const wrong = [];
    for (const key in req.query) {
      if (!filters[key](req.query[key])) {
        wrong.push(key);
      }
    }

    if (wrong.length) {
      return res
        .status(400)
        .send({ message: `Wrong query params: ${wrong.join(', ')}` });
    }

    next();
  };
};
