# Luồng Hoạt Động của ProductListPage

## 📋 Tổng Quan

Trang `ProductListPage` là trang hiển thị danh sách sản phẩm với hệ thống lọc (filter), sắp xếp (sort), và phân trang (pagination) hoàn chỉnh. Trang này sử dụng kiến trúc **Single Source of Truth** với URL làm nguồn dữ liệu chính.

---

## 🔄 Luồng Hoạt Động Chi Tiết

### 1️⃣ **Khởi Tạo Trang (Page Initialization)**

```
URL: /product/noi-that-gia-dinh-1/phong-khach-2/ban-tra-5?min_price=1000&sort_by=price
                    ↓
         useProductParams() Hook
                    ↓
   Parse URL thành các params:
   - category: { slug: "noi-that-gia-dinh", id: "1" }
   - subcategory: { slug: "phong-khach", id: "2" }
   - productType: { slug: "ban-tra", id: "5" }
   - filters: { min_price: 1000, sort_by: "price", ... }
```

**File liên quan:** `useProductParams.tsx`

**Chức năng:**

- Parse URL pathname thành các segment (category, subcategory, productType)
- Parse search params (query string) thành filters
- Trả về dữ liệu đã parse cho các component khác sử dụng

---

### 2️⃣ **Fetch Dữ Liệu Subcategory**

```
ProductListPage Component
         ↓
useGetSubcategoryByIdQuery(subcategory.id)
         ↓
API Call: GET /subcategories/2
         ↓
Response: {
  data: {
    subcategory_id: 2,
    subcategory_name_vn: "Phòng khách",
    image_url: "...",
    product_types: [
      { product_type_id: 5, product_type_name_vn: "Bàn trà" },
      ...
    ]
  }
}
```

**File liên quan:** `subcategoryApi.ts`

**Mục đích:**

- Lấy thông tin chi tiết subcategory (tên, ảnh banner)
- Lấy danh sách product_types thuộc subcategory (dùng cho ProductTypeFilter)

---

### 3️⃣ **Quản Lý State & Fetch Products**

```
useGetProductList() Hook
         ↓
1. Đọc params từ useProductParams()
2. Tạo query state từ params
         ↓
useEffect: Sync URL params → query state
         ↓
Filter query (loại bỏ giá trị null/0/empty)
         ↓
useGetProductsQuery(filteredQuery)
         ↓
API Call: GET /products?subcategory_id=2&product_type_id=5&min_price=1000&sort_by=price
         ↓
Response: {
  data: {
    products: [...],
    pagination: { page: 1, limit: 10, total: 50, totalPages: 5 }
  }
}
```

**File liên quan:** `useGetProductList.tsx`, `productApi.ts`

**Flow chi tiết:**

1. **Initial State:** Hook tạo query state ban đầu
2. **Sync with URL:** useEffect đồng bộ URL params → query state
3. **Filter Empty Values:** Loại bỏ các giá trị không hợp lệ (null, 0, empty)
4. **API Call:** RTK Query tự động gọi API khi query thay đổi
5. **Update Products:** Data trả về được expose cho component

---

### 4️⃣ **Filter Components - Tự Quản Lý State**

#### A. ProductTypeFilter

```
Component Mount
         ↓
useProductParams() → Lấy productType.id từ URL
useGetSubcategoryByIdQuery() → Lấy danh sách product_types
useGetProductList() → Lấy handleProductTypeChange
         ↓
User Click Button (id = 5)
         ↓
handleSelect(5)
         ↓
1. Toggle selectedId (5 → null hoặc null → 5)
2. Call handleProductTypeChange(5) → Update query state
3. Preserve search params từ URL
4. Generate new URL với product type slug
5. window.history.replaceState() → Update URL
         ↓
URL thay đổi → Trigger useEffect trong useGetProductList
         ↓
Fetch lại products với product_type_id mới
```

**Đặc điểm:**

- Tự fetch danh sách product_types
- Tự quản lý selected state
- Vừa update query state, vừa update URL
- Giữ nguyên các search params khác (min_price, sort_by,...)

---

#### B. PriceFilter

```
Component Mount
         ↓
useProductParams() → Lấy filters.min_price, filters.max_price từ URL
useGetProductList() → Lấy handlePriceRangeChange
         ↓
User Thay Đổi Giá (min: 1000, max: 5000000)
         ↓
handleApplyFilter()
         ↓
1. Call handlePriceRangeChange(1000, 5000000) → Update query state
2. Call updateUrlParams({ min_price: 1000, max_price: 5000000 }) → Update URL
         ↓
URL thay đổi → Trigger useEffect trong useGetProductList
         ↓
Fetch lại products với min_price và max_price mới
```

