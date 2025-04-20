import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  variant?: 'light' | 'dark';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose, variant = 'light' }) => {
  const bgColor = variant === 'light' ? 'bg-red-100' : 'bg-red-900';
  const textColor = variant === 'light' ? 'text-red-800' : 'text-red-100';
  const borderColor = variant === 'light' ? 'border-red-500' : 'border-red-700';

  return (
    <div className={`my-4 p-4 ${bgColor} border-l-4 ${borderColor} rounded ${textColor} relative`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold"
          aria-label="Close error message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
