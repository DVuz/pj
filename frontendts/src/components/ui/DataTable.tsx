import React from 'react';
import { Eye, Pencil, Trash, FileX } from 'lucide-react';

// Column definition type
export interface DataTableColumn<T = unknown> {
  key: string;
  title: string;
  type?: 'text' | 'image' | 'date' | 'html' | 'status' | 'actions' | 'custom';
  width?: string | number;
  altKey?: string;
  statusLabels?: Record<string, string>;
  render?: (item: T) => React.ReactNode;
}

// Main props interface
export interface DataTableProps<T = unknown> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  totalItems?: number;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  emptyMessage?: {
    title?: string;
    description?: string;
    subDescription?: string;
  };
  getRowKey?: (item: T) => React.Key;
  className?: string;
}

const DataTable = <T extends object>({
  data = [],
  columns = [],
  loading = false,
  totalItems = 0,
  onEdit,
  onDelete,
  onView,
  emptyMessage = {
    title: 'Không có dữ liệu',
    description: 'Hiện tại không có mục nào để hiển thị.',
    subDescription: 'Hãy thử điều chỉnh bộ lọc hoặc thêm dữ liệu mới.',
  },
  getRowKey = (item: T) => {
    const id = (item as unknown as { id?: React.Key }).id;
    return id ?? Math.random().toString(36).substring(2, 9);
  },
  className = '',
}: DataTableProps<T>) => {
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) {
      return (
        <span className="text-gray-400 italic text-xs bg-gray-100 px-2 py-1 rounded">N/A</span>
      );
    }
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const stripHtml = (html: string | null | undefined) => {
    if (!html) {
      return (
        <span className="text-gray-400 italic text-xs bg-gray-100 px-2 py-1 rounded">N/A</span>
      );
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const renderImage = (imageUrl: string | null | undefined, alt: string = 'Image') => {
    return (
      <img
        src={imageUrl || 'https://via.placeholder.com/80?text=No+Image'}
        alt={alt}
        className="w-12 h-12 object-cover rounded border border-gray-200"
        onError={e => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Error';
        }}
      />
    );
  };

  const renderCellContent = (item: T, column: DataTableColumn<T>): React.ReactNode => {
    if (column.type === 'custom' && column.render) {
      return column.render(item);
    }

    const value = item[column.key as keyof T];

    switch (column.type) {
      case 'image':
        return renderImage(
          value as string,
          column.altKey ? String(item[column.altKey as keyof T] || '') : 'Image'
        );

      case 'date':
        return formatDate(value as string | Date);

      case 'html':
        return (
          <div className="line-clamp-2 text-gray-600 text-sm max-w-xs">
            {stripHtml(value as string)}
          </div>
        );

      case 'status': {
        const statusClass =
          String(value).toLowerCase() === 'active'
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300';

        return (
          <span
            className={`px-2 py-1 text-xs font-medium rounded capitalize inline-block ${statusClass}`}
          >
            {/* Sửa lỗi: cast về string */}
            {String(column.statusLabels?.[String(value)] || value)}
          </span>
        );
      }

      case 'actions':
        return (
          <div className="flex gap-1.5 items-center justify-center">
            {onView && (
              <button
                onClick={() => onView(item)}
                title="View"
                className="bg-white border border-gray-300 rounded p-1.5 hover:bg-blue-50 hover:border-blue-400 hover:-translate-y-0.5 transition-all text-blue-500"
                type="button"
              >
                <Eye size={16} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                title="Edit"
                className="bg-white border border-gray-300 rounded p-1.5 hover:bg-amber-50 hover:border-amber-400 hover:-translate-y-0.5 transition-all text-amber-500"
                type="button"
              >
                <Pencil size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item)}
                title="Delete"
                className="bg-white border border-gray-300 rounded p-1.5 hover:bg-red-50 hover:border-red-400 hover:-translate-y-0.5 transition-all text-red-500"
                type="button"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        );

      default:
        return value !== null && value !== undefined ? (
          <span>{String(value)}</span>
        ) : (
          <span className="text-gray-400 italic text-xs bg-gray-100 px-2 py-1 rounded">N/A</span>
        );
    }
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 m-4 ${className}`}
      >
        <div className="px-4 py-3 bg-slate-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <span>Tổng số: ... mục</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {columns.map(column => (
                  <th
                    key={column.key}
                    className="bg-slate-50 text-gray-700 font-semibold px-2.5 py-3 text-left border-b-2 border-gray-200 text-xs whitespace-nowrap"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} className="animate-pulse">
                  {columns.map(column => (
                    <td
                      key={`skeleton-cell-${rowIndex}-${column.key}`}
                      className="px-2.5 py-4 border-b border-gray-100"
                    >
                      <div className="flex gap-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1"></div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Sửa lỗi: bỏ jsx prop */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .animate-shimmer {
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div>
    );
  }

  if (!data.length || totalItems === 0) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 m-4 ${className}`}
      >
        <div className="px-4 py-3 bg-slate-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <span>Tổng số: 0 mục</span>
        </div>
        <div className="min-h-[320px] bg-white rounded-lg flex items-center justify-center">
          <div className="text-center max-w-md px-5">
            <FileX size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{emptyMessage.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{emptyMessage.description}</p>
            <p className="text-sm text-gray-600">{emptyMessage.subDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 m-4 ${className}`}
    >
      <div className="px-4 py-3 bg-slate-50 border-b border-gray-200 text-sm font-medium text-gray-700">
        <span>Tổng số: {totalItems || data.length} mục</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-max">
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className="bg-slate-50 text-gray-700 font-semibold px-2.5 py-3 text-left border-b-2 border-gray-200 text-xs whitespace-nowrap"
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={getRowKey(item)} className="hover:bg-gray-50 transition-colors">
                {columns.map(column => (
                  <td
                    key={`${getRowKey(item)}-${column.key}`}
                    className="px-2.5 py-3 border-b border-gray-100 text-gray-700 align-middle"
                  >
                    {renderCellContent(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