**Đặc điểm:**

- Dropdown UI với range slider
- Local state cho tạm thời input (chưa apply)
- Chỉ update query + URL khi click "Áp dụng"
- Reset về 0 - MAX_PRICE khi click "Đặt lại"

---

#### C. SortOrder

```
Component Mount
         ↓
useProductParams() → Lấy filters.sort_by, filters.sort_order từ URL
useGetProductList() → Lấy handleSortChange
         ↓
User Chọn "Giá thấp đến cao"
         ↓
handleValueChange("price_ASC")
         ↓
1. Parse "price_ASC" → { sortBy: "price", sortOrder: "ASC" }
2. Call handleSortChange("price", "ASC") → Update query state
3. Call updateUrlParams({ sort_by: "price", sort_order: "ASC" }) → Update URL
         ↓
URL thay đổi → Trigger useEffect trong useGetProductList
         ↓
Fetch lại products với sort_by và sort_order mới
```

**Đặc điểm:**

- Dropdown select với các option có sẵn
- Tự map giữa value UI và sort params backend
- Update ngay khi select (không cần click apply)

---

### 5️⃣ **Pagination Flow**

```
User Click Page 3
         ↓
handlePageChange(3)
         ↓
1. Update query state: { ...prev, page: 3 }
2. setTimeout → updateUrlParams({ page: 3 })
         ↓
URL: ?page=3&...
         ↓
useEffect trong useGetProductList trigger
         ↓
API Call: GET /products?page=3&...
         ↓
Update products + pagination state
```

**Tương tự cho Limit:**

```
User Chọn "20 items/page"
         ↓
handleLimitChange(20)
         ↓
1. Update query: { ...prev, limit: 20, page: 1 } (reset về page 1)
2. Update URL: ?limit=20&page=1
         ↓
Fetch lại với limit mới
```

---

## 🎯 Các Nguyên Tắc Thiết Kế

### ✅ Single Source of Truth

- **URL là nguồn dữ liệu duy nhất** cho tất cả filters
- Mọi thay đổi filter → Update URL → Trigger re-fetch
- Share link = Share exact state

### ✅ No Props Drilling

- Các component con tự lấy dữ liệu từ hook
- Không truyền props từ cha xuống con
- Dễ bảo trì, dễ tái sử dụng

### ✅ Separation of Concerns

- **useProductParams:** Parse URL
- **useGetProductList:** Quản lý query state + API call
- **useUrlSync:** Update URL params
- **Filter Components:** UI + Logic riêng

### ✅ Optimistic Updates

- Update local state ngay lập tức (UI responsive)
- setTimeout để tránh infinite loop khi update URL
- RTK Query tự động debounce API calls

---

## 📊 Sơ Đồ Luồng Dữ Liệu

```
┌─────────────────────────────────────────────────────────┐
│                       URL (Source of Truth)              │
│  /product/category-1/subcategory-2/producttype-5         │
│  ?min_price=1000&max_price=5000&sort_by=price&page=1     │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│              useProductParams() Hook                     │
│  - Parse pathname → category, subcategory, productType   │
│  - Parse search params → filters                         │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│            useGetProductList() Hook                      │
│  1. Nhận params từ useProductParams()                    │
│  2. Tạo query state                                      │
│  3. Sync URL → query (useEffect)                         │
│  4. Filter invalid values                                │
│  5. Call useGetProductsQuery(filteredQuery)              │
│  6. Return: products, pagination, handlers               │
└────────────┬────────────────────────────────────────────┘
             │
             ├─────────────┬──────────────┬─────────────┐
             ▼             ▼              ▼             ▼
     ┌──────────────┐ ┌─────────┐ ┌──────────┐ ┌─────────────┐
     │ProductType   │ │Price    │ │Sort      │ │Pagination   │
     │Filter        │ │Filter   │ │Order     │ │             │
     └──────┬───────┘ └────┬────┘ └────┬─────┘ └──────┬──────┘
            │              │           │              │
            │ handleProductTypeChange  │              │
            │              │ handlePriceRangeChange   │
            │              │           │ handleSortChange
            │              │           │              │ handlePageChange
            └──────────────┴───────────┴──────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Update query state    │
              │  Update URL params     │
              └────────┬───────────────┘
                       │
                       ▼
              ┌────────────────────────┐
              │  useEffect triggers    │
              └────────┬───────────────┘
                       │
                       ▼
              ┌────────────────────────┐
              │  API Call (RTK Query)  │
              │  GET /products?...     │
              └────────┬───────────────┘
                       │
                       ▼
              ┌────────────────────────┐
              │  Update products &     │
              │  pagination state      │
              └────────┬───────────────┘
                       │
                       ▼
              ┌────────────────────────┐
              │  Re-render UI          │
              └────────────────────────┘
```

