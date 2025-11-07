function camelObjToSnakeObj(obj) {
  const newObj = {};
  for (const key in obj) {
    // Nếu key đã có dạng snake_case (chứa dấu _), giữ nguyên
    if (key.includes('_')) {
      newObj[key] = obj[key];
    } else {
      // Chỉ convert camelCase thành snake_case
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      newObj[snakeKey] = obj[key];
    }
  }
  return newObj;
}

module.exports = camelObjToSnakeObj;
