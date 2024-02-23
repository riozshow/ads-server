const { v4 } = require('uuid');
const multer = require('multer');

module.exports = multer({
  dest: 'uploads/temp',
  filename: (req, file, next) => next(null, v4()),
});
