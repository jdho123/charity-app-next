interface Story {
    title: string
    excerpt: string
    date: string
  }
  
  // Sample data - In a real app, this would come from props or API
  const stories: Story[] = [
    {
      title: 'Solar Panels Installed at Impact Schools',
      excerpt: 'Bringing sustainable energy solutions to our partner schools...',
      date: '09/01/2025'
    },
    {
      title: 'New Teaching Program Launches',
      excerpt: 'Expanding our reach with innovative teaching methods...',
      date: '08/15/2025'
    },
    {
      title: 'Student Success Stories',
      excerpt: 'Meet the students whose lives have been transformed...',
      date: '08/01/2025'
    }
  ]
  
  export default function NewsletterSection() {
    return (
      <section className="bg-[#4B7277] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <h2 className="text-8xl font-gloria leading-tight">
                Our Journey
              </h2>
              <h3 className="text-5xl font-gloria text-[#FFEF9A]">
                One Story at a Time
              </h3>
              <p className="text-xl text-[#E6DBC4] font-verdana max-w-lg">
                Stay updated with the latest news, inspiring stories, and behind-the-scenes moments 
                from our mission. From impactful lessons to heartwarming success stories, 
                discover how we&apos;re making a difference every day.
              </p>
            </div>
  
            {/* Right Column - News Cards */}
            <div className="space-y-6">
              {stories.map((story, index) => (
                <div key={index} className="relative">
                  <div className="bg-[#E6DBC4] bg-opacity-50 rounded-[40px] p-6">
                    <div className="bg-white rounded-[22px] w-[217px] h-[178px] float-left mr-6" />
                    <div className="space-y-4">
                      <h4 className="text-2xl font-gloria leading-tight">{story.title}</h4>
                      <p className="text-lg">{story.excerpt}</p>
                      <strong className="block">Read More &gt;&gt;&gt;</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  