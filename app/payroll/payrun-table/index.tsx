import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { PayrollRun } from "@prisma/client";

export default function PayrunTable({ data }: { data: PayrollRun[] }) {
  return <DataTable columns={columns} data={data ?? []} />;
}
