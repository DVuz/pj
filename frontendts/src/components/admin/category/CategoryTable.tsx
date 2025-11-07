import React from 'react';
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
import { Edit, Trash2, Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Categories } from '@/types/category.type';

// Kiểu dữ liệu danh mục
// interface Category {
//   category_id: number;
//   category_name_vn: string;
//   description_vn: string | null;
//   image_url: string;
//   status: string;
//   created_at: string | null;
//   updated_at: string | null;
// }

interface CategoryTableProps {
  data: Categories[];
  isLoading: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

export function CategoryTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onViewDetails,
}: CategoryTableProps) {
  // Hiển thị trạng thái đang tải
  if (isLoading) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Đang tải danh mục...</span>
        </div>
      </div>
    );
  }

  // Hiển thị khi không có dữ liệu
  if (!data || data.length === 0) {
    return (
      <div className="w-full border rounded-md p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Không tìm thấy danh mục nào</p>
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
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead className="w-[150px]">Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="w-[100px]">Hình ảnh</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[100px]">Ngày tạo</TableHead>
            <TableHead className="text-center w-[150px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(category => (
            <TableRow key={category.category_id}>
              <TableCell>{category.category_id}</TableCell>
              <TableCell className="font-medium">{category.category_name_vn}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {category.description_vn || '-'}
              </TableCell>
              <TableCell>
                {category.image_url ? (
                  <div className="relative group">
                    <img
                      src={category.image_url}
                      alt={category.category_name_vn}
                      className="w-10 h-10 object-cover rounded cursor-pointer border"
                    />
                    {/* Hiển thị ảnh lớn khi hover */}
                    <div className="hidden group-hover:block absolute -left-24 top-0 z-10">
                      <img
                        src={category.image_url}
                        alt={category.category_name_vn}
                        className="w-48 h-48 object-cover rounded shadow-lg border"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Không có hình</span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={category.status === 'active' ? 'default' : 'secondary'}
                  className={
                    category.status === 'active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }
                >
                  {category.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{formatDate(category.created_at)}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <div className="flex items-center justify-center gap-1">
                    {/* Nút xem chi tiết */}
                    {onViewDetails && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700"
                            onClick={() => onViewDetails(category.category_id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Xem chi tiết</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {/* Nút chỉnh sửa */}
                    {onEdit && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700"
                            onClick={() => onEdit(category.category_id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Chỉnh sửa</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {/* Nút xóa */}
                    {onDelete && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700"
                            onClick={() => onDelete(category.category_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Xóa</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
