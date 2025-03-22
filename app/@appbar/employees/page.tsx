import { Button } from "@/components/ui/button";
import { Bell, Users } from "lucide-react";

export default function EmployeesAppBar() {
  return (
    <>
      <div className="flex items-center gap-2 text-zinc-800">
        <div>
          <Users size={20} />
        </div>
        <h1 className="font-medium text-sm">Employees</h1>
      </div>
    </>
  );
}
