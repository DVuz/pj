/**
 * Transform flat rows thành nested structure cho CATEGORY
 */
const transformCategoryData = flatRows => {
  if (!flatRows || flatRows.length === 0) return null;

  const categoryInfo = {
    category_id: flatRows[0].category_id,
    category_name_vn: flatRows[0].category_name_vn,
    description_vn: flatRows[0].category_description,
    image_url: flatRows[0].category_image,
    status: flatRows[0].category_status,
    created_at: flatRows[0].category_created_at,
    updated_at: flatRows[0].category_updated_at,
    subcategories: [],
  };

  const subcategoriesMap = new Map();
  const productTypesMap = new Map();

  flatRows.forEach(row => {
    // Xử lý subcategory
    if (row.subcategory_id && !subcategoriesMap.has(row.subcategory_id)) {
      const subcategory = {
        subcategory_id: row.subcategory_id,
        subcategory_name_vn: row.subcategory_name_vn,
        description_vn: row.subcategory_description,
        image_url: row.subcategory_image,
        status: row.subcategory_status,
        created_at: row.subcategory_created_at,
        updated_at: row.subcategory_updated_at,
        product_types: [],
      };
      subcategoriesMap.set(row.subcategory_id, subcategory);
      categoryInfo.subcategories.push(subcategory);
    }

    // Xử lý product type
    if (row.product_type_id && !productTypesMap.has(row.product_type_id)) {
      const productType = {
        product_type_id: row.product_type_id,
        product_type_name_vn: row.product_type_name_vn,
        description_vn: row.product_type_description,
        image_url: row.product_type_image,
        status: row.product_type_status,
        created_at: row.product_type_created_at,
        updated_at: row.product_type_updated_at,
        products: [],
      };

      const subcategory = subcategoriesMap.get(row.subcategory_id);
      if (subcategory) {
        subcategory.product_types.push(productType);
      }

      productTypesMap.set(row.product_type_id, productType);
    }

    // Xử lý product
    if (row.product_id) {
      const product = {
        product_id: row.product_id,
        product_code: row.product_code,
        product_name_vn: row.product_name_vn,
        main_image: row.main_image,
        sub_image: row.sub_image,
        dimensions: {
          length: row.length,
          width: row.width,
          height: row.height,
        },
        material_vn: row.material_vn,
        description_vn: row.product_description,
        origin_vn: row.origin_vn,
        color_vn: row.color_vn,
        public_date: row.public_date,
        status: row.product_status,
        warranty_period: row.warranty_period,
        price: row.price,
        created_at: row.product_created_at,
        updated_at: row.product_updated_at,
      };

      const productType = productTypesMap.get(row.product_type_id);
      if (productType) {
        const existingProduct = productType.products.find(p => p.product_id === row.product_id);
        if (!existingProduct) {
          productType.products.push(product);
        }
      }
    }
  });

  return categoryInfo;
};

/**
 * Transform flat rows thành nested structure cho SUBCATEGORY
 */
