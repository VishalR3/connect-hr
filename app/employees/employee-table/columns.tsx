"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: Date;
};

function EmployeeNameCell({ row }: { row: Row<Employee> }) {
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

function CheckboxCell({ row }: { row: Row<Employee> }) {
  return (
    <div className="ps-2">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

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
    cell: ({ row }) => <CheckboxCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <EmployeeNameCell row={row} />,
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      return format(new Date(row.original.joinDate), "MMM dd, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
              onClick={() => navigator.clipboard.writeText(row.original.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
