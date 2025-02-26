import Button from '@/components/shared/Button'
import GeneralFundCard from './GeneralFundCard'

export default function GeneralFund() {
  return (
    <section id="general-fund" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-6xl font-gloria text-[#B21414] leading-tight">
              Support Our Mission to Transform Lives
            </h1>
            
            <div className="space-y-4">
              <p className="font-verdana text-base">
                Your contribution directly impacts the lives of children by providing essential resources 
                like Wi-Fi, books, and educational tools in underserved communities. Together, we can 
                empower the next generation by opening doors to education, fostering hope, and 
                inspiring change.
              </p>
              
              <p className="font-verdana text-base font-bold">
                Every dollar counts. Join us in making a tangible difference—one child, one teacher, 
                one lesson at a time.
              </p>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-full max-w-md text-2xl font-gloria py-4 bg-[#B21414] rounded-full"
            >
              Donate to the General Fund
            </Button>
          </div>

          {/* Right Column - Using new GeneralFundCard */}
          <GeneralFundCard
            goal={5000}
            raised={3000}
            imageUrl="/images/generalFund.png"
            description="The General Fund supports all aspects of our mission. Your contributions help us provide critical resources such as Wi-Fi access for online lessons, new books to foster a love of learning, and classroom supplies like stationery and teaching tools."
            additionalInfo="By donating, you ensure that we can respond swiftly to urgent needs—whether it's setting up new online classes in remote areas, equipping schools with essential materials, or funding special projects that inspire and empower children to dream bigger."
          />
        </div>
      </div>
    </section>
  )
}