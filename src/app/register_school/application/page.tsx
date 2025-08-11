'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FullHeightLayout from '@/components/layout/FullHeightLayout';
import MultiViewForm, { FormView } from '@/components/shared/MultiViewForm';
import Image from 'next/image';

export default function SchoolRegistrationPage() {
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
      title: 'Student Demographics',
      fields: [
        {
          id: 'ageRange',
          label: 'What is the age range?',
          type: 'text',
          placeholder: 'Your Answer',
          required: true,
        },
        {
          id: 'genderRatio',
          label: 'What is their gender ratio?',
          type: 'text',
          placeholder: 'Your Answer',
          required: true,
        },
      ],
    },
    {
      title: 'Educational Information',
      fields: [
        {
          id: 'educationalDevelopment',
          label: 'What is their level of educational development in specific subjects?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true,
        },
        {
          id: 'teacherConsiderations',
          label: 'Is there anything in particular that you would like the teacher be conscious of?',
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
    ageRange: '',
    genderRatio: '',
    educationalDevelopment: '',
    teacherConsiderations: '',
    terms: false,
  };

  // Handle form submission
  const handleSubmit = async (formData: unknown) => {
    console.log('School registration form submitted:', formData);
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
    router.push('/thank-you-school');
  };

  return (
    <FullHeightLayout>
      <div className="h-full flex flex-col pt-20 bg-[#3D1809]">
        {/* Header */}
        <div className="py-6 text-center bg-[#3D1809] flex justify-center">
          <h1 className="text-5xl text-white font-gloria max-lg:max-w-sm">
            Join as a School Partner
          </h1>
        </div>

        {/* Form Component */}
        <div className="flex-1 overflow-auto">
          <MultiViewForm
            views={formViews}
            initialData={initialData}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            getProgressImage={(stage: number) => {
              // Base size + growth factor based on stage
              const baseSize = 48;
              const growthFactor = (stage - 1) * 70;
              const imageSize = baseSize + growthFactor;

              return (
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    transform: 'translateX(40%) translateY(10%)',
                  }}
                >
                  <Image
                    src={`/progress/lamp/${stage - 1}.png`}
                    alt={`Progress Stage ${stage}`}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain transition-all duration-500"
                  />
                </div>
              );
            }}
            backgroundColor="linear-gradient(180deg, #3D1809 0%, #6F4433 100%)"
            hundredPercentColour="#6F4433"
            labelColor="white"
            showReviewStep={true}
            thankYouPageUrl="/thank-you-school" // Add explicit thank you page URL
          />
        </div>
      </div>
    </FullHeightLayout>
  );
}
