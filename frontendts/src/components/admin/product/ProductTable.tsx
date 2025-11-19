import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate } from '@tanstack/react-router';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductDeleteModal from './ProductDeleteModal';

interface Product {
  product_id: number;
  product_name_vn: string;
  product_code: string;
  description_vn: string;
  price: number;
  category_id: number;
  subcategory_id: number;
  product_type_id: number;
  main_image: string;
  material_vn: string;
  color_vn: string;
  product_type_name_vn: string;
  status?: string;
  created_at?: string;
}

interface ProductTableProps {
  data: Product[];
  isLoading: boolean;
  onDeleteSuccess?: () => void;
}

export function ProductTable({ data, isLoading, onDeleteSuccess }: ProductTableProps) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (productId: number) => {
    navigate({ to: `/admin/products/edit/${productId}` });
  };

  const handleView = (productId: number) => {
    navigate({ to: `/admin/products/detail/${productId}` });
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  if (isLoading) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Đang tải sản phẩm...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead className="w-24">Hình ảnh</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Loại sản phẩm</TableHead>
            <TableHead className="w-32">Giá</TableHead>
            <TableHead className="w-24">Chất liệu</TableHead>
            <TableHead className="w-24">Màu sắc</TableHead>
            <TableHead className="w-28">Trạng thái</TableHead>
            <TableHead className="w-28">Ngày tạo</TableHead>
            <TableHead className="w-36 text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(product => (
            <TableRow key={product.product_id}>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>
                {product.main_image ? (
                  <div className="relative group">
                    <img
                      src={product.main_image}
                      alt={product.product_name_vn}
                      className="w-12 h-12 object-cover rounded cursor-pointer border"
                    />
                    <div className="hidden group-hover:block absolute left-0 top-0 z-10">
                      <img
                        src={product.main_image}
                        alt={product.product_name_vn}
                        className="w-64 h-64 object-cover rounded shadow-lg border"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Không có hình</span>
                )}
              </TableCell>
              <TableCell className="font-medium">{product.product_name_vn}</TableCell>
              <TableCell>{product.product_type_name_vn || '-'}</TableCell>
              <TableCell className="font-semibold text-green-700">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell>{product.material_vn || '-'}</TableCell>
              <TableCell>{product.color_vn || '-'}</TableCell>
              <TableCell>
                <Badge
                  variant={product.status === 'active' ? 'default' : 'secondary'}
                  className={
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }
                >
                  {product.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{formatDate(product.created_at)}</TableCell>
              <TableCell>
                <div className="flex gap-1 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(product.product_id)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Xem chi tiết"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(product.product_id)}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDeleteModal && (
        <ProductDeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          product={selectedProduct}
          onSuccess={onDeleteSuccess}
        />
      )}
    </div>
  );
}