const transformSubcategoryData = flatRows => {
  if (!flatRows || flatRows.length === 0) return null;

  const subcategoryInfo = {
    subcategory_id: flatRows[0].subcategory_id,
    subcategory_name_vn: flatRows[0].subcategory_name_vn,
    description_vn: flatRows[0].subcategory_description,
    image_url: flatRows[0].subcategory_image,
    status: flatRows[0].subcategory_status,
    created_at: flatRows[0].subcategory_created_at,
    updated_at: flatRows[0].subcategory_updated_at,
    category: flatRows[0].category_id
      ? {
          category_id: flatRows[0].category_id,
          category_name_vn: flatRows[0].category_name_vn,
          image_url: flatRows[0].category_image,
          status: flatRows[0].category_status,
        }
      : null,
    product_types: [],
  };

  const productTypesMap = new Map();

  flatRows.forEach(row => {
    // Xử lý product type
    if (row.product_type_id && !productTypesMap.has(row.product_type_id)) {
      const productType = {
        product_type_id: row.product_type_id,
        product_type_name_vn: row.product_type_name_vn,
        description_vn: row.product_type_description,
        image_url: row.product_type_image,
        status: row.product_type_status,
        created_at: row.product_type_created_at,
        updated_at: row.product_type_updated_at,
        products: [],
      };

      subcategoryInfo.product_types.push(productType);
      productTypesMap.set(row.product_type_id, productType);
    }

    // Xử lý product
    if (row.product_id) {
      const product = {
        product_id: row.product_id,
        product_code: row.product_code,
        product_name_vn: row.product_name_vn,
        main_image: row.main_image,
        sub_image: row.sub_image,
        dimensions: {
          length: row.length,
          width: row.width,
          height: row.height,
        },
        material_vn: row.material_vn,
        description_vn: row.product_description,
        origin_vn: row.origin_vn,
        color_vn: row.color_vn,
        public_date: row.public_date,
        status: row.product_status,
        warranty_period: row.warranty_period,
        price: row.price,
        created_at: row.product_created_at,
        updated_at: row.product_updated_at,
      };

      const productType = productTypesMap.get(row.product_type_id);
      if (productType) {
        const existingProduct = productType.products.find(p => p.product_id === row.product_id);
        if (!existingProduct) {
          productType.products.push(product);
        }
      }
    }
  });

  return subcategoryInfo;
};

/**
 * Transform flat rows thành nested structure cho PRODUCT TYPE
 */
const transformProductTypeData = flatRows => {
  if (!flatRows || flatRows.length === 0) return null;

  const productTypeInfo = {
    product_type_id: flatRows[0].product_type_id,
    product_type_name_vn: flatRows[0].product_type_name_vn,
    description_vn: flatRows[0].product_type_description,
    image_url: flatRows[0].product_type_image,
    status: flatRows[0].product_type_status,
    created_at: flatRows[0].product_type_created_at,
    updated_at: flatRows[0].product_type_updated_at,
    subcategory: flatRows[0].subcategory_id
      ? {
          subcategory_id: flatRows[0].subcategory_id,
          subcategory_name_vn: flatRows[0].subcategory_name_vn,
          image_url: flatRows[0].subcategory_image,
          status: flatRows[0].subcategory_status,
          category: flatRows[0].category_id
            ? {
                category_id: flatRows[0].category_id,
                category_name_vn: flatRows[0].category_name_vn,
                image_url: flatRows[0].category_image,
                status: flatRows[0].category_status,
              }
            : null,
        }
      : null,
    products: [],
  };

  const productIds = new Set();

  flatRows.forEach(row => {
    if (row.product_id && !productIds.has(row.product_id)) {
      productTypeInfo.products.push({
        product_id: row.product_id,
        product_code: row.product_code,
        product_name_vn: row.product_name_vn,
        main_image: row.main_image,
        sub_image: row.sub_image,
        dimensions: {
          length: row.length,
          width: row.width,
          height: row.height,
        },
        material_vn: row.material_vn,
        description_vn: row.product_description,
        origin_vn: row.origin_vn,
        color_vn: row.color_vn,
        public_date: row.public_date,
        status: row.product_status,
        warranty_period: row.warranty_period,
        price: row.price,
        created_at: row.product_created_at,
        updated_at: row.product_updated_at,
      });
      productIds.add(row.product_id);
    }
  });

  return productTypeInfo;
};

/**
 * Transform single product data (không cần nested, chỉ flatten thông tin hierarchy)
 */
