import { Employee } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export default function EmployeeNameCell({ row }: { row: Row<Employee> }) {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(`/employees/${row.original.id}`)}
    >
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        {row.original.name.charAt(0)}
      </div>
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    </div>
  );
}
