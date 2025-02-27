'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FullHeightLayout from '@/components/layout/FullHeightLayout'
import MultiViewForm, { FormView } from '@/components/shared/MultiViewForm'
import Image from 'next/image'

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
      title: 'Student Demographics',
      fields: [
        {
          id: 'ageRange',
          label: 'What is the age range?',
          type: 'text',
          placeholder: 'Your Answer',
          required: true
        },
        {
          id: 'genderRatio',
          label: 'What is their gender ratio?',
          type: 'text',
          placeholder: 'Your Answer',
          required: true
        }
      ]
    },
    {
      title: 'Educational Information',
      fields: [
        {
          id: 'educationalDevelopment',
          label: 'What is their level of educational development in specific subjects?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true
        },
        {
          id: 'teacherConsiderations',
          label: 'Is there anything in particular that you would like the teacher be conscious of?',
          type: 'textarea',
          placeholder: 'Your Answer',
          required: true
        }
      ]
    },
    {
      title: 'Terms Agreement',
      fields: [
        {
          id: 'termsAgreement',
          label: 'By submitting this form you agree to providing your personal information to us',
          type: 'checkbox',
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
    ageRange: '',
    genderRatio: '',
    educationalDevelopment: '',
    teacherConsiderations: '',
    termsAgreement: false,
    finalConfirmation: false
  };

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: Record<string, any>) => {
    console.log('School registration form submitted:', formData);
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
    router.push('/thank-you-school');
  };

  return (
    <FullHeightLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="py-6 text-center bg-[#3D1809]">
          <h1 className="text-5xl text-white font-gloria">Join as a School Partner</h1>
        </div>
        
        {/* Form Component */}
        <div className="flex-1 overflow-auto">
          <MultiViewForm
            views={formViews}
            initialData={initialData}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            progressImage={<Image src="/images/lightStand.png" alt="Progress" width={48} height={48} />}
            backgroundColor="linear-gradient(180deg, #3D1809 0%, #6F4433 100%)"
            hundredPercentColour="#6F4433"
            labelColor="white"
            showReviewStep={true} // We already have 5 views including two agreement views
          />
        </div>
      </div>
    </FullHeightLayout>
  );
}