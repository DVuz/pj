import React, { type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  height?: string;
  id?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name = 'textarea',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = '',
  className = '',
  height = '200px',
  id,
  ...props
}) => {
  const textareaId = id || name;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{ minHeight: height }}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm bg-gray-50 transition-all duration-300 outline-none resize-y
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}
          ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' : 'hover:border-gray-400'}
          ${error ? 'focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'focus:border-green-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'}
          placeholder:text-gray-400`
          .replace(/\s+/g, ' ')
          .trim()}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
