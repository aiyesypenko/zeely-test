import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import GeneratedBackgroundsArray from "./backgrounds/GeneratedBackgroundsArray";
import NoBackgroundsPlaceholder from "./backgrounds/NoBackgroundsPlaceholder";
import BackgroundPromptForm from "./form/BackgroundPromptForm";
import { useBackgroundStore } from "@/store/backgroundStore";

function ChangeBackgroundSidebar() {
  const hasBackgrounds = useBackgroundStore(
    (store) => store.backgrounds.length > 0
  );

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarHeader>
        <h2 className="text-[22px] font-bold text-primary pb-2">Change background</h2>
      </SidebarHeader>
      <SidebarContent>
        <BackgroundPromptForm />
        {hasBackgrounds ? (
          <GeneratedBackgroundsArray />
        ) : (
          <NoBackgroundsPlaceholder />
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default ChangeBackgroundSidebar;
