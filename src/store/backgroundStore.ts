import { create } from "zustand";
import type {
  IBackground,
  IBackgroundState,
  IBackgroundActions,
} from "@/types/types";
import { fetchRandomBackgroundUrl } from "@/api/backgrounds";
import { deriveFlags, withUpdatedDefault } from "./backgroundUtils";

export const useBackgroundStore = create<IBackgroundState & IBackgroundActions>(
  (set, get) => ({
    prompt: "",
    promptError: null,
    backgrounds: [],
    nextIndex: 1,
    defaultBgIndex: null,
    ...deriveFlags([], null),

    setPrompt: (value) => {
      set({ prompt: value, promptError: null });
    },

    setDefaultBgIndex: (id) => {
      set((state) => {
        const bg = state.backgrounds.find((b) => b.id === id);

        if (!bg) return state;

        return {
          defaultBgIndex: id,
          prompt: bg.prompt,
          promptError: null,
          ...deriveFlags(state.backgrounds, id),
        };
      });
    },

    generateBackgroundFromPrompt: async () => {
      const { nextIndex, prompt } = get();

      if (!prompt.trim()) {
        set({ promptError: "Please enter a prompt to generate a background" });
        return;
      }

      const newBackground: IBackground = {
        id: nextIndex,
        backgroundsHistory: [],
        historyIndex: 0,
        prompt: prompt.trim(),
        isGenerating: true,
      };

      set((state) => {
        const backgrounds = [newBackground, ...state.backgrounds];
        return {
          backgrounds,
          prompt: newBackground.prompt,
          nextIndex: state.nextIndex + 1,
          defaultBgIndex: newBackground.id,
          promptError: null,
          ...deriveFlags(backgrounds, newBackground.id),
        };
      });

      const url = await fetchRandomBackgroundUrl(nextIndex);

      set((state) => {
        const backgrounds = withUpdatedDefault(
          state.backgrounds,
          newBackground.id,
          (active) => ({
            ...active,
            backgroundsHistory: [url],
            historyIndex: 0,
            isGenerating: false,
          })
        );

        return {
          backgrounds,
          ...deriveFlags(backgrounds, newBackground.id),
        };
      });
    },

    regenerateActiveBackground: async () => {
      const { defaultBgIndex, nextIndex } = get();

      set((state) => {
        const backgrounds = withUpdatedDefault(
          state.backgrounds,
          defaultBgIndex,
          (active) => ({
            ...active,
            isGenerating: true,
          })
        );

        if (backgrounds === state.backgrounds) return state;

        return {
          backgrounds,
          ...deriveFlags(backgrounds, defaultBgIndex),
        };
      });

      const url = await fetchRandomBackgroundUrl(nextIndex);

      set((state) => {
        const backgrounds = withUpdatedDefault(
          state.backgrounds,
          defaultBgIndex,
          (active) => ({
            ...active,
            backgroundsHistory: [url, ...active.backgroundsHistory],
            historyIndex: 0,
            isGenerating: false,
          })
        );

        if (backgrounds === state.backgrounds) return state;

        return {
          backgrounds,
          nextIndex: state.nextIndex + 1,
          ...deriveFlags(backgrounds, defaultBgIndex),
        };
      });
    },

    backgroundHistoryBack: () => {
      set((state) => {
        const backgrounds = withUpdatedDefault(
          state.backgrounds,
          state.defaultBgIndex,
          (active) => {
            const canGoBack =
              active.historyIndex < active.backgroundsHistory.length - 1;
            if (!canGoBack) return null;

            return { ...active, historyIndex: active.historyIndex + 1 };
          }
        );

        if (backgrounds === state.backgrounds) return state;

        return {
          backgrounds,
          ...deriveFlags(backgrounds, state.defaultBgIndex),
        };
      });
    },

    backgroundHistoryForward: () => {
      set((state) => {
        const backgrounds = withUpdatedDefault(
          state.backgrounds,
          state.defaultBgIndex,
          (active) => {
            const canGoForward = active.historyIndex > 0;
            if (!canGoForward) return null;

            return { ...active, historyIndex: active.historyIndex - 1 };
          }
        );

        if (backgrounds === state.backgrounds) return state;

        return {
          backgrounds,
          ...deriveFlags(backgrounds, state.defaultBgIndex),
        };
      });
    },
  })
);