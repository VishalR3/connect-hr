"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function EmployeeTable({ payrollRecords }) {
  return <DataTable columns={columns} data={payrollRecords ?? []} />;
}
