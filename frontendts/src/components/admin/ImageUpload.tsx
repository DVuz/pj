import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Upload, X, Image, Eye, Trash2 } from 'lucide-react';

// Modal component để preview ảnh
interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">{imageName}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="p-5 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={imageName}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

// Preview Item Interface
interface PreviewItem {
  file: File;
  url: string;
  id: string;
}

// Main Component Props
export interface ImageUploadProps {
  label?: string;
  name?: string;
  onChange?: (event: {
    target: { name: string; value: File | File[] | null; files: File[] };
  }) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  required?: boolean;
  disabled?: boolean;
  error?: string;
  preview?: boolean;
  className?: string;
}

export interface ImageUploadRef {
  clearAll: () => void;
  clearAllWithToast: () => void;
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  (
    {
      label = 'Hình ảnh',
      name = 'image',
      onChange,
      accept = 'image/*',
      multiple = false,
      maxSize = 5,
      required = false,
      disabled = false,
      error = '',
      preview = true,
      className = '',
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [previews, setPreviews] = useState<PreviewItem[]>([]);
    const [previewModal, setPreviewModal] = useState({
      isOpen: false,
      imageUrl: '',
      imageName: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      clearAll: () => clearAll(),
      clearAllWithToast: () => clearAll(),
    }));

    // Validate file
    const validateFile = (file: File): boolean => {
      const sizeInMB = file.size / (1024 * 1024);
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (sizeInMB > maxSize) {
        console.warn(`File "${file.name}" quá lớn! Kích thước tối đa: ${maxSize}MB`);
        return false;
      }

      if (!allowedTypes.includes(file.type)) {
        console.warn(
          `File "${file.name}" không đúng định dạng! Chỉ chấp nhận: JPG, PNG, GIF, WEBP`
        );
        return false;
      }

      return true;
    };

    // Handle file changes
    const handleFileChange = (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles: File[] = [];

      fileArray.forEach(file => {
        if (validateFile(file)) {
          validFiles.push(file);
        }
      });

      if (preview && validFiles.length > 0) {
        const newPreviews: PreviewItem[] = validFiles.map(file => ({
          file,
          url: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        }));

        if (multiple) {
          setPreviews(prev => [...prev, ...newPreviews]);
        } else {
          previews.forEach(p => URL.revokeObjectURL(p.url));
          setPreviews(newPreviews);
        }
      }

      if (validFiles.length > 0) {
        const resultFiles = multiple ? validFiles : validFiles[0];
        onChange?.({
          target: {
            name,
            value: resultFiles,
            files: validFiles,
          },
        });
      }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files);
    };

    // Handle drag events
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      handleFileChange(files);
    };

    // Open/Close preview modal
    const openPreview = (imageUrl: string, imageName: string) => {
      setPreviewModal({ isOpen: true, imageUrl, imageName });
    };

    const closePreview = () => {
      setPreviewModal({ isOpen: false, imageUrl: '', imageName: '' });
    };

    // Remove preview
    const removePreview = (id: string) => {
      const newPreviews = previews.filter(p => p.id !== id);
      const removedPreview = previews.find(p => p.id === id);

      if (removedPreview) {
        URL.revokeObjectURL(removedPreview.url);
      }

      setPreviews(newPreviews);

      const remainingFiles = newPreviews.map(p => p.file);
      const resultFiles = multiple ? remainingFiles : remainingFiles[0] || null;

      onChange?.({
        target: {
          name,
          value: resultFiles,
          files: remainingFiles,
        },
      });
    };

    // Clear all
    const clearAll = () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
      setPreviews([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onChange?.({
        target: {
          name,
          value: multiple ? [] : null,
          files: [],
        },
      });
    };

    // Click to upload
    const handleClick = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <>
        <div className={`mb-6 ${className}`}>
          {/* Label */}
          {label && (
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-xl p-4 text-center cursor-pointer
              transition-all duration-300 ease-in-out
              ${error ? 'border-red-500 bg-red-50' : ''}
              ${dragActive ? 'border-green-500 bg-green-50 scale-[1.02]' : 'border-gray-300 bg-gray-50'}
              ${disabled ? 'cursor-not-allowed opacity-60 bg-gray-100' : 'hover:border-green-500 hover:bg-green-50'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              disabled={disabled}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-2">
              <Upload
                size={32}
                className={`transition-all duration-300 ${
                  dragActive ? 'text-green-500 animate-bounce' : 'text-gray-500'
                }`}
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Kéo thả hoặc <span className="text-green-500 underline">chọn file</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF, WEBP (tối đa {maxSize}MB)
                  {multiple && ' - Nhiều file'}
                </p>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-xs font-medium mt-2 flex items-center gap-1">
              {error}
            </div>
          )}

          {/* Preview Area */}
          {preview && previews.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image size={16} />
                  Hình ảnh đã chọn ({previews.length})
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={disabled}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-500 bg-white border border-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} />
                  Xóa tất cả
                </button>
              </div>

              <div
                className={`
                  grid gap-3
                  ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[300px] overflow-y-auto' : 'grid-cols-1 max-w-xs'}
                `}
              >
                {previews.map(item => (
                  <div
                    key={item.id}
                    className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
                  >
                    <div className="relative pb-[75%]">
                      <img
                        src={item.url}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            openPreview(item.url, item.file.name);
                          }}
                          className="p-2 bg-white/90 hover:bg-white rounded-md text-gray-700 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            removePreview(item.id);
                          }}
                          disabled={disabled}
                          className="p-2 bg-red-500/90 hover:bg-red-500 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-700 truncate">{item.file.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        <ImagePreviewModal
          isOpen={previewModal.isOpen}
          onClose={closePreview}
          imageUrl={previewModal.imageUrl}
          imageName={previewModal.imageName}
        />
      </>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
