import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2, type LucideIcon } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold text-center border-2 border-transparent rounded-xl cursor-pointer transition-all duration-300 outline-none relative overflow-hidden box-border h-11';

  const sizeClasses = {
    small: 'px-3 py-2 text-xs',
    medium: 'px-6 py-2.5 text-sm',
    large: 'px-8 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'bg-green-500 text-white hover:bg-green-600 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.3)]',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    info: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 18,
  };

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      {...props}
    >
      {loading && <Loader2 size={iconSizes[size]} className="animate-spin" />}

      {!loading && Icon && iconPosition === 'left' && <Icon size={iconSizes[size]} />}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && <Icon size={iconSizes[size]} />}
    </button>
  );
};

export default Button;
