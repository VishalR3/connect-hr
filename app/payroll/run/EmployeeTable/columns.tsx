import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import EmployeeNameCell from "@/app/employees/employee-table/EmployeeNameCell";
import { EmployeeWithDetails } from "@/app/types";
import { Checkbox } from "@/components/ui/checkbox";
import { formatIndianCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EmployeeWithDetails>[] = [
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
