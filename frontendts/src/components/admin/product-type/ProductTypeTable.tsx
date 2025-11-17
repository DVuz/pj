import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ProductType } from '@/types/product-type.type';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductTypeDeleteModal from '../producttype/ProductTypeDeleteModal';

interface ProductTypeTableProps {
  data: ProductType[];
  isLoading: boolean;
  onViewDetails?: (id: number) => void;
  onEdit?: (id: number) => void;
  onViewProduct?: (productId: number) => void;
  onDeleteSuccess?: () => void;
}

export function ProductTypeTable({
  data,
  isLoading,
  onViewDetails,
  onEdit,
  onViewProduct,
  onDeleteSuccess,
}: ProductTypeTableProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null);

  const handleDelete = (productType: ProductType) => {
    setSelectedProductType(productType);
    setOpenDeleteModal(true);
  };

  // Hiển thị trạng thái đang tải
  if (isLoading) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Đang tải loại sản phẩm...</span>
        </div>
      </div>
    );
  }

  // Hiển thị khi không có dữ liệu
  if (!data || data.length === 0) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Không tìm thấy loại sản phẩm nào</p>
        </div>
      </div>
    );
  }

  // Format ngày tháng
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Trích xuất đoạn mô tả ngắn
  const getShortDescription = (html?: string | null) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[250px]">THÔNG TIN LOẠI SẢN PHẨM</TableHead>
            <TableHead className="w-[180px]">DANH MỤC CON</TableHead>
            <TableHead className="w-[300px]">MÔ TẢ</TableHead>

            <TableHead className="w-[100px] text-center">SẢN PHẨM</TableHead>
            <TableHead className="w-[100px] text-center">THỜI GIAN TẠO</TableHead>
            <TableHead className="w-[100px] text-center">TRẠNG THÁI</TableHead>
            <TableHead className="w-[100px] text-center">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(productType => (
            <TableRow key={productType.product_type_id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  {productType.image_url && (
                    <img
                      src={productType.image_url}
                      alt={productType.product_type_name_vn}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <div className="font-medium">{productType.product_type_name_vn}</div>
                    <div className="text-sm text-gray-500">{productType.product_type_id}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                {productType.subcategory && productType.subcategory.length > 0 && (
                  <div>
                    <div className="font-medium">
                      {productType.subcategory[0].subcategory_name_vn}
                    </div>
                    <div className="text-sm text-gray-500">
                      {productType.subcategory[0].category_name_vn}
                    </div>
                  </div>
                )}
              </TableCell>

              <TableCell>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {getShortDescription(productType.description_vn)}
                </div>
              </TableCell>

              <TableCell className="text-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="inline-flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-800">
                      <span className="font-medium">{productType.product_count || 0}</span>
                      <span className="ml-1 text-gray-500 text-sm">sản phẩm</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-2 bg-gray-50 font-semibold border-b">
                      Danh sách sản phẩm ({productType.product_count || 0})
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {productType.products && productType.products.length > 0 ? (
                        <div className="divide-y">
                          {productType.products.map(product => (
                            <div
                              key={product.product_id}
                              className="p-2 flex items-center hover:bg-gray-50 cursor-pointer"
                              onClick={() => onViewProduct && onViewProduct(product.product_id)}
                            >
                              {product.main_image && (
                                <img
                                  src={product.main_image}
                                  alt={product.product_name_vn}
                                  className="w-10 h-10 object-cover rounded-md mr-2"
                                />
                              )}
                              <div className="flex-1">
                                <div className="font-medium">{product.product_name_vn}</div>
                                <div className="text-xs text-gray-500">
                                  Mã: {product.product_code}
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  product.status === 'visible'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                }
                              >
                                {product.status === 'visible' ? 'Hiển thị' : 'Ẩn'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">Không có sản phẩm nào</div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>

              <TableCell className="text-center">{formatDate(productType.created_at)}</TableCell>

              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={
                    productType.status === 'active'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }
                >
                  {productType.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  {onViewDetails && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700"
                      onClick={() => onViewDetails(productType.product_type_id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-amber-100 hover:text-amber-700"
                      onClick={() => onEdit(productType.product_type_id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700"
                    onClick={() => handleDelete(productType)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDeleteModal && selectedProductType && (
        <ProductTypeDeleteModal
          productType={selectedProductType}
          setOpenDeleteModal={setOpenDeleteModal}
          onSuccess={onDeleteSuccess}
        />
      )}
    </div>
  );
}

export default ProductTypeTable;
