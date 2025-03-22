"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/common/tanstack-table/DataTableColumnHeader";
import dayjs from "dayjs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  joiningDate: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="ps-2">
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
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Address" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
  },
  {
    accessorKey: "joiningDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joining Date" />
    ),
    accessorFn: (row) => {
      return dayjs(row.joiningDate).format("MMM DD, YYYY");
    },
    sortingFn: (rowA, rowB) => {
      return dayjs(rowA.original.joiningDate).diff(
        dayjs(rowB.original.joiningDate)
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
