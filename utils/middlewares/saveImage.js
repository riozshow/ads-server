const upload = require('../../uploads/configMulter');
const getImageFileType = require('./getImageFileType');
const { uploadImage } = require('../../uploads/configS3');

const FILE_MAX_SIZE = 1024 * 1024;

module.exports = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, async (err) => {
    if (err)
      return res
        .status(500)
        .send({ message: 'Image upload failure. Try again.' });

    if (!req.file) {
      delete req.body[fieldName];
      return next();
    }

    const fileType = await getImageFileType(req.file);

    if (!fileType.includes('image') || FILE_MAX_SIZE < req.file.size) {
      return res.status(400).send({ message: 'Wrong file type' });
    }

    req.body[fieldName] = await uploadImage(req.file.path);

    next();
  });
};
