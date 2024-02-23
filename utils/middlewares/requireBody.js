const regexes = {
  login: /(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/,
  password: /.{8}$/,
};

const filters = {
  title: (val) =>
    typeof val === 'string' && val.length >= 10 && val.length <= 50,
  image: (val) =>
    typeof val === 'string' && val.length >= 10 && val.length <= 50,
  content: (val) =>
    typeof val === 'string' && val.length >= 20 && val.length <= 1000,
  price: (val) => typeof parseInt(val) === 'number',
  location: (val) =>
    typeof val === 'string' && val.length >= 5 && val.length <= 100,
  phone: (val) =>
    typeof val === 'string' && val.length >= 6 && val.length <= 16,
};

const test = (key, value) => {
  if (regexes[key]) {
    return new RegExp(regexes[key]).test(value);
  }
  if (filters[key]) {
    return filters[key](value);
  }
};

module.exports = (requiredKeys = []) => {
  return (req, res, next) => {
    const wrong = [];

    for (const required of requiredKeys) {
      if (!req.body[required]) {
        wrong.push(required);
      }
    }

    for (const key in req.body) {
      const value = req.body[key];
      if (test(key, value)) continue;
      else if (!wrong.includes(key)) wrong.push(key);
    }

    return wrong.length === 0
      ? next()
      : res.status(400).send({ message: `Wrong payload: ${wrong.join(', ')}` });
  };
};
