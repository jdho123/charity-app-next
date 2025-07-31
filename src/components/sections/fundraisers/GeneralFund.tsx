import Button from '@/components/shared/Button';
import GeneralFundCard from './GeneralFundCard';
import Link from 'next/link';

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
              <p className="font-urbanist text-base">
                Your contribution directly impacts the lives of children by providing essential
                resources such as Wi-Fi, books, and educational tools in growing communities.
                Together, we can empower the next generation by opening doors to education,
                fostering hope, and inspiring change.
              </p>

              <p className="font-urbanist text-base font-bold">
                Every dollar counts. Join us in making a tangible difference—one child, one teacher,
                one lesson at a time.
              </p>
            </div>
            <Link
              href="https://www.gofundme.com/f/raising-support-for-impact-schools-nepal?utm_medium=email&utm_source=product&utm_campaign=p_email%2Bhtml_summary_donations"
              className="inline-block"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full max-w-md text-2xl font-gloria py-4 bg-[#B21414] rounded-full"
              >
                Donate to the General Fund
              </Button>
            </Link>
          </div>

          {/* Right Column - Using new GeneralFundCard */}
          <GeneralFundCard
            goal={5000}
            raised={3000}
            imageUrl="/images/generalFund.png"
            description="The General Fund supports all aspects of our mission in fostering a love for learning."
            additionalInfo={
              <div>
                By donating, you ensure that we can respond swiftly to urgent needs—whether it's
                setting up new online classes in remote areas, equipping schools with essential
                materials, or funding special projects that inspire and empower children to dream
                bigger.
                <br />
                <br />
                Each time you support Ledu’s mission, a child’s life changes.
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
