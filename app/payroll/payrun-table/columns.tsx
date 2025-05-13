"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import { PayrollRun } from "@prisma/client";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/app/constants/constants";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<PayrollRun>[] = [
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
    accessorKey: "id",
    header: "Payrun ID",
  },
  {
    accessorKey: "Period",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),
    accessorFn: (row) => {
      return `${dayjs(row.periodStart).format(DATE_FORMAT)} - ${dayjs(
        row.periodEnd
      ).format(DATE_FORMAT)}`;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.status}</div>,
  },
  {
    id: "actions",
    cell: () => (
      <div>
        <Button size={"sm"}>Run Payroll</Button>
      </div>
    ),
  },
];
