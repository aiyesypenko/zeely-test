import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import BackgroundIcon from "../../assets/icons/background.svg?react";

function MainContent() {
  const { isMobile, setOpenMobile, setOpen } = useSidebar();

  function handleOpenSidebar() {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      setOpen(true);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div
        role="img"
        aria-label="Preview image"
        className="bg-muted relative aspect-[3/4] py-2 w-full max-w-[320px] overflow-hidden rounded-lg border flex flex-col items-center"
      >
        <Button onClick={handleOpenSidebar} variant="transparent" size="sm">
          <BackgroundIcon className="size-5" />
          Change background
        </Button>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,0,0,0.05),transparent)]" />
      </div>
    </div>
  );
}

export default MainContent;
