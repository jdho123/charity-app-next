/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import BorderedText from '@/components/shared/BorderedText';
import ProgressIndicator from './ProgressIndicator';
import FormControls from './FormControls';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'checkbox';
  placeholder?: string;
  required?: boolean;
}

export interface FormView {
  title?: string;
  fields: FormField[];
}

interface MultiViewFormProps {
  views: FormView[];
  initialData: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void;
  getProgressImage: (stage: number) => ReactNode;
  backgroundColor?: string;
  hundredPercentColour?: string;
  labelColor?: string;
  showReviewStep?: boolean;
  reviewTitle?: string;
  onSuccess?: () => void;
  thankYouPageUrl?: string;
}

export default function MultiViewForm({
  views,
  initialData,
  onSubmit,
  getProgressImage,
  backgroundColor = 'linear-gradient(180deg, #163E42 0%, #31848C 100%)',
  hundredPercentColour = '#31848C',
  labelColor = 'white',
  showReviewStep = true,
  reviewTitle = 'Review your information:',
  onSuccess,
  thankYouPageUrl = '/thank-you',
}: MultiViewFormProps) {
  // Always call useRouter unconditionally
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Add a review view if showReviewStep is true
  const allViews = showReviewStep
    ? [
        ...views,
        {
          title: 'Complete Your Application',
          fields: [
            {
              id: 'terms',
              label:
                'By submitting this form you agree to providing your personal information to us',
              type: 'checkbox',
              required: true,
              placeholder: '',
            },
          ],
        },
      ]
    : views;

  const [currentView, setCurrentView] = useState(1);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  // Update progress when view changes
  useEffect(() => {
    const totalViews = allViews.length;
    const newProgress = ((currentView - 1) / (totalViews - 1)) * 100;
    setProgress(newProgress);
  }, [currentView, allViews.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current view before submitting
    if (!validateCurrentView()) {
      return; // Don't submit if validation fails
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Call the custom onSubmit handler if provided
      if (onSubmit) {
        await onSubmit(formData);
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // If submission is successful
      setSubmitting(false);

      // If onSuccess callback exists, call it
      if (onSuccess) {
        onSuccess();
      } else {
        // Default behavior: redirect to thank you page
        if (router) {
          router.push(thankYouPageUrl);
        } else {
          // Fallback for when router isn't available
          window.location.href = thankYouPageUrl;
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
      setSubmitting(false);
    }
  };

  const validateCurrentView = (): boolean => {
    const currentFields = allViews[currentView - 1].fields;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check each required field in the current view
    currentFields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id];

        // Check if field is empty or only whitespace
        if (
          value === undefined ||
          value === null ||
          (typeof value === 'string' && value.trim() === '') ||
          (field.type === 'checkbox' && !value)
        ) {
          newErrors[field.id] = `${field.label.split('?')[0].trim()} is required`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const nextView = () => {
    // Validate current view before proceeding
    if (!validateCurrentView()) {
      return; // Don't proceed if validation fails
    }

    if (currentView < allViews.length) {
      setCurrentView(currentView + 1);
    } else {
      // If on the last view, submit the form
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const prevView = () => {
    if (currentView > 1) {
      setCurrentView(currentView - 1);
    }
  };

  // Render fields for current view
  const renderFields = () => {
    const currentFields = allViews[currentView - 1].fields;

    // If this is the review step
    if (showReviewStep && currentView === allViews.length) {
      return (
        <div className="bg-white/20 rounded-3xl p-6 md:p-8 border-2 border-white/40">
          <h2 className={`text-${labelColor} text-2xl font-gloria mb-6 text-center`}>
            {allViews[currentView - 1].title || 'Complete Your Application'}
          </h2>

          {/* Error message if submission failed */}
          {submitError && (
            <ErrorMessage
              message={submitError}
              variant="dark"
              onClose={() => setSubmitError(null)}
            />
          )}

          {/* Checkbox for terms */}
          <div className="flex items-start gap-4 mb-8">
            <input
              type="checkbox"
              id="terms"
              checked={!!formData.terms}
              onChange={handleInputChange}
              required
              className={`mt-1 w-5 h-5 rounded border-2 ${
                errors.terms ? 'border-red-500' : 'border-white'
              } checked:bg-blue-500 appearance-none cursor-pointer`}
            />
            <div>
              <label htmlFor="terms" className={`text-base font-verdana text-${labelColor}`}>
                {currentFields[0].label}
              </label>
              {errors.terms && <p className="mt-1 text-red-300 text-sm">{errors.terms}</p>}
            </div>
          </div>

          {/* Review data section */}
          <div className={`space-y-2 text-${labelColor}`}>
            <h3 className="font-gloria text-xl mb-2">{reviewTitle}</h3>
            {Object.entries(formData)
              .filter(([key]) => key !== 'terms')
              .map(([key, value]) => {
                // Find the field label from all views
                const field = views.flatMap((v) => v.fields).find((f) => f.id === key);
                const label = field?.label || key;

                return (
                  <p key={key}>
                    <strong>{label.split('?')[0].trim()}:</strong> {String(value)}
                  </p>
                );
              })}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 md:space-y-12">
        {currentFields.map((field) => (
          <div key={field.id} className="relative">
            <BorderedText
              as="h2"
              className="mb-4 md:mb-6"
              lineWidth="6px"
              lineColor={labelColor}
              padding="1rem"
              textClassName={`text-${labelColor} text-2xl md:text-3xl font-gloria`}
            >
              {field.label}
            </BorderedText>

            {field.type === 'textarea' ? (
              <div>
                <textarea
                  id={field.id}
                  value={formData[field.id] || ''}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || 'Your Answer'}
                  required={field.required}
                  rows={6}
                  className={`w-full bg-white/90 border-2 ${
                    errors[field.id] ? 'border-red-500' : 'border-black'
                  } rounded-3xl px-6 py-4 text-lg font-verdana
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px] md:min-h-[150px]`}
                />
                {errors[field.id] && (
                  <p className="mt-2 text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-start flex-col">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={field.id}
                    checked={!!formData[field.id]}
                    onChange={handleInputChange}
                    required={field.required}
                    className={`w-5 h-5 rounded border-2 ${
                      errors[field.id] ? 'border-red-500' : 'border-black'
                    } checked:bg-blue-500 appearance-none cursor-pointer`}
                  />
                  <label htmlFor={field.id} className="ml-2 text-lg font-verdana text-white">
                    {field.label}
                  </label>
                </div>
                {errors[field.id] && (
                  <p className="mt-2 text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ) : (
              <div>
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ''}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || 'Your Answer'}
                  required={field.required}
                  className={`w-full bg-white/90 border-2 ${
                    errors[field.id] ? 'border-red-500' : 'border-black'
                  } rounded-full px-6 py-4 text-lg font-verdana
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field.id] && (
                  <p className="mt-2 text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col" style={{ background: backgroundColor }}>
      {/* Loading overlay */}
      <LoadingOverlay show={submitting} />

      <div className="max-w-3xl mx-auto px-4 w-full flex-1 flex flex-col overflow-auto pb-24 pt-6 md:pt-8">
        <form className="space-y-8 md:space-y-12 flex-1 flex flex-col" onSubmit={handleSubmit}>
          {renderFields()}
        </form>
      </div>

      {/* Fixed Navigation Buttons */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{ background: hundredPercentColour }}
      >
        <FormControls
          handleSubmit={handleSubmit}
          nextView={nextView}
          prevView={prevView}
          getProgressImage={getProgressImage}
          viewCount={allViews.length}
          currentView={currentView}
          progress={progress}
        />
      </div>
    </div>
  );
}
