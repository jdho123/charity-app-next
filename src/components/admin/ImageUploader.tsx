'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  initialImageUrl?: string;
  onImageUpload: (imagePath: string) => void;
  className?: string;
}

export default function ImageUploader({
  initialImageUrl,
  onImageUpload,
  className = '',
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are supported.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Simulate progress (since fetch doesn't provide progress events for FormData)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      // Upload the image
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();

      // Update image URL and call the callback
      setImageUrl(data.imagePath);
      onImageUpload(data.imagePath);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      // Reset progress after a short delay
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
          imageUrl ? 'border-green-300' : 'border-gray-300'
        }`}
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <div className="relative w-full h-[200px]">
            <Image src={imageUrl} alt="Uploaded image" fill className="object-contain" />
          </div>
        ) : (
          <div className="py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">Click to upload image or drag and drop</p>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP, SVG up to 5MB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">Uploading... {uploadProgress}%</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {imageUrl && (
        <div className="mt-2 flex items-center text-sm">
          <span className="text-green-600 mr-1">✓</span>
          <span className="text-gray-700 truncate flex-1">{imageUrl}</span>
        </div>
      )}

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}
