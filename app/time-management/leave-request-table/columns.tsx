"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import dayjs from "dayjs";

export type LeaveRequest = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  timeOffType: string;
  status: string;
};

export const columns: ColumnDef<LeaveRequest>[] = [
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
      <div className="ps-2 py-2">
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
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    accessorFn: (row) => {
      return dayjs(row.startDate).format("MMM DD, YYYY");
    },
    sortingFn: (rowA, rowB) => {
      return dayjs(rowA.original.startDate).diff(
        dayjs(rowB.original.startDate)
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    accessorFn: (row) => {
      return dayjs(row.endDate).format("MMM DD, YYYY");
    },
    sortingFn: (rowA, rowB) => {
      return dayjs(rowA.original.endDate).diff(dayjs(rowB.original.endDate));
    },
  },
  {
    accessorKey: "timeOffType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Off Type" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
];
