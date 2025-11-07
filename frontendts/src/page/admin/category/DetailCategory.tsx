import { ArrowLeft, Box, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
  image_url: string;
  status: string;
  product_count: number;
  active_product_count: number;
  products: Product[];
}

interface Product {
  product_id: number;
  product_code: string;
  product_name_vn: string;
  main_image: string;
  price: number;
  status: string;
}

interface Subcategory {
  subcategory_id: number;
  subcategory_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string;
  product_type_count: number;
  active_product_type_count: number;
  total_product_count: number;
  active_product_count: number;
  product_types: ProductType[];
}

interface Category {
  category_id: number;
  category_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  subcategories: Subcategory[];
  statistics: {
    total_subcategories: number;
    active_subcategories: number;
    total_product_types: number;
    active_product_types: number;
    total_products: number;
    active_products: number;
  };
}

const DetailCategory = () => {
  const navigate = useNavigate();
  const [expandedSubcategories, setExpandedSubcategories] = useState<number[]>([]);
  const [expandedProductTypes, setExpandedProductTypes] = useState<number[]>([]);

  // Mock data - replace with actual API call
  const categoryData: Category = {
    category_id: 1,
    category_name_vn: 'Nội thất gia đình',
    description_vn:
      '<p>Nội thất gia đình bằng gỗ mang đến sự ấm áp và sang trọng cho không gian sống của bạn...</p>',
    image_url: 'uploads/categories/DDS_category-1745333871213-607198336.webp',
    status: 'active',
    created_at: '2025-04-22T07:57:51.000Z',
    updated_at: '2025-04-22T07:57:51.000Z',
    subcategories: [
      {
        subcategory_id: 3,
        subcategory_name_vn: 'Kitchen Furniture',
        description_vn:
          '<p>Nâng tầm không gian bếp của bạn với các sản phẩm nội thất tiện dụng và tinh tế. Từ bàn ăn, ghế, tủ bếp đến các giải pháp lưu trữ thông minh, bộ sưu tập của chúng tôi mang đến sự thoải mái, tiện nghi và vẻ đẹp hiện đại cho mọi căn bếp gia đình.</p>',
        image_url: 'uploads/subcategories/DDS_subcategory-1751105736413-300198251.jpg',
        status: 'active',
        created_at: '2025-06-28T03:15:36.000Z',
        updated_at: '2025-06-28T04:07:48.000Z',
        product_types: [
          {
            product_type_id: 8,
            product_type_name_vn: 'AAA',
            description_vn: '<p>AAA</p>',
            image_url: 'uploads/productTypes/DDS_productType-1750968793610-198572838.jpg',
            status: 'active',
            created_at: '2025-06-26T13:13:13.000Z',
            updated_at: '2025-07-02T09:44:00.000Z',
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 11,
            product_type_name_vn: 'ádad2',
            description_vn: 'active',
            image_url: '',
            status: 'active',
            created_at: '2025-10-01T19:55:10.000Z',
            updated_at: null,
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 12,
            product_type_name_vn: 'ádad2s',
            description_vn: 'active',
            image_url: '',
            status: 'active',
            created_at: '2025-10-01T20:03:36.000Z',
            updated_at: null,
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 13,
            product_type_name_vn: 'ádad2s33',
            description_vn: 'active',
            image_url: '',
            status: 'active',
            created_at: '2025-10-01T20:10:36.000Z',
            updated_at: null,
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 14,
            product_type_name_vn: 'ádad2s33â',
            description_vn: 'active',
            image_url: '',
            status: 'active',
            created_at: '2025-10-01T20:11:17.000Z',
            updated_at: null,
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 15,
            product_type_name_vn: 'ádad2s33â11',
            description_vn: 'active',
            image_url:
              'https://res.cloudinary.com/dfizo8h6h/image/upload/v1759349711/pj/upload/producttype/pkoxffnlljev27hayuh2.webp',
            status: 'active',
            created_at: '2025-10-01T20:15:12.000Z',
            updated_at: null,
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
        ],
        product_type_count: 6,
        active_product_type_count: 6,
        total_product_count: 0,
        active_product_count: 0,
      },
      {
        subcategory_id: 1,
        subcategory_name_vn: 'Phòng khách',
        description_vn:
          '<p>Phòng khách là tâm điểm của ngôi nhà, và nội thất gỗ chất lượng mang đến sự ấm áp và sang trọng. Dù bạn cần một chiếc sofa chắc chắn, bàn trà cổ điển hay giải pháp lưu trữ tiện lợi, các sản phẩm gỗ thủ công của chúng tôi luôn mang đến sự thoải mái và phong cách.</p>',
        image_url: 'uploads/subcategories/DDS_subcategory-1745334083469-265212982.jpg',
        status: 'active',
        created_at: '2025-04-22T08:01:23.000Z',
        updated_at: '2025-06-30T09:36:27.000Z',
        product_types: [
          {
            product_type_id: 3,
            product_type_name_vn: 'Bàn trà',
            description_vn:
              '<p>Bàn trà là điểm nhấn trung tâm của phòng khách, kết hợp giữa tính tiện dụng và thẩm mỹ. Các mẫu bàn trà gỗ của chúng tôi được chế tác tỉ mỉ, mang đến sự bền bỉ và vẻ đẹp vượt thời gian. Hoàn hảo để đặt sách, đồ uống, hoặc đồ trang trí, chúng giúp không gian của bạn thêm ấm cúng và sang trọng.</p>',
            image_url: 'uploads/productTypes/DDS_productType-1745336557448-463238838.webp',
            status: 'active',
            created_at: '2025-04-22T08:42:37.000Z',
            updated_at: '2025-04-22T08:42:37.000Z',
            products: [
              {
                product_id: 15,
                product_code: '12',
                product_name_vn: '12',
                main_image: 'uploads/products/main/DDS_product_main-1747694294294-581691994.jpg',
                sub_image: '["uploads/products/sub/DDS_product_sub-1747694294296-731629513.jpg"]',
                dimensions: {
                  length: 12,
                  width: 12,
                  height: 12,
                },
                material_vn: '12',
                description_vn: '<p>12</p>',
                origin_vn: '12',
                color_vn: '12',
                public_date: '2025-05-11T03:48:48.000Z',
                status: 'hidden',
                warranty_period: 12,
                price: 12,
                created_at: '2025-05-11T03:48:48.000Z',
                updated_at: '2025-05-19T15:38:14.000Z',
              },
              {
                product_id: 13,
                product_code: 'BT-06',
                product_name_vn: 'Bàn Sofa Đơn Giản Sang Trọng',
                main_image: 'uploads/products/main/DDS_product_main-1745337480566-114501569.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745337480567-700816403.webp","uploads/products/sub/DDS_product_sub-1745337480569-820070565.webp","uploads/products/sub/DDS_product_sub-1745337480570-652556392.webp"]',
                dimensions: {
                  length: 120,
                  width: 60,
                  height: 45,
                },
                material_vn: 'Gỗ MDF phủ melamine, kết hợp khung sắt phun sơn tĩnh điện',
                description_vn:
                  '<p><strong>Bàn Sofa BT 06</strong> có mặt bàn làm từ gỗ MDF phủ melamine kết hợp với khung sắt phun sơn tĩnh điện, sản phẩm bền bỉ và dễ dàng vệ sinh. Bàn có kích thước 1,2m x 0,6m x 0,45m, phù hợp với nhiều không gian và có nhiều màu sắc như vân gỗ, màu óc chó, màu 7345 để khách hàng lựa chọn.﻿</p>',
                origin_vn: 'Vi��t Nam',
                color_vn: 'Nâu',
                public_date: '2025-04-22T08:58:00.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2400000,
                created_at: '2025-04-22T08:58:00.000Z',
                updated_at: '2025-06-29T17:45:01.000Z',
              },
              {
                product_id: 9,
                product_code: 'BT-04',
                product_name_vn: 'Bàn Trà Đôi Sofa Mặt Kính',
                main_image: 'uploads/products/main/DDS_product_main-1745336871691-942483600.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745336871693-370838187.webp","uploads/products/sub/DDS_product_sub-1745336871695-87132540.webp","uploads/products/sub/DDS_product_sub-1745336871696-279552348.webp","uploads/products/sub/DDS_product_sub-1745336871697-680967569.webp"]',
                dimensions: {
                  length: 100,
                  width: 45,
                  height: 44,
                },
                material_vn: ' Mặt gỗ, Khung kim loại',
                description_vn:
                  '<p><strong>Bàn trà sofa mặt kính đôi</strong> mang lại sự sang trọng và tinh tế cho không gian phòng khách của bạn, đồng thời tạo điểm nhấn hoàn hảo cho không gian sống.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Nâu',
                public_date: '2025-04-22T08:47:51.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 1215000,
                created_at: '2025-04-22T08:47:51.000Z',
                updated_at: '2025-06-29T17:48:21.000Z',
              },
              {
                product_id: 14,
                product_code: 'BT-40',
                product_name_vn: 'Bàn trà gỗ công nghiệp mặt kính',
                main_image: 'uploads/products/main/DDS_product_main-1745337655945-774672829.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745337655971-72778875.webp","uploads/products/sub/DDS_product_sub-1745337655971-739307095.webp","uploads/products/sub/DDS_product_sub-1745337655972-497949459.webp","uploads/products/sub/DDS_product_sub-1745337655973-549171246.webp"]',
                dimensions: {
                  length: 100,
                  width: 50,
                  height: 42,
                },
                material_vn: 'Gỗ MDF phun sơn S8 (chất lượng cao)',
                description_vn:
                  '<p><strong>Bàn trà BT 40</strong> với chất liệu gỗ MDF phun sơn S8 bền bỉ, mặt kính sang trọng và màu sắc tối ấn tượng, sản phẩm phù hợp với nhiều phong cách nội thất khác nhau.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Đen',
                public_date: '2025-04-22T09:00:56.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2450000,
                created_at: '2025-04-22T09:00:56.000Z',
                updated_at: '2025-06-29T17:50:02.000Z',
              },
              {
                product_id: 12,
                product_code: 'BT-05',
                product_name_vn: 'Bàn trà hộc kéo 2 bên tiện lợi',
                main_image: 'uploads/products/main/DDS_product_main-1745337346955-253081182.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745337346957-199514203.webp","uploads/products/sub/DDS_product_sub-1745337346958-261988543.webp","uploads/products/sub/DDS_product_sub-1745337346959-426574959.webp","uploads/products/sub/DDS_product_sub-1745337346985-720245431.webp"]',
                dimensions: {
                  length: 120,
                  width: 60,
                  height: 35,
                },
                material_vn: 'Gỗ MDF phủ Melamine màu kết hợp vân gỗ tự nhiên.',
                description_vn:
                  '<p><strong>Bàn trà BT 05</strong> làm từ gỗ MDF phủ Melamine với vân gỗ tự nhiên, mang lại độ bền và vẻ đẹp sang trọng. Sản phẩm có sẵn nhiều màu sắc và có thể tùy chỉnh kích thước.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Nâu',
                public_date: '2025-04-22T08:55:47.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 1900000,
                created_at: '2025-04-22T08:55:47.000Z',
                updated_at: '2025-06-29T17:49:28.000Z',
              },
              {
                product_id: 10,
                product_code: 'BT-01',
                product_name_vn: 'Bàn trà phòng khách phong cách hiện',
                main_image: 'uploads/products/main/DDS_product_main-1745337053615-659548790.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745337053616-730978935.webp","uploads/products/sub/DDS_product_sub-1745337053617-944219099.webp","uploads/products/sub/DDS_product_sub-1745337053618-455712943.webp","uploads/products/sub/DDS_product_sub-1745337053640-233965963.webp","uploads/products/sub/DDS_product_sub-1745337053642-856391499.webp"]',
                dimensions: {
                  length: 70,
                  width: 70,
                  height: 45,
                },
                material_vn: ' Mặt đá tự nhiên, Mặt kính, Khung thép chắc chắn',
                description_vn:
                  '<p><strong>Bàn trà BT-01</strong> với cấu trúc hai tầng sáng tạo, khung thép chắc chắn và ngăn kéo rộng rãi, đây là lựa chọn lý tưởng để mang lại vẻ đẹp và sự tiện nghi cho bất kỳ phòng khách nào.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng, Đen',
                public_date: '2025-04-22T08:50:53.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2950000,
                created_at: '2025-04-22T08:50:53.000Z',
                updated_at: '2025-06-29T17:48:44.000Z',
              },
              {
                product_id: 11,
                product_code: 'BT-03',
                product_name_vn: 'Bàn trà sofa mặt đá cao cấp',
                main_image: 'uploads/products/main/DDS_product_main-1745337215416-461238812.jpg',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745337215438-683341386.jpg","uploads/products/sub/DDS_product_sub-1745337215446-179534311.webp","uploads/products/sub/DDS_product_sub-1745337215447-590630541.webp","uploads/products/sub/DDS_product_sub-1745337215449-11816588.webp"]',
                dimensions: {
                  length: 100,
                  width: 50,
                  height: 42,
                },
                material_vn: ' Bàn mặt đá, ván gỗ công nghiệp MDF.',
                description_vn:
                  '<p><strong>Bàn trà BT03</strong> với thiết kế tối giản và các tùy chọn ngăn kéo/kệ lưu trữ phù hợp với mọi không gian sống, là sự lựa chọn lý tưởng cho phòng khách tinh tế.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng, Đen',
                public_date: '2025-04-22T08:53:35.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 4800000,
                created_at: '2025-04-22T08:53:35.000Z',
                updated_at: '2025-06-29T17:49:00.000Z',
              },
              {
                product_id: 8,
                product_code: 'BT_02',
                product_name_vn: 'Bàn trà sofa mặt đá phòng khách',
                main_image: 'uploads/products/main/DDS_product_main-1745336719918-630722457.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745336719941-31210400.webp","uploads/products/sub/DDS_product_sub-1745336719942-24552539.webp","uploads/products/sub/DDS_product_sub-1745336719944-506162703.webp"]',
                dimensions: {
                  length: 100,
                  width: 50,
                  height: 45,
                },
                material_vn: 'Khung sắt, mặt đá Ceramic',
                description_vn:
                  '<p><strong>Bàn trà sofa mặt đá phòng khách</strong> là lựa chọn lý tưởng cho không gian phòng khách hiện đại. Với mặt đá bền bỉ và thiết kế tinh tế, chiếc bàn này rất phù hợp để thưởng trà và làm điểm nhấn nổi bật cho phòng khách.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng',
                public_date: '2025-04-22T08:45:19.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2250000,
                created_at: '2025-04-22T08:45:19.000Z',
                updated_at: '2025-06-29T17:48:01.000Z',
              },
              {
                product_id: 17,
                product_code: 'test 2',
                product_name_vn: 'test 2',
                main_image: 'uploads/products/main/DDS_product_main-1747694878616-710637169.jpg',
                sub_image: '["uploads/products/sub/DDS_product_sub-1747694878617-475891640.jpg"]',
                dimensions: {
                  length: 12,
                  width: 12,
                  height: 12,
                },
                material_vn: '12',
                description_vn: '<p>activeEvents</p>',
                origin_vn: '12',
                color_vn: '12',
                public_date: '2025-05-19T15:38:48.000Z',
                status: 'hidden',
                warranty_period: 12,
                price: 12,
                created_at: '2025-05-19T15:38:48.000Z',
                updated_at: '2025-05-19T15:48:13.000Z',
              },
            ],
            product_count: 9,
            active_product_count: 7,
          },
          {
            product_type_id: 2,
            product_type_name_vn: 'Ghế sofa',
            description_vn:
              '<p>Ghế sofa là tâm điểm của bất kỳ phòng khách nào, mang lại sự thoải mái và phong cách cho không gian thư giãn và gặp gỡ. Ghế sofa khung gỗ của chúng tôi được chế tác tỉ mỉ, kết hợp giữa kết cấu chắc chắn và lớp bọc tinh tế. Với độ bền cao và tính thẩm mỹ vượt trội, chúng giúp không gian của bạn trở nên ấm cúng và thân thiện.</p>',
            image_url: 'uploads/productTypes/DDS_productType-1745335141689-796752865.webp',
            status: 'active',
            created_at: '2025-04-22T08:19:01.000Z',
            updated_at: '2025-04-22T08:19:01.000Z',
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
          {
            product_type_id: 1,
            product_type_name_vn: 'Kệ ti vi',
            description_vn:
              '<p>Kệ ti vi là điểm nhấn trung tâm của không gian giải trí trong phòng khách. Kệ ti vi gỗ của chúng tôi được chế tác bền bỉ với thiết kế tinh tế, mang đến không gian lưu trữ rộng rãi cho thiết bị điện tử, phụ kiện và đồ trang trí. Với vẻ đẹp vượt thời gian, kệ ti vi không chỉ tiện dụng mà còn làm tăng tính thẩm mỹ cho ngôi nhà của bạn.</p>',
            image_url: 'uploads/productTypes/DDS_productType-1745334169466-275578572.webp',
            status: 'active',
            created_at: '2025-04-22T08:02:49.000Z',
            updated_at: '2025-04-22T08:02:49.000Z',
            products: [
              {
                product_id: 5,
                product_code: 'TV-03',
                product_name_vn: 'Kệ tivi 1m6 nhỏ gọn gỗ công nghiệp',
                main_image: 'uploads/products/main/DDS_product_main-1745335956857-780438042.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745335956872-296139695.webp","uploads/products/sub/DDS_product_sub-1745335956873-111851164.webp"]',
                dimensions: {
                  length: 160,
                  width: 335,
                  height: 50,
                },
                material_vn: 'Gỗ MDF',
                description_vn:
                  '<p><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">Kệ tivi&nbsp;</span><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">1m6 nhỏ gọn gỗ công nghiệp</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">&nbsp;với thiết kế đơn giản, hiện đại, giúp tối ưu hóa không gian phòng khách. Chất liệu&nbsp;</span><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">gỗ công nghiệp</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">&nbsp;bền bỉ, dễ dàng vệ sinh, tạo sự sang trọng và tiện dụng cho không gian sống của bạn.</span></p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng, Vàng',
                public_date: '2025-04-22T08:32:36.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2500000,
                created_at: '2025-04-22T08:32:36.000Z',
                updated_at: '2025-06-29T17:46:59.000Z',
              },
              {
                product_id: 7,
                product_code: 'TV-05',
                product_name_vn: 'Kệ tivi chân bệt hiện đại KT 1m8',
                main_image: 'uploads/products/main/DDS_product_main-1745336390047-368932989.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745336390048-834215360.webp","uploads/products/sub/DDS_product_sub-1745336390049-649073145.webp"]',
                dimensions: {
                  length: 180,
                  width: 40,
                  height: 50,
                },
                material_vn: 'Gỗ MDF phủ melamine',
                description_vn:
                  '<p><strong>Kệ tivi chân bệt hiện đại KT 1m8</strong> với kích thước 1800mm x 400mm x 500mm, làm từ gỗ MDF phủ melamine, mang đến sự sang trọng và tiện nghi cho không gian phòng khách. Thiết kế chân bệt giúp tiết kiệm diện tích và tạo sự thông thoáng cho không gian.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng, Vàng',
                public_date: '2025-04-22T08:39:50.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2700000,
                created_at: '2025-04-22T08:39:50.000Z',
                updated_at: '2025-06-29T17:47:45.000Z',
              },
              {
                product_id: 2,
                product_code: 'TV-09',
                product_name_vn: 'Kệ tivi độc đáo hiện đại đẹp 1m4',
                main_image: 'uploads/products/main/DDS_product_main-1745335298952-370473549.webp',
                sub_image: '["uploads/products/sub/DDS_product_sub-1745335298953-975939682.webp"]',
                dimensions: {
                  length: 140,
                  width: 40,
                  height: 60,
                },
                material_vn: 'Gỗ MDF',
                description_vn:
                  '<p><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">Kệ tivi hiện đại TV_09</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">&nbsp;sở hữu thiết kế độc đáo và kích thước 1m4, là lựa chọn hoàn hảo để mang lại sự gọn gàng và phong cách cho không gian phòng khách. Chất liệu bền bỉ và màu sắc đa dạng giúp sản phẩm dễ dàng hòa hợp với mọi phong cách nội thất.</span></p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Xám',
                public_date: '2025-04-22T08:21:39.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 1800000,
                created_at: '2025-04-22T08:21:39.000Z',
                updated_at: '2025-06-29T17:46:05.000Z',
              },
              {
                product_id: 4,
                product_code: 'TV-02',
                product_name_vn: 'Kệ tivi gỗ mdf thiết kế sang trọng',
                main_image: 'uploads/products/main/DDS_product_main-1745335730635-797337172.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745335730653-334456647.webp","uploads/products/sub/DDS_product_sub-1745335730653-361322734.webp"]',
                dimensions: {
                  length: 200,
                  width: 40,
                  height: 450,
                },
                material_vn: 'Gỗ MDF phủ Melamine',
                description_vn:
                  '<p>Kệ tivi gỗ MDF thiết kế sang trọng với kích thước 2m x 0.4m x 0.45m, mang lại vẻ đẹp hiện đại và tinh tế cho không gian phòng khách. Chất liệu gỗ MDF phủ melamine bền bỉ, kết hợp cùng chân sắt phun sơn tĩnh điện, tạo nên sự chắc chắn và sang trọng.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng, Đen',
                public_date: '2025-04-22T08:28:50.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 4950000,
                created_at: '2025-04-22T08:28:50.000Z',
                updated_at: '2025-06-29T17:46:45.000Z',
              },
              {
                product_id: 6,
                product_code: 'TV-04',
                product_name_vn: 'Kệ tivi gỗ sồi tự nhiên đẹp',
                main_image: 'uploads/products/main/DDS_product_main-1745336255348-116269027.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745336255372-286672268.webp","uploads/products/sub/DDS_product_sub-1745336255372-181644139.webp"]',
                dimensions: {
                  length: 160,
                  width: 40,
                  height: 50,
                },
                material_vn: 'Gỗ sồi tự nhiên',
                description_vn:
                  '<p><strong>Kệ tivi gỗ sồi tự nhiên đẹp</strong> với thiết kế sang trọng, tinh tế, mang lại vẻ đẹp ấm cúng cho không gian phòng khách. Chất liệu gỗ sồi tự nhiên bền bỉ, chắc chắn và dễ dàng bảo quản, tạo điểm nhấn nổi bật cho không gian sống của bạn.</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Nâu',
                public_date: '2025-04-22T08:37:35.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 4800000,
                created_at: '2025-04-22T08:37:35.000Z',
                updated_at: '2025-06-29T17:47:20.000Z',
              },
              {
                product_id: 3,
                product_code: 'TV-01',
                product_name_vn: 'Kệ Tivi Hiện Đại Màu Trắng Giá Rẻ',
                main_image: 'uploads/products/main/DDS_product_main-1745335534880-96195668.webp',
                sub_image: '["uploads/products/sub/DDS_product_sub-1745335534881-177268481.webp"]',
                dimensions: {
                  length: 140,
                  width: 40,
                  height: 500,
                },
                material_vn: 'Gỗ MDF phủ Melamine',
                description_vn:
                  '<p><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">Kệ tivi hiện đại màu trắng</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">&nbsp;với thiết kế đơn giản, tinh tế và kích thước&nbsp;</span><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">1,6m x 0,4m x 0,5m</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">, là sự lựa chọn lý tưởng cho phòng khách hiện đại. Chất liệu&nbsp;</span><strong style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">gỗ MDF phủ Melamine</strong><span style="background-color: rgb(249, 250, 251); color: rgb(0, 0, 0);">&nbsp;bền đẹp, dễ dàng vệ sinh và bảo quản, mang lại vẻ sang trọng cho không gian.</span></p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Trắng',
                public_date: '2025-04-22T08:25:34.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2600000,
                created_at: '2025-04-22T08:25:34.000Z',
                updated_at: '2025-06-29T17:46:24.000Z',
              },
              {
                product_id: 1,
                product_code: 'TG-01',
                product_name_vn: 'Tủ giày thông minh chân gỗ sồi',
                main_image: 'uploads/products/main/DDS_product_main-1745334526519-450120862.webp',
                sub_image:
                  '["uploads/products/sub/DDS_product_sub-1745334526546-458676964.webp","uploads/products/sub/DDS_product_sub-1745334526546-792760348.webp"]',
                dimensions: {
                  length: 120,
                  width: 30,
                  height: 110,
                },
                material_vn: '\tGỗ sồi',
                description_vn:
                  '<p>Tủ giày thông minh với thiết kế hiện đại và chân gỗ sồi chắc chắn, mang lại sự tiện dụng và thẩm mỹ. Chế tạo từ chất liệu cao cấp, tủ giày cung cấp không gian lưu trữ rộng rãi và dễ dàng hòa hợp với mọi không gian.</p>',
                origin_vn: 'Nga',
                color_vn: 'Trắng, Nâu',
                public_date: '2025-04-22T08:08:46.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 2500000,
                created_at: '2025-04-22T08:08:46.000Z',
                updated_at: '2025-06-29T17:45:46.000Z',
              },
            ],
            product_count: 7,
            active_product_count: 7,
          },
          {
            product_type_id: 6,
            product_type_name_vn: 'SPTEST',
            description_vn: '<p>SPTEST</p>',
            image_url: 'uploads/productTypes/DDS_productType-1750940405126-537477636.jpg',
            status: 'active',
            created_at: '2025-06-26T05:20:05.000Z',
            updated_at: '2025-06-30T06:30:49.000Z',
            products: [
              {
                product_id: 18,
                product_code: 'SPTEST',
                product_name_vn: 'SPTEST',
                main_image: 'uploads/products/main/DDS_product_main-1750940476564-141432738.jpg',
                sub_image: '[]',
                dimensions: {
                  length: 1,
                  width: 1,
                  height: 1,
                },
                material_vn: 'Wood',
                description_vn: '<p>SPTEST</p>',
                origin_vn: 'Việt Nam',
                color_vn: 'Yellow',
                public_date: '2025-06-26T05:21:16.000Z',
                status: 'visible',
                warranty_period: 12,
                price: 1000000,
                created_at: '2025-06-26T05:21:16.000Z',
                updated_at: '2025-06-26T05:21:16.000Z',
              },
              {
                product_id: 19,
                product_code: 'Test',
                product_name_vn: 'Test',
                main_image: 'uploads/products/main/DDS_product_main-1751397320572-440587056.png',
                sub_image: '["uploads/products/sub/DDS_product_sub-1751397320606-45275476.png"]',
                dimensions: {
                  length: 122,
                  width: 12,
                  height: 12,
                },
                material_vn: '12',
                description_vn: '<p>12</p>',
                origin_vn: '12',
                color_vn: '12',
                public_date: '2025-07-01T12:15:20.000Z',
                status: 'hidden',
                warranty_period: 12,
                price: 12,
                created_at: '2025-07-01T12:15:20.000Z',
                updated_at: '2025-07-01T15:03:41.000Z',
              },
            ],
            product_count: 2,
            active_product_count: 1,
          },
          {
            product_type_id: 7,
            product_type_name_vn: 'Test',
            description_vn: '<p>Test</p>',
            image_url: 'uploads/productTypes/DDS_productType-1750968321591-70028459.jpg',
            status: 'active',
            created_at: '2025-06-26T13:05:21.000Z',
            updated_at: '2025-07-02T09:44:01.000Z',
            products: [],
            product_count: 0,
            active_product_count: 0,
          },
        ],
        product_type_count: 5,
        active_product_type_count: 5,
        total_product_count: 18,
        active_product_count: 15,
      },
    ],
    statistics: {
      total_subcategories: 2,
      active_subcategories: 2,
      total_product_types: 11,
      active_product_types: 11,
      total_products: 18,
      active_products: 15,
    },
  };

  const toggleSubcategory = (id: number) => {
    setExpandedSubcategories(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleProductType = (id: number) => {
    setExpandedProductTypes(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate({ to: '/admin/categories/list' })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách
          </button>
        </div>

        {/* Category Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-6">
            {/* Category Image */}
            <div className="flex-shrink-0">
              <img
                src={categoryData.image_url}
                alt={categoryData.category_name_vn}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Category Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {categoryData.category_name_vn}
                </h1>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    categoryData.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {categoryData.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
              </div>

              {/* Description */}
              <div
                className="text-gray-600 mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: categoryData.description_vn }}
              />

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Mã danh mục:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    #{categoryData.category_id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Ngày tạo:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {formatDate(categoryData.created_at)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Cập nhật:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {formatDate(categoryData.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm mb-1">Danh mục con</div>
            <div className="text-2xl font-bold text-blue-600">
              {categoryData.statistics.active_subcategories}/
              {categoryData.statistics.total_subcategories}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm mb-1">Loại sản phẩm</div>
            <div className="text-2xl font-bold text-purple-600">
              {categoryData.statistics.active_product_types}/
              {categoryData.statistics.total_product_types}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm mb-1">Sản phẩm</div>
            <div className="text-2xl font-bold text-green-600">
              {categoryData.statistics.active_products}/{categoryData.statistics.total_products}
            </div>
          </div>
        </div>

        {/* Subcategories List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Danh mục con</h2>

          {categoryData.subcategories.map(subcategory => (
            <div key={subcategory.subcategory_id} className="bg-white rounded-lg shadow">
              {/* Subcategory Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleSubcategory(subcategory.subcategory_id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={subcategory.image_url}
                    alt={subcategory.subcategory_name_vn}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {subcategory.subcategory_name_vn}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>
                        {subcategory.active_product_type_count}/{subcategory.product_type_count}{' '}
                        Loại SP
                      </span>
                      <span>
                        {subcategory.active_product_count}/{subcategory.total_product_count} Sản
                        phẩm
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          subcategory.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {subcategory.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </div>
                  </div>
                  {expandedSubcategories.includes(subcategory.subcategory_id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSubcategories.includes(subcategory.subcategory_id) && (
                <div className="border-t px-4 py-4 bg-gray-50">
                  {/* Product Types */}
                  <div className="space-y-3">
                    {subcategory.product_types.map(productType => (
                      <div key={productType.product_type_id} className="bg-white rounded-lg border">
                        {/* Product Type Header */}
                        <div
                          className="p-3 cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => toggleProductType(productType.product_type_id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {productType.image_url ? (
                                <img
                                  src={productType.image_url}
                                  alt={productType.product_type_name_vn}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                  <Box className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {productType.product_type_name_vn}
                              </h4>
                              <div className="flex gap-3 mt-1 text-xs text-gray-600">
                                <span>
                                  {productType.active_product_count}/{productType.product_count} SP
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded font-semibold ${
                                    productType.status === 'active'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {productType.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                                </span>
                              </div>
                            </div>
                            {expandedProductTypes.includes(productType.product_type_id) ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {/* Products Grid */}
                        {expandedProductTypes.includes(productType.product_type_id) && (
                          <div className="border-t p-3 bg-gray-50">
                            {productType.products && productType.products.length > 0 ? (
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {productType.products.map(product => (
                                  <div
                                    key={product.product_id}
                                    className="bg-white rounded border hover:shadow-md transition p-2"
                                  >
                                    {/* Product Image */}
                                    <div className="aspect-square mb-2 overflow-hidden rounded">
                                      {product.main_image ? (
                                        <img
                                          src={product.main_image}
                                          alt={product.product_name_vn}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <Package className="w-8 h-8 text-gray-400" />
                                        </div>
                                      )}
                                    </div>

                                    {/* Product Info */}
                                    <div>
                                      <p className="text-xs text-gray-500 mb-1">
                                        {product.product_code}
                                      </p>
                                      <h5 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                                        {product.product_name_vn}
                                      </h5>
                                      <p className="text-sm font-bold text-green-600 mb-1">
                                        {formatPrice(product.price)}
                                      </p>
                                      <span
                                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                                          product.status === 'visible'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                        }`}
                                      >
                                        {product.status === 'visible' ? 'Hiển thị' : 'Ẩn'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-4">
                                Chưa có sản phẩm nào
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categoryData.subcategories.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có danh mục con</h3>
            <p className="text-gray-500">Danh mục này chưa có danh mục con nào được thêm vào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCategory;
