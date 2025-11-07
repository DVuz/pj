const { successResponse, errorResponse } = require('../utils/response');
const  validateImages  = require('../utils/validateImage');
const uploadToCloudinary = require('../utils/uploadToCloudinary');
const CLOUDINARY_FOLDERS = require('../config/folderStucture');

const uploadFile = async (req, res) => {
  try {
    // Sửa: req.file -> req.files
    const validationResult = validateImages(req.files);
    if (!validationResult.valid) {
      return errorResponse(res, {}, 400, validationResult.message);
    }

    let mainImageUrl = '';
    if (req.files['mainImage']) {
      mainImageUrl = await uploadToCloudinary(
        req.files['mainImage'][0].buffer,
        CLOUDINARY_FOLDERS.PRODUCT
      );
    }

    const subImageUrls = [];
    if (req.files['subImages']) {
      for (const file of req.files['subImages']) {
        const url = await uploadToCloudinary(file.buffer, CLOUDINARY_FOLDERS.PRODUCT);
        subImageUrls.push(url);
      }
    }

    return successResponse(res, { mainImageUrl, subImageUrls }, 200, 'Files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
    return errorResponse(res, {}, 500, 'Error uploading files');
  }
};
module.exports = { uploadFile };
