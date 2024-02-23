const { getImage } = require('../uploads/configS3');

module.exports.getImage = async (req, res) => {
  getImage(req.params.key)
    .then((image) => image.Body.pipe(res))
    .catch(() => res.status(404).send({ message: 'Not found' }));
};
