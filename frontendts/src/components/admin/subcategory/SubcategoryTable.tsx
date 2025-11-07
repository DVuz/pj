import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Loading from '@/components/ui/Loading';

// Define types
interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
  image_url: string;
  status: string;
  subcategory_id: number;
}

interface Category {
  category_id: number;
  category_name_vn: string;
  image_url: string;
  status: string;
}

interface Subcategory {
  subcategory_id: number;
  category_id: number;
  description_vn: string;
  subcategory_name_vn: string;
  status: string;
  created_at: string;
  product_type_count: number;
  active_product_type_count: number;
  category: Category;
  product_types: ProductType[];
}

interface SubcategoryTableProps {
  data: Subcategory[];
  isLoading: boolean;
  onViewDetails?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function SubcategoryTable({
  data,
  isLoading,
  onViewDetails,
  onEdit,
  onDelete,
}: SubcategoryTableProps) {
  // Hiển thị trạng thái đang tải
  if (isLoading) {
    return (
      <div className="w-full border rounded-md p-8">
        <Loading text="Đang tải danh mục con..." type='div' />
      </div>
    );
  }

  // Hiển thị khi không có dữ liệu
  if (!data || data.length === 0) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Không tìm thấy danh mục con nào</p>
        </div>
      </div>
    );
  }

  // Format ngày tháng
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>THÔNG TIN DANH MỤC CON</TableHead>
            <TableHead>DANH MỤC CHA</TableHead>
            <TableHead>MÔ TẢ</TableHead>
            <TableHead>LOẠI SẢN PHẨM</TableHead>
            <TableHead>THỜI GIAN TẠO</TableHead>
            <TableHead>TRẠNG THÁI</TableHead>
            <TableHead className="text-center">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(subcategory => (
            <TableRow key={subcategory.subcategory_id}>
              <TableCell>
                <div className="font-medium">{subcategory.subcategory_name_vn}</div>
                <div className="text-sm text-gray-500">ID: {subcategory.subcategory_id}</div>
              </TableCell>
              <TableCell>
                {subcategory.category && (
                  <div className="flex items-center space-x-2">
                    {subcategory.category.image_url && (
                      <img
                        src={subcategory.category.image_url}
                        alt={subcategory.category.category_name_vn}
                        className="w-6 h-6 object-cover rounded-sm"
                      />
                    )}
                    <span>{subcategory.category.category_name_vn}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="max-w-[200px]">
                <div className="truncate text-sm text-gray-600">
                  {subcategory.description_vn
                    ? subcategory.description_vn.replace(/<[^>]*>/g, '')
                    : '-'}
                </div>
              </TableCell>
              <TableCell>
                {subcategory.product_type_count > 0 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help text-blue-600 font-medium flex items-center">
                          {subcategory.product_type_count} loại
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="w-48 p-0 overflow-hidden rounded-md border shadow-lg bg-white"
                      >
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <p className="font-semibold text-gray-800">Danh sách loại sản phẩm</p>
                        </div>
                        <div className="p-3 max-h-[250px] overflow-y-auto bg-white">
                          <ul className="space-y-1.5">
                            {subcategory.product_types.map(pt => (
                              <li
                                key={pt.product_type_id}
                                className="flex items-center gap-1.5 text-sm text-gray-700"
                              >
                                {pt.status === 'active' ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                ) : (
                                  <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                                )}
                                <span className="flex-1">{pt.product_type_name_vn}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-gray-500">0 loại</span>
                )}
              </TableCell>
              <TableCell>{formatDate(subcategory.created_at)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    subcategory.status === 'active'
                      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  }
                >
                  {subcategory.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  {onViewDetails && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700"
                      onClick={() => onViewDetails(subcategory.subcategory_id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-amber-100 hover:text-amber-700"
                      onClick={() => onEdit(subcategory.subcategory_id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700"
                      onClick={() => onDelete(subcategory.subcategory_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SubcategoryTable;
