function validateImages(files) {
  if (!files) {
    return {
      valid: false,
      message: 'No files provided',
      field: 'files',
    };
  }

  // Main image ≤ 20MB
  if (files.mainImage) {
    const main = files.mainImage[0];
    if (main.size > 20 * 1024 * 1024) {
      return {
        valid: false,
        message: 'Main image vượt quá 20MB',
        field: 'mainImage',
      };
    }
  }

  // Sub images ≤ 5MB mỗi file
  if (files.subImages) {
    for (const sub of files.subImages) {
      if (sub.size > 5 * 1024 * 1024) {
        return {
          valid: false,
          message: 'Sub image vượt quá 5MB',
          field: 'subImages',
        };
      }
    }
  }

  return { valid: true };
}

module.exports = validateImages;
