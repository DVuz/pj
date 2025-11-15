const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const validateImages = require('../../utils/validateImage');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/cloudinary/deleteFromCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const updateProduct = async (req, res) => {
  let newMainImageUrl = '';
  let newSubImageUrls = [];
  let deletedImages = [];

  try {
    const { product_id } = req.params;
    const validateImageResult = validateImages(req.files);

    if (!validateImageResult.valid) {
      return errorResponse(res, {}, 400, validateImageResult.message);
    }

    const snakeBody = camelObjToSnakeObj(req.body);

    // Kiểm tra product có tồn tại không
    const checkProductQuery = 'SELECT * FROM products WHERE product_id = ?';
    const [productRows] = await db.query(checkProductQuery, [product_id]);

    if (productRows.length === 0) {
      return errorResponse(res, {}, 404, 'Sản phẩm không tồn tại');
    }

    const currentProduct = productRows[0];

    // Kiểm tra product_code trùng (nếu thay đổi)
    if (snakeBody.product_code && snakeBody.product_code !== currentProduct.product_code) {
      const checkCodeQuery = 'SELECT * FROM products WHERE product_code = ? AND product_id != ?';
      const [codeRows] = await db.query(checkCodeQuery, [snakeBody.product_code, product_id]);

      if (codeRows.length > 0) {
        return errorResponse(res, {}, 400, 'Mã sản phẩm đã tồn tại');
      }
    }

    // Kiểm tra product_type_id
    if (snakeBody.product_type_id) {
      const checkTypeQuery = 'SELECT * FROM producttypes WHERE product_type_id = ?';
      const [typeRows] = await db.query(checkTypeQuery, [snakeBody.product_type_id]);

      if (typeRows.length === 0) {
        return errorResponse(res, {}, 400, 'Loại sản phẩm không tồn tại');
      }
    }

    // Xử lý main image
    let mainImageToUpdate = currentProduct.main_image;

    if (req.body.remove_main_image === 'true') {
      // Xóa main image cũ
      if (currentProduct.main_image) {
        deletedImages.push(currentProduct.main_image);
      }
      mainImageToUpdate = null;
    } else if (req.files && req.files['main_image']) {
      // Upload main image mới
      newMainImageUrl = await uploadToCloudinary(
        req.files['main_image'][0].buffer,
        CLOUDINARY_FOLDERS.PRODUCT
      );

      // Xóa main image cũ
      if (currentProduct.main_image) {
        deletedImages.push(currentProduct.main_image);
      }

      mainImageToUpdate = newMainImageUrl;
    }

    // Xử lý sub images
    let currentSubImages = [];
    try {
      if (currentProduct.sub_image && typeof currentProduct.sub_image === 'string') {
        currentSubImages = JSON.parse(currentProduct.sub_image);
      } else if (Array.isArray(currentProduct.sub_image)) {
        currentSubImages = currentProduct.sub_image;
      }
    } catch (err) {
      console.warn('Failed to parse current sub_image:', err);
    }

    // Xóa các sub images được đánh dấu
    if (req.body.deleted_sub_images) {
      let deletedSubImages = [];
      try {
        deletedSubImages = JSON.parse(req.body.deleted_sub_images);
      } catch (err) {
        console.warn('Failed to parse deleted_sub_images:', err);
      }

      // Lọc ra các ảnh không bị xóa
      currentSubImages = currentSubImages.filter(url => !deletedSubImages.includes(url));

      // Thêm vào danh sách cần xóa trên cloudinary
      deletedImages.push(...deletedSubImages);
    }

    // Upload sub images mới (nếu có)
    if (req.files && req.files['sub_images']) {
      for (const file of req.files['sub_images']) {
        const subImageUrl = await uploadToCloudinary(file.buffer, CLOUDINARY_FOLDERS.PRODUCT);
        newSubImageUrls.push(subImageUrl);
      }

      // Thêm ảnh mới vào danh sách hiện tại
      currentSubImages = [...currentSubImages, ...newSubImageUrls];
    }

    // Chuẩn bị câu query update
    const updateFields = [];
    const updateValues = [];

    if (snakeBody.product_code) {
      updateFields.push('product_code = ?');
      updateValues.push(snakeBody.product_code);
    }
    if (snakeBody.product_name_vn) {
      updateFields.push('product_name_vn = ?');
      updateValues.push(snakeBody.product_name_vn);
    }
    if (mainImageToUpdate !== currentProduct.main_image) {
      updateFields.push('main_image = ?');
      updateValues.push(mainImageToUpdate);
    }
    if (currentSubImages.length >= 0) {
      updateFields.push('sub_image = ?');
      updateValues.push(JSON.stringify(currentSubImages));
    }
    if (snakeBody.length !== undefined) {
      updateFields.push('length = ?');
      updateValues.push(snakeBody.length);
    }
    if (snakeBody.width !== undefined) {
      updateFields.push('width = ?');
      updateValues.push(snakeBody.width);
    }
    if (snakeBody.height !== undefined) {
      updateFields.push('height = ?');
      updateValues.push(snakeBody.height);
    }
    if (snakeBody.material_vn) {
      updateFields.push('material_vn = ?');
      updateValues.push(snakeBody.material_vn);
    }
    if (snakeBody.description_vn !== undefined) {
      updateFields.push('description_vn = ?');
      updateValues.push(snakeBody.description_vn);
    }
    if (snakeBody.origin_vn) {
      updateFields.push('origin_vn = ?');
      updateValues.push(snakeBody.origin_vn);
    }
    if (snakeBody.color_vn) {
      updateFields.push('color_vn = ?');
      updateValues.push(snakeBody.color_vn);
    }
    if (snakeBody.product_type_id) {
      updateFields.push('product_type_id = ?');
      updateValues.push(snakeBody.product_type_id);
    }
    if (snakeBody.status) {
      updateFields.push('status = ?');
      updateValues.push(snakeBody.status);
    }
    if (snakeBody.warranty_period !== undefined) {
      updateFields.push('warranty_period = ?');
      updateValues.push(snakeBody.warranty_period);
    }
    if (snakeBody.price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(snakeBody.price);
    }

    updateFields.push('updated_at = ?');
    updateValues.push(new Date());

    updateValues.push(product_id);

    const updateQuery = `
      UPDATE products
      SET ${updateFields.join(', ')}
      WHERE product_id = ?
    `;

    await db.query(updateQuery, updateValues);

    // Xóa các ảnh cũ trên cloudinary (chạy async, không block response)
    for (const imageUrl of deletedImages) {
      deleteFromCloudinary(imageUrl).catch(err => {
        console.error('Error deleting image from cloudinary:', err);
      });
    }

    return successResponse(res, {}, 200, 'Cập nhật sản phẩm thành công');
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);

    // Rollback: xóa các ảnh mới upload
    if (newMainImageUrl) {
      await deleteFromCloudinary(newMainImageUrl);
    }
    for (const url of newSubImageUrls) {
      await deleteFromCloudinary(url);
    }

    return errorResponse(res, {}, 500, 'Lỗi server');
  }
};

module.exports = updateProduct;
