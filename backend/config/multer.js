const multer = require('multer');
const { errorResponse } = require('../utils/response');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const imageTypes = /^image\/(jpg|jpeg|png|gif|bmp|webp|svg)$/;
  const videoTypes = /^video\/(mp4|avi|mov|wmv|flv|webm)$/;
  const audioTypes = /^audio\/(mp3|wav|ogg|aac|flac)$/;
  const docTypes =
    /^application\/(pdf|msword|vnd\.ms-excel|vnd\.ms-powerpoint|vnd\.openxmlformats)$/;
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
    cb(new Error('Loại file không được hỗ trợ'));
  }
};

const multerInstance = multer({
  storage,
  fileFilter,
});

// Wrap multer.fields() với error handling
const upload = {
  fields: fields => {
    return (req, res, next) => {
      multerInstance.fields(fields)(req, res, err => {
        if (err instanceof multer.MulterError) {
          // Lỗi từ multer
          if (err.code === 'LIMIT_FILE_COUNT') {
            return errorResponse(res, {}, 400, 'Số lượng file vượt quá giới hạn');
          }
          if (err.code === 'LIMIT_FILE_SIZE') {
            return errorResponse(res, {}, 400, 'Kích thước file vượt quá giới hạn');
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return errorResponse(res, {}, 400, 'Tên trường file không đúng');
          }
          return errorResponse(res, {}, 400, `Lỗi upload: ${err.message}`);
        } else if (err) {
          return errorResponse(res, {}, 400, err.message);
        }
        next();
      });
    };
  },
  array: (fieldName, maxCount) => {
    return (req, res, next) => {
      multerInstance.array(fieldName, maxCount)(req, res, err => {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_COUNT') {
            return errorResponse(res, {}, 400, `Số lượng file vượt quá ${maxCount} file`);
          }
          if (err.code === 'LIMIT_FILE_SIZE') {
            return errorResponse(res, {}, 400, 'Kích thước file vượt quá giới hạn');
          }
          return errorResponse(res, {}, 400, `Lỗi upload: ${err.message}`);
        } else if (err) {
          return errorResponse(res, {}, 400, err.message);
        }
        next();
      });
    };
  },
};

module.exports = upload;
