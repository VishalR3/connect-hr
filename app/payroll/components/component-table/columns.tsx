"use client";
import { PayComponent } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PayComponent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category}</div>
    ),
  },
  {
    accessorKey: "calculationType",
    header: "Calculation Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.calculationType}</div>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div>
        {row.original.calculationType === "fixed"
          ? row.original.amount
          : `${row.original.amount}% of ${row.original.baseComponent.name}`}
      </div>
    ),
  },
  {
    accessorKey: "isStatutory",
    header: "Statutory",
  },
];
