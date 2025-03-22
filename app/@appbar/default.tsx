import { LayoutDashboard } from "lucide-react";

export default function DefaultAppBar() {
  return (
    <>
      <div className="flex items-center gap-2 text-zinc-800">
        <div>
          <LayoutDashboard size={20} />
        </div>
        <h1 className="font-medium text-sm">Dashboard</h1>
      </div>
    </>
  );
}
