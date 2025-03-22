"use client";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./common/app-sidebar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Main>{children}</Main>
    </SidebarProvider>
  );
}

const Main = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  return (
    <main className="min-h-screen w-full ">
      <div className="w-full p-2">
        {state === "collapsed" && <SidebarTrigger className="cursor-pointer" />}
      </div>
      {children}
    </main>
  );
};
