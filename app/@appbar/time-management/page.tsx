import { CalendarDays } from "lucide-react";

export default function TimeManagementAppBar() {
  return (
    <>
      <div className="flex items-center gap-2 text-zinc-800">
        <div>
          <CalendarDays size={20} />
        </div>
        <h1 className="font-medium text-sm">Time Management</h1>
      </div>
    </>
  );
}
