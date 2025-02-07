'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import GuestLayout from '@/components/layout/GuestLayout'

export const metadata: Metadata = {
  title: 'Join as a Teacher - LEDU',
}

const formFields = [
  {
    id: 'fullName',
    type: 'text',
    placeholder: 'What is your full name?'
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'What is your email address?'
  },
  {
    id: 'phone',
    type: 'tel',
    placeholder: 'What is your phone number?'
  },
  {
    id: 'subjects',
    type: 'textarea',
    placeholder: 'What are the subjects that you would like to teach?'
  },
  {
    id: 'experience',
    type: 'textarea',
    placeholder: 'What is your previous relevant experience?'
  }
]

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subjects: string;
  experience: string;
  terms: boolean;
}

export default function TeacherApplicationPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    terms: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Handle form submission here
      console.log('Form submitted:', formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <GuestLayout>
      <div className="min-h-screen w-full bg-gradient-to-b from-[#E3F2FD] via-[#BBDEFB] to-[#FFE0B2] py-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-gloria mb-6">Join as a Teacher</h1>
            <p className="text-lg font-verdana text-gray-700">
              We are looking for experienced and passionate teachers to deliver online 
              English lessons to children eager to learn. Share your knowledge and make 
              a lasting impact.
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {formFields.map((field, index) => (
              <div key={field.id} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-gloria">{index + 1}.</span>
                  <div className="flex-1">
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        value={formData[field.id as keyof FormData] as string}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        rows={4}
                        className="w-full bg-white/90 border-2 border-black rounded-3xl px-6 py-4 text-lg font-verdana
                                 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        value={formData[field.id as keyof FormData] as string}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-white/90 border-2 border-black rounded-full px-6 py-4 text-lg font-verdana
                                 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Terms Agreement */}
            <div className="flex items-start gap-4 ml-10">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                required
                className="mt-1 w-5 h-5 rounded border-2 border-black checked:bg-blue-500 appearance-none cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm font-verdana text-gray-700">
                By submitting this form you agree to providing your personal information to us
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-white/90 border-2 border-black rounded-full px-12 py-3 text-xl font-gloria
                         hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  )
}