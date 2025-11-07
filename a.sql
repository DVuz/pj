/**
 * Node.js/Express API - Categories với Subcategories
 * Hỗ trợ: lọc, sắp xếp, phân trang
 *
 * Cài đặt: npm install express mysql2
 */

const express = require('express');
const mysql = require('mysql2/promise');

// ============================================
// DATABASE CONNECTION
// ============================================
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ============================================
// CATEGORY SERVICE
// ============================================
class CategoryService {

  /**
   * Lấy danh sách categories với đầy đủ tính năng
   */
  async getCategories(filters = {}, page = 1, pageSize = 10) {
    try {
      // Chuẩn hóa tham số
      const keyword = filters.keyword || null;
      const description = filters.description || null;
      const status = filters.status || null;
      const minSubcatCount = filters.min_subcat_count ? parseInt(filters.min_subcat_count) : null;
      const maxSubcatCount = filters.max_subcat_count ? parseInt(filters.max_subcat_count) : null;
      const sortBy = filters.sort_by || 'created_at';
      const sortOrder = (filters.sort_order || 'DESC').toUpperCase();

      // Validate
      page = Math.max(1, parseInt(page));
      pageSize = Math.max(1, Math.min(100, parseInt(pageSize)));
      const offset = (page - 1) * pageSize;

      // 1. Đếm tổng số bản ghi
      const totalRecords = await this.countCategories(filters);
      const totalPages = Math.ceil(totalRecords / pageSize);

      // 2. Lấy dữ liệu categories
      const sql = `
        WITH CategoryStats AS (
          SELECT
            c.category_id,
            c.category_name_vn,
            c.description_vn,
            c.image_url,
            c.status,
            c.created_at,
            c.updated_at,
            COUNT(DISTINCT sc.subcategory_id) as subcategory_count,
            COUNT(DISTINCT CASE WHEN sc.status = 'active' THEN sc.subcategory_id END) as active_subcategory_count
          FROM categories c
          LEFT JOIN subcategories sc ON c.category_id = sc.category_id
          WHERE 1=1
            AND (? IS NULL OR c.category_name_vn LIKE ?)
            AND (? IS NULL OR c.description_vn LIKE ?)
            AND (? IS NULL OR c.status = ?)
          GROUP BY c.category_id, c.category_name_vn, c.description_vn, c.image_url,
                   c.status, c.created_at, c.updated_at
          HAVING 1=1
            AND (? IS NULL OR subcategory_count >= ?)
            AND (? IS NULL OR subcategory_count <= ?)
          ORDER BY
            CASE WHEN ? = 'subcategory_count' AND ? = 'DESC' THEN subcategory_count END DESC,
            CASE WHEN ? = 'subcategory_count' AND ? = 'ASC' THEN subcategory_count END ASC,
            CASE WHEN ? = 'name' AND ? = 'ASC' THEN c.category_name_vn END ASC,
            CASE WHEN ? = 'name' AND ? = 'DESC' THEN c.category_name_vn END DESC,
            CASE WHEN ? = 'created_at' AND ? = 'DESC' THEN c.created_at END DESC,
            CASE WHEN ? = 'created_at' AND ? = 'ASC' THEN c.created_at END ASC,
            c.category_id DESC
          LIMIT ? OFFSET ?
        )
        SELECT cs.*
        FROM CategoryStats cs
      `;

      const keywordLike = keyword ? `%${keyword}%` : null;
      const descriptionLike = description ? `%${description}%` : null;

      const params = [
        keyword, keywordLike,
        description, descriptionLike,
        status, status,
        minSubcatCount, minSubcatCount,
        maxSubcatCount, maxSubcatCount,
        sortBy, sortOrder,
        sortBy, sortOrder,
        sortBy, sortOrder,
        sortBy, sortOrder,
        sortBy, sortOrder,
        sortBy, sortOrder,
        pageSize, offset
      ];

      const [categories] = await pool.execute(sql, params);

      // 3. Lấy subcategories cho từng category
      for (let category of categories) {
        category.subcategories = await this.getSubcategories(category.category_id);
      }

      // 4. Trả về kết quả
      return {
        success: true,
        data: categories,
        pagination: {
          current_page: page,
          page_size: pageSize,
          total_records: totalRecords,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_prev: page > 1
        },
        filters: filters
      };

    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  /**
   * Đếm tổng số categories sau khi lọc
   */
  async countCategories(filters) {
    const keyword = filters.keyword || null;
    const description = filters.description || null;
    const status = filters.status || null;
    const minSubcatCount = filters.min_subcat_count ? parseInt(filters.min_subcat_count) : null;
    const maxSubcatCount = filters.max_subcat_count ? parseInt(filters.max_subcat_count) : null;

    const sql = `
      SELECT COUNT(DISTINCT category_id) as total
      FROM (
        SELECT
          c.category_id,
          COUNT(DISTINCT sc.subcategory_id) as subcategory_count
        FROM categories c
        LEFT JOIN subcategories sc ON c.category_id = sc.category_id
        WHERE 1=1
          AND (? IS NULL OR c.category_name_vn LIKE ?)
          AND (? IS NULL OR c.description_vn LIKE ?)
          AND (? IS NULL OR c.status = ?)
        GROUP BY c.category_id
        HAVING 1=1
          AND (? IS NULL OR subcategory_count >= ?)
          AND (? IS NULL OR subcategory_count <= ?)
      ) as filtered_categories
    `;

    const keywordLike = keyword ? `%${keyword}%` : null;
    const descriptionLike = description ? `%${description}%` : null;

    const params = [
      keyword, keywordLike,
      description, descriptionLike,
      status, status,
      minSubcatCount, minSubcatCount,
      maxSubcatCount, maxSubcatCount
    ];

    const [result] = await pool.execute(sql, params);
    return result[0].total;
  }

  /**
   * Lấy danh sách subcategories của 1 category
   */
  async getSubcategories(categoryId) {
    const sql = `
      SELECT
        subcategory_id,
        subcategory_name_vn,
        description_vn,
        image_url,
        status,
        created_at,
        updated_at
      FROM subcategories
      WHERE category_id = ?
      ORDER BY subcategory_name_vn ASC
    `;

    const [subcategories] = await pool.execute(sql, [categoryId]);
    return subcategories;
  }
}

// ============================================
// EXPRESS APP
// ============================================
const app = express();
app.use(express.json());

const categoryService = new CategoryService();

/**
 * GET /api/categories
 * Query params:
 *   - page: số trang (default: 1)
 *   - page_size: số bản ghi/trang (default: 10)
 *   - keyword: tìm theo tên
 *   - description: tìm theo mô tả
 *   - status: active/inactive
 *   - min_subcat_count: số subcategories tối thiểu
 *   - max_subcat_count: số subcategories tối đa
 *   - sort_by: name/subcategory_count/created_at
 *   - sort_order: ASC/DESC
 */
app.get('/api/categories', async (req, res) => {
  try {
    const { page, page_size, ...filters } = req.query;

    const result = await categoryService.getCategories(
      filters,
      page || 1,
      page_size || 10
    );

    res.json(result);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * GET /api/categories/:id
 * Lấy chi tiết 1 category
 */
app.get('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const sql = `
      SELECT
        c.*,
        COUNT(DISTINCT sc.subcategory_id) as subcategory_count
      FROM categories c
      LEFT JOIN subcategories sc ON c.category_id = sc.category_id
      WHERE c.category_id = ?
      GROUP BY c.category_id
    `;

    const [categories] = await pool.execute(sql, [categoryId]);

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    const category = categories[0];
    category.subcategories = await categoryService.getSubcategories(categoryId);

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// ============================================
// VÍ DỤ SỬ DỤNG
// ============================================

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
VÍ DỤ CÁC REQUEST:

1. Lấy trang 1, mỗi trang 10 bản ghi:
   GET /api/categories?page=1&page_size=10

2. Tìm kiếm theo keyword và status:
   GET /api/categories?keyword=điện tử&status=active&page=1&page_size=20

3. Lọc categories có ít nhất 5 subcategories:
   GET /api/categories?min_subcat_count=5&sort_by=subcategory_count&sort_order=DESC

4. Sắp xếp theo tên A-Z:
   GET /api/categories?sort_by=name&sort_order=ASC&page=2&page_size=15

5. Tìm kiếm phức tạp:
   GET /api/categories?keyword=thời trang&status=active&min_subcat_count=3&sort_by=subcategory_count&sort_order=DESC&page=1&page_size=20

6. Lấy chi tiết 1 category:
   GET /api/categories/1

RESPONSE MẪU:
{
  "success": true,
  "data": [
    {
      "category_id": 1,
      "category_name_vn": "Điện tử",
      "description_vn": "Các sản phẩm điện tử",
      "image_url": "...",
      "status": "active",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "subcategory_count": 5,
      "active_subcategory_count": 4,
      "subcategories": [
        {
          "subcategory_id": 1,
          "subcategory_name_vn": "Điện thoại",
          "description_vn": "...",
          "image_url": "...",
          "status": "active",
          "created_at": "2024-01-01T00:00:00.000Z",
          "updated_at": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ],
  "pagination": {
    "current_page": 1,
    "page_size": 10,
    "total_records": 45,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  },
  "filters": {
    "keyword": "điện tử",
    "status": "active"
  }
}
*/

// ============================================
// EXPORT (nếu dùng module)
// ============================================
module.exports = { CategoryService, app };
