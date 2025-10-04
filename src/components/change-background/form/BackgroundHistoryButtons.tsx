import { Button } from "@/components/ui/button";
import ActionBackIcon from "@/assets/icons/action-back.svg?react";
import { useBackgroundStore } from "@/store/backgroundStore";

function BackgroundHistoryButtons() {
  const historyBack = useBackgroundStore((s) => s.backgroundHistoryBack);
  const historyForward = useBackgroundStore((s) => s.backgroundHistoryForward);
  const canBack = useBackgroundStore((s) => s.canBack);
  const canForward = useBackgroundStore((s) => s.canForward);

  return (
    <div className="flex gap-2">
      <Button
        variant="icon"
        size="icon"
        disabled={!canBack}
        type="button"
        onClick={historyBack}
        aria-label="Go back in background history"
        title="Back"
      >
        <ActionBackIcon className="size-5" />
      </Button>
      <Button
        variant="icon"
        size="icon"
        disabled={!canForward}
        type="button"
        onClick={historyForward}
        aria-label="Go forward in background history"
        title="Forward"
      >
        <ActionBackIcon className="size-5 scale-x-[-1]" />
      </Button>
    </div>
  );
}

export default BackgroundHistoryButtons;
