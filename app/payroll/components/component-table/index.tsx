"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetPayComponentsQuery } from "@/lib/api/payComponentApi";
import { PayComponent } from "@prisma/client";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";

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
          data={payComponents as PayComponent[]}
          sx={{
            "--header-bg-color": "whitesmoke",
          }}
        />
      </LoadingSuspense>
    </div>
  );
}
