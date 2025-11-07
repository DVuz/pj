import toast from 'react-hot-toast';

const baseConfig = {
  duration: 4000,
  position: 'top-right' as const,
};

type ToastType = 'success' | 'error' | 'loading' | 'custom';

interface ToastOptions {
  message: string;
  type?: ToastType;
  bgColor?: string;
  icon?: string;
  duration?: number;
}

/**
 * Hiển thị toast tùy chỉnh
 */
export const showToast = ({ message, type = 'success', bgColor, icon, duration }: ToastOptions) => {
  const colors: Record<ToastType, string> = {
    success: '#10b981',
    error: '#ef4444',
    loading: '#3b82f6',
    custom: bgColor || '#374151',
  };

  const toastFn =
    type === 'error' ? toast.error : type === 'loading' ? toast.loading : toast.success;

  toastFn(message, {
    ...baseConfig,
    duration: duration ?? baseConfig.duration,
    style: {
      background: bgColor || colors[type],
      color: 'white',
    },
    icon,
  });
};
