import { useCallback, useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  id?: string | number;
  message: string | boolean;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number; // Optional: customizable duration
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

   const handleClose = useCallback(() => {
    setIsVisible(false);
    const timer = setTimeout(onClose, 300);
    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    // Set timer to auto-close
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, handleClose]);

  const icon = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  }[type];

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  }[type];

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center p-4 rounded-lg shadow-lg border ${bgColor} min-w-[300px] max-w-md`}>
        <div className="mr-3">
          {icon}
        </div>
        <span className={`text-sm font-medium ${textColor} grow`}>
          {message}
        </span>
        <button
          onClick={handleClose}
          className="ml-4 p-1 hover:bg-white hover:bg-opacity-30 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;