import { useBackgroundStore } from "@/store/backgroundStore";
import type { IBackground } from "@/types/types";
import { cn } from "@/lib/utils";
import avatar from "@/assets/images/avatar.webp";
import LoadingSpinner from "@/components/ui/loading-spinner";

function BackgroundCard({ background }: { background: IBackground }) {
  const defaultBgIndex = useBackgroundStore((s) => s.defaultBgIndex);
  const setDefaultBgIndex = useBackgroundStore((s) => s.setDefaultBgIndex);

  const handleSetDefaultBg = (id: number) => {
    setDefaultBgIndex(id);
  };

  return (
    <div
      onClick={() => handleSetDefaultBg(background.id)}
      key={background.id}
      className={cn(
        "bg-primary w-full rounded-xl cursor-pointer overflow-hidden relative outline-[3px] outline-transparent lg:min-h-[198px] lg:min-w-[112px]",
        defaultBgIndex === background.id && "outline-primary"
      )}
      style={{
        backgroundImage: background.isGenerating ? "none" : `url(${
          background.backgroundsHistory[background.historyIndex]
        })`,
      }}
    >
      {defaultBgIndex === background.id && (
        <div className="absolute top-2 pt-1 left-2 border bg-white font-semibold h-4.5 flex items-center justify-center blur-15 rounded-sm px-1.5 py-0.5 text-[10px] uppercase">
          default
        </div>
      )}

      {background.isGenerating ? (
        <LoadingSpinner footerLabel="1 minute left" />
      ) : (
        <img
          src={avatar}
          alt="Background"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export default BackgroundCard;
