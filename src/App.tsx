import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ChangeBackgroundSidebar from "./components/change-background/ChangeBackgroundSidebar";
import MainContent from "./components/change-background/MainContent";

function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <ChangeBackgroundSidebar />
      <SidebarInset>
        <MainContent />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
