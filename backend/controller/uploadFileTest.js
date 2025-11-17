const { successResponse, errorResponse } = require('../utils/response');
const  validateImages  = require('../utils/validateImage');
const uploadToCloudinary = require('../utils/cloudinary/uploadToCloudinary');
const CLOUDINARY_FOLDERS = require('../config/folderStucture');

const uploadFile = async (req, res) => {
  try {
    // Sửa: req.file -> req.files
    const validationResult = validateImages(req.files);
    if (!validationResult.valid) {
      return errorResponse(res, {}, 400, validationResult.message);
    }

    let mainImageUrl = '';


    return successResponse(res, { mainImageUrl, subImageUrls }, 200, 'Files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
    return errorResponse(res, {}, 500, 'Error uploading files');
  }
};
module.exports = { uploadFile };
