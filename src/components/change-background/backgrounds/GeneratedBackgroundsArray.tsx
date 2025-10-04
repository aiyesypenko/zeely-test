import { useBackgroundStore } from "@/store/backgroundStore";
import BackgroundCard from "./BackgroundCard";

function GeneratedBackgroundsArray() {
  const backgrounds = useBackgroundStore((s) => s.backgrounds);

  return (
    <div className="pt-10 pb-5">
      <p className="mb-3 text-sm font-semibold">Your backgrounds</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 px-1">
        {backgrounds.map((background) => (
          <BackgroundCard key={background.id} background={background} />
        ))}
      </div>
    </div>
  );
}

export default GeneratedBackgroundsArray;
