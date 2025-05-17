import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import EmployeeNameCell from "@/app/employees/employee-table/EmployeeNameCell";
import { Checkbox } from "@/components/ui/checkbox";
import { formatIndianCurrency } from "@/utils/utils";
import { Employee, PayrollEntry, PayrollRecord } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import AdditionalPay from "./AdditionalPay";

export interface RecordWithEmployee extends PayrollRecord {
  employee: Employee;
  PayrollEntry: PayrollEntry[];
  totalAmount: number;
}

export const columns: ColumnDef<RecordWithEmployee>[] = [
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
    accessorKey: "employee.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      return (
        <EmployeeNameCell
          row={{ original: row.original.employee } as Row<Employee>}
        />
      );
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
          {formatIndianCurrency(row.original.netSalary)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {formatIndianCurrency(row.original.totalAmount)}
        </div>
      );
    },
  },
];
