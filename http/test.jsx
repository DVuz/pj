import React from 'react';
import '../styles/DataTable.css';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  onEdit = null,
  onDelete = null,
  onView = null,
}) => {
  const formatDate = dateString => {
    if (!dateString) return <span className="null-value">N/A</span>;
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const stripHtml = html => {
    if (!html) return <span className="null-value">N/A</span>;
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const renderImage = (imageUrl, alt) => {
    if (!imageUrl) {
      return (
        <div className="no-image">
          <span>📷</span>
          <span>No Image</span>
        </div>
      );
    }
    return (
      <img
        src={imageUrl}
        alt={alt || 'Image'}
        className="table-image"
        onError={e => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    switch (column.type) {
      case 'image':
        return (
          <>
            {renderImage(value, item[column.altKey] || 'Image')}
            <div className="no-image" style={{ display: 'none' }}>
              <span>📷</span>
              <span>No Image</span>
            </div>
          </>
        );

      case 'html':
        return <div className="html-content">{stripHtml(value)}</div>;

      case 'date':
        return formatDate(value);

      case 'status':
        return (
          <span className={`status-badge status-${value}`}>
            {column.statusLabels?.[value] || value}
          </span>
        );

      case 'actions':
        return (
          <div className="table-actions">
            {onEdit && (
              <button className="btn-edit" onClick={() => onEdit(item)} title="Chỉnh sửa">
                ✏️
              </button>
            )}
            {onDelete && (
              <button className="btn-delete" onClick={() => onDelete(item)} title="Xóa">
                🗑️
              </button>
            )}
            {onView && (
              <button className="btn-view" onClick={() => onView(item)} title="Xem chi tiết">
                👁️
              </button>
            )}
          </div>
        );

      default:
        return value || <span className="null-value">N/A</span>;
    }
  };

  if (loading) {
    return (
      <div className="data-table-container">
        <div className="loading-state">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key} className={column.className} style={{ width: column.width }}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id || index}>
                  {columns.map(column => (
                    <td key={column.key} className={column.cellClassName}>
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
