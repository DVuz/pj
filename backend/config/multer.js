const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    files: 4,
  },
  fileFilter: (req, file, cb) => {
    // Cho phép hình ảnh
    const imageTypes = /^image\/(jpg|jpeg|png|gif|bmp|webp|svg)$/;
    // Cho phép video
    const videoTypes = /^video\/(mp4|avi|mov|wmv|flv|webm)$/;
    // Cho phép audio
    const audioTypes = /^audio\/(mp3|wav|ogg|aac|flac)$/;
    // Cho phép documents
    const docTypes =
      /^application\/(pdf|msword|vnd\.ms-excel|vnd\.ms-powerpoint|vnd\.openxmlformats)$/;
    // Cho phép text
    const textTypes = /^text\/(plain|csv)$/;

    if (
      file.mimetype.match(imageTypes) ||
      file.mimetype.match(videoTypes) ||
      file.mimetype.match(audioTypes) ||
      file.mimetype.match(docTypes) ||
      file.mimetype.match(textTypes)
    ) {
      cb(null, true);
    } else {
      return cb(new Error('Loại file không được hỗ trợ'));
    }
  },
});

module.exports = upload;
