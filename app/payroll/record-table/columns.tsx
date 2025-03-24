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
import { formatIndianCurrency } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatusCell from "./status-cell";

export type Record = {
  id: string;
  totalAmount: string;
  employee: string;
  employeeImage: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  processedDate: string;
  status: string;
};

export const columns: ColumnDef<Record>[] = [
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
    header: "Payroll ID",
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div>{formatIndianCurrency(Number(row.original.totalAmount))}</div>
      );
    },
  },
  {
    accessorKey: "employee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <div>
            <Avatar>
              <AvatarImage src={row.original.employeeImage} alt="@shadcn" />
              <AvatarFallback>{row.original.employee[0]}</AvatarFallback>
            </Avatar>
          </div>
          {row.original.employee}
        </div>
      );
    },
  },
  {
    accessorKey: "payPeriodStart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pay Period" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {dayjs(row.original.payPeriodStart).format("MMM DD")} -{" "}
          {dayjs(row.original.payPeriodEnd).format("MMM DD")}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      return dayjs(rowA.original.payPeriodStart).diff(
        dayjs(rowB.original.payPeriodStart)
      );
    },
  },
  {
    accessorKey: "processedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processed Date" />
    ),
    accessorFn: (row) => {
      return dayjs(row?.processedDate)?.format("MMM DD, YYYY") ?? "";
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell status={row.original.status} />,
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
