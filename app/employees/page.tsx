import { Button } from "@/components/ui/button";
import {
  FileOutput,
  LayoutPanelTop,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";
import { EmployeeTableContainer } from "./employee-table-container";

export default function EmployeesPage() {
  const stats = [
    {
      title: "Active Employees",
      value: "80",
      icon: <UserCheck />,
    },
    {
      title: "Departments",
      value: "9",
      icon: <LayoutPanelTop />,
    },
    {
      title: "Total Employees",
      value: "120",
      icon: <Users />,
    },
  ];
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Employee Overview</h2>
          <div className="flex-default">
            <Button variant={"outline"}>
              <FileOutput /> Export
            </Button>
            <Button>
              <Plus /> New Employee
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-default gap-4 min-w-3xs border p-4 rounded-lg bg-linear-240 from-gray-50 to-white"
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </div>
                <div className="text-2xl font-semibold">{stat.value}</div>
              </div>
              <div>{stat.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <EmployeeTableContainer />
      </div>
    </div>
  );
}
