'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FullHeightLayout from '@/components/layout/FullHeightLayout'
import MultiViewForm, { FormView } from '@/components/shared/MultiViewForm'
import Image from 'next/image'

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
          required: true
        },
        {
          id: 'email',
          label: 'What is your email address?',
          type: 'email',
          placeholder: 'Your Answer',
          required: true
        },
        {
          id: 'phone',
          label: 'What is your phone number?',
          type: 'tel',
          placeholder: 'Your Answer',
          required: true
        }
      ]
    },
    {
      title: 'Subjects',
      fields: [
        {
          id: 'subjects',
          label: 'What are the subjects that you would like to teach?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true
        }
      ]
    },
    {
      title: 'Experience',
      fields: [
        {
          id: 'experience',
          label: 'What is your previous relevant experience?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true
        }
      ]
    }
  ];

  // Initial form data
  const initialData = {
    fullName: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    terms: false
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: Record<string, any>) => {
    console.log('Form submitted:', formData);
    // Handle submission (API call, etc.)
    
    // For now, just simulate an API call with a timeout
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
      <div className="min-h-screen h-full flex flex-col">
        {/* Header */}
        <div className="bg-[#163E42] py-6 text-center">
          <h1 className="text-5xl text-white font-gloria">Join as a Teacher</h1>
        </div>
        
        {/* Form Component */}
        <div className="flex-1 overflow-auto">
          <MultiViewForm
          views={formViews}
          initialData={initialData}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
          progressImage={<Image src="/images/apple.png" alt="Progress" width={48} height={48} />}
          backgroundColor="linear-gradient(180deg, #163E42 0%, #31848C 100%)"
          hundredPercentColour="#31848"
          labelColor="white"
          showReviewStep={true}
        />
        </div>
      </div>
    </FullHeightLayout>
  );
}