import LearnMoreCard from "./mission/LearnMore";
import MissionSection from "./mission/TextSection";

export default function OurMission() {
  return (
    <section>
      <div className="flex flex-col mt-1 w-full max-md:mt-10 max-md:max-w-full">

        <MissionSection />
        <LearnMoreCard />
      </div>
    </section>
  );
}