import { Settings } from "lucide-react";

export default function SettingsAppBar() {
  return (
    <>
      <div className="flex items-center gap-2 text-zinc-800">
        <div>
          <Settings size={20} />
        </div>
        <h1 className="font-medium text-sm">Settings</h1>
      </div>
    </>
  );
}
