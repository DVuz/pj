import React, { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: LucideIcon;
  className?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = '',
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const inputId = id || name;

  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={isPassword ? 'current-password' : name === 'email' ? 'email' : undefined}
          className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm bg-gray-50 transition-all duration-300 outline-none box-border
            ${Icon ? 'pl-12' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} h-11
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}
            ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' : 'hover:border-gray-400'}
            ${error ? 'focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'focus:border-green-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'}
            placeholder:text-gray-400`
            .replace(/\s+/g, ' ')
            .trim()}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
