import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

type OptionValue = string | number;

export interface SelectOption {
  value: OptionValue;
  label: string;
}

export interface SelectProps {
  label?: string;
  name?: string;
  value?: OptionValue | OptionValue[];
  onChange?: (e: { target: { name?: string; value: OptionValue | OptionValue[] } }) => void;
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Chọn một tùy chọn...',
  required = false,
  disabled = false,
  error = '',
  searchable = false,
  multiple = false,
  clearable = false,
  className = '',
  style = {},
  // ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<OptionValue | OptionValue[] | undefined>(
    multiple ? (Array.isArray(value) ? value : []) : value
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelected(multiple ? (Array.isArray(value) ? value : []) : value);
  }, [value, multiple]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    const q = searchTerm.toLowerCase();
    return options.filter(o => o.label.toLowerCase().includes(q));
  }, [options, searchable, searchTerm]);

  const isOptionSelected = (optValue: OptionValue) => {
    if (multiple) {
      return Array.isArray(selected) && selected.includes(optValue);
    }
    return selected === optValue;
  };

  const getDisplayValue = () => {
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : [];
      if (arr.length === 0) return placeholder;
      if (arr.length === 1) {
        const opt = options.find(o => o.value === arr[0]);
        return opt ? opt.label : String(arr[0]);
      }
      return `${arr.length} mục đã chọn`;
    } else {
      const opt = options.find(o => o.value === selected);
      return opt ? opt.label : placeholder;
    }
  };

  const triggerChange = (newValue: OptionValue | OptionValue[] | undefined) => {
    onChange?.({ target: { name, value: newValue as OptionValue | OptionValue[] } });
  };

  const handleOptionClick = (opt: SelectOption) => {
    if (disabled) return;
    if (multiple) {
      const prev = Array.isArray(selected) ? [...selected] : [];
      const exists = prev.includes(opt.value);
      const next = exists ? prev.filter(v => v !== opt.value) : [...prev, opt.value];
      setSelected(next);
      triggerChange(next);
    } else {
      setSelected(opt.value);
      triggerChange(opt.value);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn không cho sự kiện click lan đến toggle
    const newValue = multiple ? ([] as OptionValue[]) : ('' as OptionValue);
    setSelected(newValue);
    triggerChange(newValue);
    setSearchTerm('');
  };

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  // Kiểm tra hiện có giá trị được chọn không
  const hasValue = multiple
    ? Array.isArray(selected) && selected.length > 0
    : selected !== undefined && selected !== '';

  return (
    <div className={`${className}`} style={{ marginBottom: '1.5rem', ...style }} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Wrapper div chứa button toggle và button clear */}
        <div
          className={`
            w-full flex items-center justify-between rounded-lg border-2 transition-all
            ${error ? 'border-red-500' : isOpen ? 'border-green-500 shadow-sm' : 'border-gray-200'}
            ${disabled ? 'bg-gray-100 opacity-75 cursor-not-allowed' : 'bg-white'}
          `}
        >
          {/* Button toggle */}
          <div
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            onClick={handleSelectClick}
            className={`
              flex-1 flex items-center py-3 px-4 text-left cursor-pointer
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
            tabIndex={disabled ? -1 : 0}
          >
            <span
              className={`
                flex-1 truncate
                ${hasValue ? 'text-gray-800' : 'text-gray-400'}
              `}
            >
              {getDisplayValue()}
            </span>

            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ml-2 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Clear button - positioned separately */}
          {clearable && hasValue && !disabled && (
            <div
              onClick={handleClear}
              className="px-2 h-full flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-700"
              role="button"
              aria-label="Clear selection"
              tabIndex={0}
            >
              <X size={16} />
            </div>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 left-0 right-0 bg-white border-2 border-gray-200 rounded-b-lg shadow-lg max-h-64 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            )}

            <div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => {
                  const selectedFlag = isOptionSelected(opt.value);
                  return (
                    <div
                      key={String(opt.value)}
                      role="option"
                      aria-selected={selectedFlag}
                      onClick={() => handleOptionClick(opt)}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors
                        ${selectedFlag ? 'bg-green-50 font-medium text-gray-800' : 'text-gray-700'}
                      `}
                    >
                      <span>{opt.label}</span>
                      {selectedFlag && <Check size={16} className="text-green-500" />}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">
                  {searchTerm ? 'Không tìm thấy kết quả' : 'Không có tùy chọn'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