const transformProductData = flatRows => {
  if (!flatRows || flatRows.length === 0) return null;

  const row = flatRows[0];

  return {
    product_id: row.product_id,
    product_code: row.product_code,
    product_name_vn: row.product_name_vn,
    main_image: row.main_image,
    sub_image: row.sub_image,
    dimensions: {
      length: row.length,
      width: row.width,
      height: row.height,
    },
    material_vn: row.material_vn,
    description_vn: row.product_description,
    origin_vn: row.origin_vn,
    color_vn: row.color_vn,
    public_date: row.public_date,
    status: row.product_status,
    warranty_period: row.warranty_period,
    price: row.price,
    created_at: row.product_created_at,
    updated_at: row.product_updated_at,
    hierarchy: {
      product_type: row.product_type_id
        ? {
            product_type_id: row.product_type_id,
            product_type_name_vn: row.product_type_name_vn,
            image_url: row.product_type_image,
            status: row.product_type_status,
          }
        : null,
      subcategory: row.subcategory_id
        ? {
            subcategory_id: row.subcategory_id,
            subcategory_name_vn: row.subcategory_name_vn,
            image_url: row.subcategory_image,
            status: row.subcategory_status,
          }
        : null,
      category: row.category_id
        ? {
            category_id: row.category_id,
            category_name_vn: row.category_name_vn,
            image_url: row.category_image,
            status: row.category_status,
          }
        : null,
    },
  };
};

/**
 * Calculate statistics cho từng level
 */
const calculateStatistics = (data, level) => {
  if (!data) return data;

  switch (level) {
    case 'category':
      if (!data.subcategories) return data;

      let totalSubcategories = 0;
      let totalProductTypes = 0;
      let totalProducts = 0;
      let activeSubcategories = 0;
      let activeProductTypes = 0;
      let activeProducts = 0;

      data.subcategories.forEach(subcategory => {
        totalSubcategories++;
        if (subcategory.status === 'active') activeSubcategories++;

        if (subcategory.product_types) {
          subcategory.product_types.forEach(productType => {
            totalProductTypes++;
            if (productType.status === 'active') activeProductTypes++;

            if (productType.products) {
              productType.products.forEach(product => {
                totalProducts++;
                if (product.status === 'visible') activeProducts++;
              });

              productType.product_count = productType.products.length;
              productType.active_product_count = productType.products.filter(
                p => p.status === 'visible'
              ).length;
            }
          });

          subcategory.product_type_count = subcategory.product_types.length;
          subcategory.active_product_type_count = subcategory.product_types.filter(
            pt => pt.status === 'active'
          ).length;
          subcategory.total_product_count = subcategory.product_types.reduce(
            (sum, pt) => sum + (pt.products?.length || 0),
            0
          );
          subcategory.active_product_count = subcategory.product_types.reduce(
            (sum, pt) => sum + (pt.products?.filter(p => p.status === 'visible').length || 0),
            0
          );
        }
      });

      data.statistics = {
        total_subcategories: totalSubcategories,
        active_subcategories: activeSubcategories,
        total_product_types: totalProductTypes,
        active_product_types: activeProductTypes,
        total_products: totalProducts,
        active_products: activeProducts,
      };
      break;

    case 'subcategory':
      if (!data.product_types) return data;

      let subTotalProductTypes = 0;
      let subTotalProducts = 0;
      let subActiveProductTypes = 0;
      let subActiveProducts = 0;

      data.product_types.forEach(productType => {
        subTotalProductTypes++;
        if (productType.status === 'active') subActiveProductTypes++;

        if (productType.products) {
          productType.products.forEach(product => {
            subTotalProducts++;
            if (product.status === 'visible') subActiveProducts++;
          });

          productType.product_count = productType.products.length;
          productType.active_product_count = productType.products.filter(
            p => p.status === 'visible'
          ).length;
        }
      });

      data.statistics = {
        total_product_types: subTotalProductTypes,
        active_product_types: subActiveProductTypes,
        total_products: subTotalProducts,
        active_products: subActiveProducts,
      };
      break;

    case 'producttype':
      if (!data.products) return data;

      data.statistics = {
        total_products: data.products.length,
        active_products: data.products.filter(p => p.status === 'visible').length,
      };
      break;

    case 'product':
      // Product level không cần statistics
      break;
  }

  return data;
};

module.exports = {
  transformCategoryData,
  transformSubcategoryData,
  transformProductTypeData,
  transformProductData,
  calculateStatistics,
};
