export interface IBackground {
  id: number;
  backgroundsHistory: string[];
  historyIndex: number;
  prompt: string;
  isGenerating: boolean;
}

export interface IBackgroundState {
  backgrounds: IBackground[];
  prompt: string;
  nextIndex: number;
  defaultBgIndex: number | null;
  promptError: string | null;
  canBack: boolean;
  canForward: boolean;
  canRegenerate: boolean;
}

export interface IBackgroundActions {
  setPrompt: (value: string) => void;
  setDefaultBgIndex: (id: number) => void;
  generateBackgroundFromPrompt: () => Promise<void>;
  regenerateActiveBackground: () => Promise<void>;
  backgroundHistoryBack: () => void;
  backgroundHistoryForward: () => void;
}
