'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FullHeightLayout from '@/components/layout/FullHeightLayout';
import MultiViewForm, { FormView } from '@/components/shared/MultiViewForm';
import Image from 'next/image';

export default function TeacherApplicationPage() {
  const router = useRouter();
  // Define form views with proper typing
  const formViews: FormView[] = [
    {
      title: 'Basic Information',
      fields: [
        {
          id: 'fullName',
          label: 'What is your full name?',
          type: 'text',
          placeholder: 'Your Answer',
          required: true,
        },
        {
          id: 'email',
          label: 'What is your email address?',
          type: 'email',
          placeholder: 'Your Answer',
          required: true,
        },
        {
          id: 'phone',
          label: 'What is your phone number?',
          type: 'tel',
          placeholder: 'Your Answer',
          required: true,
        },
      ],
    },
    {
      title: 'Subjects',
      fields: [
        {
          id: 'subjects',
          label: 'What are the subjects that you would like to teach?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true,
        },
      ],
    },
    {
      title: 'Experience',
      fields: [
        {
          id: 'experience',
          label: 'What is your previous relevant experience?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true,
        },
      ],
    },
  ];

  // Initial form data
  const initialData = {
    fullName: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    terms: false,
  };

  // Handle form submission
  const handleSubmit = async (formData: unknown) => {
    console.log('Form submitted:', formData);
    // No need to handle the API call here as it's done in MultiViewForm

    // Simulate any additional processing if needed
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  // Navigate to thank you page after successful submission
  const handleSuccess = () => {
    router.push('/thank-you');
  };

  return (
    <FullHeightLayout>
      <div className="min-h-screen h-full flex flex-col pt-20 bg-[#163E42]">
        {/* Header */}
        <div className="bg-[#163E42] py-6 text-center flex justify-center">
          <h1 className="text-5xl text-white font-gloria max-lg:max-w-sm">Join as a Teacher</h1>
        </div>

        {/* Form Component */}
        <div className="flex-1 overflow-auto">
          <MultiViewForm
            views={formViews}
            initialData={initialData}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            getProgressImage={(stage: number) => {
              return (
                <div
                  className="flex items-center justify-center w-12 h-12"
                  style={{
                    position: 'relative',
                    bottom: `-18px`, // ends up being 36px tall
                  }}
                >
                  <Image
                    src={`/progress/apple/${stage - 1}.png`}
                    alt="Progress"
                    width={48}
                    height={48}
                  />
                </div>
              );
            }}
            backgroundColor="linear-gradient(180deg, #163E42 0%, #31848C 100%)"
            hundredPercentColour="#31848C" // Fixed the typo here
            labelColor="white"
            showReviewStep={true}
            thankYouPageUrl="/thank-you" // Add explicit thank you page URL
          />
        </div>
      </div>
    </FullHeightLayout>
  );
}
