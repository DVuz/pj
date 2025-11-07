import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Pagination as PaginationType } from '@/types/common.types';

interface CustomPaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  showInfo?: boolean;
  limitOptions?: number[];
}

export function CustomPagination({
  pagination,
  onPageChange,
  onLimitChange,
  showInfo = true,
  limitOptions = [5, 10, 20, 50, 100],
}: CustomPaginationProps) {
  const { page, limit, total, totalPages } = pagination;

  const generatePageNumbers = () => {
    const pages: (number | '...')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages;
  };

  // ...existing code...
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Info */}
      <div className="flex items-center min-w-0">
        {showInfo && (
          <div className="text-sm text-muted-foreground truncate">
            Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, total)} / {total}
          </div>
        )}
      </div>

      {/* Middle: Items per page (chỉ hiện khi onLimitChange có) */}
      {onLimitChange && (
        <div className="flex items-center gap-2 text-sm justify-center">
          <Select value={limit.toString()} onValueChange={value => onLimitChange(parseInt(value))}>
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">/ trang</span>
        </div>
      )}

      {/* Right: Pagination controls */}
      <div className="flex items-center justify-end min-w-0">
        {totalPages > 1 && (
          <Pagination className="w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && onPageChange(page - 1)}
                  className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {generatePageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(pageNum as number)}
                      isActive={pageNum === page}
                      className={`cursor-pointer transition-colors duration-150 ${
                        pageNum === page
                          ? 'bg-[var(--green-primary)] text-white hover:bg-[var(--green-primary)]/90'
                          : 'hover:bg-[color:var(--green-primary)_/_0.12] hover:text-[var(--green-primary)]'
                      } px-2 py-1 rounded`}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && onPageChange(page + 1)}
                  className={
                    page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
  // ...existing code...
}
