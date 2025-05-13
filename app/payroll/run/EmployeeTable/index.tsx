"use client";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { DataTable } from "@/components/ui/data-table";
import { useGetEmployeesQuery } from "@/lib/api/employeesApi";
import { columns } from "./columns";

export default function EmployeeTable() {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();
  return (
    <LoadingSuspense isLoading={isLoading} isError={isError}>
      <DataTable columns={columns} data={employees ?? []} />
    </LoadingSuspense>
  );
}
