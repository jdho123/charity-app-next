import React from 'react';

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  message = 'Submitting your application...',
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-gloria">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
