"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTablePagination } from "@/app/common/tanstack-table/DataTablePagination";
import { DataTableViewOptions } from "@/app/common/tanstack-table/DataTableViewOptions";
import {
  ChevronDown,
  FileInput,
  LayoutPanelTop,
  Search,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function EmployeeTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="border rounded-lg">
      <div className="flex-default p-4">
        <div className="flex items-center gap-2">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Employee..."
              className="pl-8 pr-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 w-full md:w-96 max-h-10"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button variant={"outline"}>
            <LayoutPanelTop /> Department <ChevronDown />
          </Button>
          <DataTableViewOptions table={table} />
        </div>
        <div>
          <Button variant={"outline"}>
            <FileInput /> Import
          </Button>
        </div>
      </div>

      <div className="border-t">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-96">
                  <div className="flex flex-col items-center justify-center gap-4 h-full">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-medium">
                        No employees found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Get started by adding your first employee
                      </p>
                    </div>
                    <Link href="/employees/new">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className="border-t" />
    </div>
  );
}