---

## 🛠️ Các File Quan Trọng

| File                    | Chức Năng                     |
| ----------------------- | ----------------------------- |
| `ProductListPage.tsx`   | Component chính, layout trang |
| `useProductParams.tsx`  | Parse URL params              |
| `useGetProductList.tsx` | Quản lý query state + API     |
| `useUrlSync.tsx`        | Update URL params             |
| `ProductTypeFilter.tsx` | Filter theo loại sản phẩm     |
| `PriceFilter.tsx`       | Filter theo khoảng giá        |
| `SortOrder.tsx`         | Sắp xếp sản phẩm              |
| `productApi.ts`         | RTK Query API endpoints       |

---

## 🔍 Ví Dụ Thực Tế

### Kịch Bản: User Lọc Sản Phẩm

1. **User vào trang:**

   ```
   URL: /product/noi-that-gia-dinh-1/phong-khach-2
   ```

   - Hiển thị tất cả sản phẩm của subcategory "Phòng khách"
   - Mặc định sắp xếp theo created_at DESC

2. **User chọn loại sản phẩm "Bàn trà":**

   ```
   URL: /product/noi-that-gia-dinh-1/phong-khach-2/ban-tra-5
   ```

   - Chỉ hiển thị sản phẩm có product_type_id = 5

3. **User chọn khoảng giá 1,000,000 - 5,000,000:**

   ```
   URL: /product/.../ban-tra-5?min_price=1000000&max_price=5000000
   ```

   - Chỉ hiển thị sản phẩm trong khoảng giá này

4. **User sắp xếp theo "Giá thấp đến cao":**

   ```
   URL: /product/.../ban-tra-5?min_price=1000000&max_price=5000000&sort_by=price&sort_order=ASC
   ```

   - Sản phẩm được sắp xếp theo giá tăng dần

5. **User chuyển sang trang 2:**

   ```
   URL: /product/.../ban-tra-5?min_price=1000000&max_price=5000000&sort_by=price&sort_order=ASC&page=2
   ```

   - Hiển thị 10 sản phẩm tiếp theo (trang 2)

6. **User copy link và gửi cho bạn:**
   - Bạn mở link → **Thấy chính xác cùng kết quả filter!**
   - Đây chính là sức mạnh của URL as Single Source of Truth

---

## ⚡ Tối Ưu Hóa

### Tránh Infinite Loop

```tsx
// ❌ Không tốt - Gây infinite loop
useEffect(() => {
  updateUrlParams({ page });
}, [page, updateUrlParams]); // updateUrlParams thay đổi → trigger lại effect

// ✅ Tốt - Dùng setTimeout để break loop
const handlePageChange = useCallback(
  (newPage: number) => {
    setQuery(prev => ({ ...prev, page: newPage }));
    setTimeout(() => {
      updateUrlParams({ page: newPage });
    }, 0);
  },
  [updateUrlParams]
);
```

### Filter Invalid Values

```tsx
// Loại bỏ các giá trị không cần gửi lên API
const shouldIncludeInQuery = (key: string, value: unknown) => {
  if (key === 'status' && value === 'all') return false;
  if (value === null || value === undefined || value === '') return false;
  return !(typeof value === 'number' && value === 0);
};
```

### RTK Query Auto-Caching

- RTK Query tự động cache kết quả API
- Nếu params giống nhau → Không gọi lại API
- Tự động refetch khi focus window (nếu bật)

---

## 📝 Lưu Ý Khi Maintain

1. **Khi thêm filter mới:**

   - Thêm field vào `ProductQuery` type
   - Thêm vào `useProductParams` để parse từ URL
   - Thêm handler trong `useGetProductList`
   - Tạo component filter mới tương tự pattern hiện tại

2. **Khi sửa API response:**

   - Update type trong `common.types.ts`
   - Update `transformResponse` trong API nếu cần
   - Check các component đang dùng data này

3. **Khi debug:**
   - Check console.log trong `useGetProductList` (có sẵn)
   - Verify URL params có đúng không
   - Check Network tab để xem API call

---

## 🎓 Kết Luận

Hệ thống filter này được thiết kế theo **best practices hiện đại**:

- ✅ URL-driven state management
- ✅ No props drilling
- ✅ Self-contained components
- ✅ Type-safe với TypeScript
- ✅ Responsive & Mobile-friendly
- ✅ SEO-friendly (shareable URLs)

Mọi thay đổi đều được đồng bộ giữa **UI ↔ State ↔ URL ↔ API**, tạo ra trải nghiệm mượt mà và dễ bảo trì!
