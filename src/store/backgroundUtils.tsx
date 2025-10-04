import type { IBackground, IBackgroundState } from "@/types/types";

export function deriveFlags(
  backgrounds: IBackground[],
  defaultBgIndex: number | null
): Pick<IBackgroundState, "canBack" | "canForward" | "canRegenerate"> {
  if (!backgrounds.length || defaultBgIndex === null)
    return { canBack: false, canForward: false, canRegenerate: false };

  const active = backgrounds.find((bg) => bg.id === defaultBgIndex);
  if (!active)
    return { canBack: false, canForward: false, canRegenerate: false };

  return {
    canBack: active.historyIndex < active.backgroundsHistory.length - 1,
    canForward: active.historyIndex > 0,
    canRegenerate: backgrounds.length > 0,
  };
}

export function withUpdatedDefault(
  backgrounds: IBackground[],
  defaultBgIndex: number | null,
  updater: (active: IBackground) => IBackground | null
): IBackground[] {
  if (!backgrounds.length || defaultBgIndex === null) return backgrounds;
  
  const activeIndex = backgrounds.findIndex((bg) => bg.id === defaultBgIndex);
  if (activeIndex === -1) return backgrounds;

  const active = backgrounds[activeIndex];
  const updated = updater(active);
  if (updated == null) return backgrounds;

  return [
    ...backgrounds.slice(0, activeIndex),
    updated,
    ...backgrounds.slice(activeIndex + 1),
  ];
}
