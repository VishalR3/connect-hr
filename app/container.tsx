"use client";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./common/app-sidebar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Container({
  children,
  appBar,
}: {
  children: React.ReactNode;
  appBar: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Main appBar={appBar}>{children}</Main>
    </SidebarProvider>
  );
}

const Main = ({
  children,
  appBar,
}: {
  children: React.ReactNode;
  appBar: React.ReactNode;
}) => {
  const { state } = useSidebar();
  return (
    <main className="min-h-screen w-full pt-14">
      <div className="w-full flex items-center py-2 px-4 gap-2 shadow-sm fixed top-0 bg-background/80 backdrop-blur-sm bg-blend-luminosity z-10">
        {state === "collapsed" && (
          <div className="cursor-pointer">
            <SidebarTrigger />
          </div>
        )}
        <div className="flex-1 flex items-center justify-between">{appBar}</div>
        <div>
          <Button variant={"outline"} size={"icon"}>
            <Bell />
          </Button>
        </div>
      </div>
      {children}
    </main>
  );
};
