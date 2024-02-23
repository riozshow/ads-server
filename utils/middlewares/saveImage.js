const upload = require('../../uploads/configMulter').single('image');
const getImageFileType = require('./getImageFileType');
const { uploadImage } = require('../../uploads/configS3');

const FILE_MAX_SIZE = 1024 * 1024;

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(500)
        .send({ message: 'Image upload failure. Try again.' });

    if (!req.file) return next();

    const fileType = await getImageFileType(req.file);

    if (!fileType.includes('image') || FILE_MAX_SIZE < req.file.size) {
      return res.status(400).send({ message: 'Wrong file type' });
    }

    req.body.image = await uploadImage(req.file.path);

    next();
  });
};
