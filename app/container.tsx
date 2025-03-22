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
  appbar,
}: {
  children: React.ReactNode;
  appbar: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Main appbar={appbar}>{children}</Main>
    </SidebarProvider>
  );
}

const Main = ({
  children,
  appbar,
}: {
  children: React.ReactNode;
  appbar: React.ReactNode;
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
        <div className="flex-1 flex items-center justify-between">{appbar}</div>
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
