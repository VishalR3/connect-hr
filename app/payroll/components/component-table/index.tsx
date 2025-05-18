"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetPayComponentsQuery } from "@/lib/api/payComponentApi";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { EmployeeComponent } from "@/app/types";

export default function ComponentTable() {
  const {
    data: payComponents,
    isLoading,
    isError,
  } = useGetPayComponentsQuery();
  return (
    <div className="container mx-auto py-10">
      <LoadingSuspense isLoading={isLoading} isError={isError}>
        <DataTable
          columns={columns}
          data={payComponents as EmployeeComponent[]}
          sx={{
            "--header-bg-color": "whitesmoke",
          }}
        />
      </LoadingSuspense>
    </div>
  );
}
