import NoBackgroundsPlaceholderImage from "@/assets/images/no-backgrounds-placeholder.webp";

function NoBackgroundsPlaceholder() {
  return (
    <div
      className="mb-5 flex hidden md:flex overflow-hidden bg-card border gap-1 rounded-lg mt-auto min-w-full min-h-40 px-5 py-1 items-center bg-no-repeat bg-contain bg-right"
      style={{ backgroundImage: `url(${NoBackgroundsPlaceholderImage})` }}
    >
      <div>
        <h3 className="text-md font-semibold text-primary pb-1">Replace BG with AI</h3>
        <p className="text-sm text-muted-foreground max-w-[150px]">
          Give your AI avatar a custom backdrop to create a unique vibe
        </p>
      </div>
    </div>
  );
}

export default NoBackgroundsPlaceholder;
