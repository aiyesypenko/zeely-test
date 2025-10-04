import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SparklesIcon from "@/assets/icons/sparkles.svg?react";
import { useBackgroundStore } from "@/store/backgroundStore";
import BackgroundHistoryButtons from "./BackgroundHistoryButtons";

function PromptInput() {
  const prompt = useBackgroundStore((s) => s.prompt);
  const setPrompt = useBackgroundStore((s) => s.setPrompt);
  const promptError = useBackgroundStore((s) => s.promptError);
  const regenerateActiveBackground = useBackgroundStore(
    (s) => s.regenerateActiveBackground
  );
  const canRegenerate = useBackgroundStore((s) => s.canRegenerate);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPrompt(e.target.value);

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="background-prompt"
        className="text-sm font-semibold text-primary"
      >
        Background idea
      </label>
      {promptError && (
        <div className="text-xs text-red-700 -mb-1">{promptError}</div>
      )}
      <div className="flex flex-col gap-2 border bg-white rounded-lg pt-2 pb-1 px-1">
        <Textarea
          id="background-prompt"
          name="backgroundPrompt"
          placeholder="Describe what to generate..."
          value={prompt}
          onChange={handlePromptChange}
        />
        <div className="flex items-center justify-between">
          <Button
            variant="inline"
            size="sm"
            onClick={regenerateActiveBackground}
            disabled={!canRegenerate}
            type="button"
            title="Regenerate background"
          >
            <SparklesIcon className="size-5" />
            Regenerate
          </Button>

          <BackgroundHistoryButtons />
        </div>
      </div>
    </div>
  );
}

export default PromptInput;
