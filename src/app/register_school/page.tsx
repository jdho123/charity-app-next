'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import GuestLayout from '@/components/layout/GuestLayout'

export const metadata: Metadata = {
  title: 'Join as a School Partner - LEDU',
}

const basicFields = [
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
  }
]

const additionalFields = [
  {
    id: 'ageRange',
    number: '4',
    placeholder: 'What is the age range?',
    rows: 2
  },
  {
    id: 'description',
    number: '5',
    placeholder: 'Please provide a brief description of your school',
    rows: 2
  },
  {
    id: 'educationalLevel',
    number: '6',
    placeholder: 'What is their level of educational development in specific subjects?',
    rows: 3
  },
  {
    id: 'specialConsiderations',
    number: '7',
    placeholder: 'Is there anything in particular that you would like the teacher be conscious of?',
    rows: 3
  }
]

interface SchoolFormData {
  [key: string]: string | boolean;
  fullName: string;
  email: string;
  phone: string;
  ageRange: string;
  description: string;
  educationalLevel: string;
  specialConsiderations: string;
  terms: boolean;
}

export default function SchoolApplicationPage() {
  const [formData, setFormData] = useState<SchoolFormData>({
    fullName: '',
    email: '',
    phone: '',
    ageRange: '',
    description: '',
    educationalLevel: '',
    specialConsiderations: '',
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
            <h1 className="text-5xl font-gloria mb-6">Join as a School Partner</h1>
            <p className="text-lg font-verdana text-gray-700">
              Are you a school looking to provide your students with transformative 
              learning experiences? Partner with LEDU to bring interactive English lessons 
              and inspiring opportunities to your classrooms.
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Fields */}
            {basicFields.map((field, index) => (
              <div key={field.id} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-gloria">{index + 1}.</span>
                  <div className="flex-1">
                    <input
                      type={field.type}
                      id={field.id}
                      value={String(formData[field.id])}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-white/90 border-2 border-black rounded-full px-6 py-4 text-lg font-verdana
                               placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Description of Pupils Section */}
            <div className="ml-10 -mb-4">
              <h3 className="text-xl font-gloria text-gray-700">Description of pupils:</h3>
            </div>

            {/* Additional Fields */}
            {additionalFields.map((field) => (
              <div key={field.id} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-gloria">{field.number}.</span>
                  <div className="flex-1">
                    <textarea
                      id={field.id}
                      value={String(formData[field.id])}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      rows={field.rows}
                      className="w-full bg-white/90 border-2 border-black rounded-3xl px-6 py-4 text-lg font-verdana
                               placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Terms Agreement */}
            <div className="flex items-start gap-4 ml-10">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms as boolean}
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