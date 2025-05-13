import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import EmployeeNameCell from "@/app/employees/employee-table/EmployeeNameCell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatIndianCurrency } from "@/utils/utils";
import { Employee } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import AdditionalPay from "./AdditionalPay";

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="ps-2 py-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ps-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      return <EmployeeNameCell row={row} />;
    },
  },
  {
    accessorKey: "Additional",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Additional" />
    ),
    cell: ({ row }) => <AdditionalPay row={row} />,
  },
  {
    accessorKey: "grossSalary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Salary" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.salaryStructures.length > 0 &&
            formatIndianCurrency(
              row.original.salaryStructures[0].salaryStructure
                .monthlyCompensation
            )}
        </div>
      );
    },
  },
];
