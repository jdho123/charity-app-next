import LearnMoreCard from "./mission/LearnMore";
import MissionSection from "./mission/TextSection";

export default function OurMission() {
  return (
    <section className="w-full">
      <div className="flex flex-col mt-1 w-full max-md:mt-10">
        {/* On desktop, LearnMoreCard appears below MissionSection */}
        {/* On mobile, we reverse the order using Flexbox order */}
        <div className="order-1 lg:order-2">
          <MissionSection />
        </div>
        
        <div className="order-2 lg:order-1">
          <LearnMoreCard />
        </div>
      </div>
    </section>
  );
}