import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import MultipleSparklesIcon from "@/assets/icons/multiple-sparcles.svg?react";
import { useBackgroundStore } from "@/store/backgroundStore";
import PromptInput from "./PromptInput";

function BackgroundPromptForm() {
  const generateBackgroundFromPrompt = useBackgroundStore(
    (s) => s.generateBackgroundFromPrompt
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateBackgroundFromPrompt();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <PromptInput />
      <Button className="w-full" type="submit">
        <MultipleSparklesIcon className="size-5" />
        Generate BG for 1 credit
      </Button>
    </form>
  );
}

export default BackgroundPromptForm;
