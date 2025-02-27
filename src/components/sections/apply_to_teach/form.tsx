'use client'
import { useState, useEffect } from 'react'
import GuestLayout from '@/components/layout/GuestLayout'
import PageTitle from '@/components/shared/PageTitle'
import BorderedText from '@/components/shared/BorderedText'

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subjects: string;
  experience: string;
  terms: boolean;
}

export default function TeacherApplicationPage() {
  const [currentView, setCurrentView] = useState(1);
  const [progress, setProgress] = useState(0); // Progress percentage
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    terms: false
  });

  // Update progress indicator when view changes
  useEffect(() => {
    // 4 views total, so each view is 25% of progress
    // We subtract 1 to make currentView start at 0 for calculation
    const newProgress = ((currentView - 1) / 3) * 100;
    setProgress(newProgress);
  }, [currentView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // Could add a success view or redirect after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const nextView = () => {
    if (currentView < 4) {
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

  // View content based on currentView state
  const renderView = () => {
    switch (currentView) {
      case 1:
        return (
          <div className="space-y-12">
            <div className="relative">
              <BorderedText 
                as="h2"
                className="mb-6"
                lineWidth="6px"
                lineColor="white"
                padding="1rem"
                textClassName="text-white text-3xl font-gloria"
              >
                What is your full name?
              </BorderedText>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Answer"
                required
                className="w-full bg-white/90 border-2 border-black rounded-full px-6 py-4 text-lg font-verdana
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <BorderedText 
                as="h2"
                className="mb-6"
                lineWidth="6px"
                lineColor="white"
                padding="1rem"
                textClassName="text-white text-3xl font-gloria"
              >
                What is your email address?
              </BorderedText>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Answer"
                required
                className="w-full bg-white/90 border-2 border-black rounded-full px-6 py-4 text-lg font-verdana
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <BorderedText 
                as="h2"
                className="mb-6"
                lineWidth="6px"
                lineColor="white"
                padding="1rem"
                textClassName="text-white text-3xl font-gloria"
              >
                What is your phone number?
              </BorderedText>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Answer"
                required
                className="w-full bg-white/90 border-2 border-black rounded-full px-6 py-4 text-lg font-verdana
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="relative">
            <BorderedText 
              as="h2"
              className="mb-6"
              lineWidth="6px"
              lineColor="white"
              padding="1rem"
              textClassName="text-white text-3xl font-gloria"
            >
              What are the subjects that you would like to teach?
            </BorderedText>
            <textarea
              id="subjects"
              value={formData.subjects}
              onChange={handleInputChange}
              placeholder="Your Answer"
              required
              rows={6}
              className="w-full bg-white/90 border-2 border-black rounded-3xl px-6 py-4 text-lg font-verdana
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[150px]"
            />
          </div>
        );
      case 3:
        return (
          <div className="relative">
            <BorderedText 
              as="h2"
              className="mb-6"
              lineWidth="6px"
              lineColor="white"
              padding="1rem"
              textClassName="text-white text-3xl font-gloria"
            >
              What is your previous relevant experience?
            </BorderedText>
            <textarea
              id="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Your Answer"
              required
              rows={6}
              className="w-full bg-white/90 border-2 border-black rounded-3xl px-6 py-4 text-lg font-verdana
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[150px]"
            />
          </div>
        );
      case 4:
        return (
          <div className="relative">
            <div className="bg-white/20 rounded-3xl p-8 border-2 border-white/40">
              <h2 className="text-white text-2xl font-gloria mb-6 text-center">Complete Your Application</h2>
              
              <div className="flex items-start gap-4 mb-8">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleCheckboxChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-white checked:bg-blue-500 appearance-none cursor-pointer"
                />
                <label htmlFor="terms" className="text-base font-verdana text-white">
                  By submitting this form you agree to providing your personal information to us
                </label>
              </div>
              
              <div className="space-y-2 text-white">
                <h3 className="font-gloria text-xl mb-2">Review your information:</h3>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Subjects:</strong> {formData.subjects}</p>
                <p><strong>Experience:</strong> {formData.experience}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GuestLayout>
      <div className="min-h-screen w-full py-16" 
           style={{ background: 'linear-gradient(180deg, #163E42 0%, #31848C 100%)' }}>
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl text-white font-gloria mb-6">Join as a Teacher</h1>
          </div>

          {/* Form */}
          <form className="space-y-12">
            {renderView()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <button
                type="button"
                onClick={prevView}
                className={`bg-white/90 border-2 border-black rounded-full px-10 py-3 text-xl font-gloria
                          transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                          ${currentView === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
                disabled={currentView === 1}
              >
                ← Back
              </button>
              
              {/* Progress Indicator */}
              <div className="flex items-center">
                <img src="/apple.png" alt="Progress" className="h-12 w-12" />
                <div className="w-32 h-2 bg-white/30 rounded-full mx-2">
                  <div 
                    className="h-full bg-white rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                type="button"
                onClick={nextView}
                className="bg-white/90 border-2 border-black rounded-full px-10 py-3 text-xl font-gloria
                         hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentView === 4 ? 'Submit' : 'Continue →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}