"use client";
import { Button } from "@/components/ui/button";
import { RecordTableContainer } from "./record-table/container";
import { Blocks, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useGetLatestPayrollRunQuery } from "@/lib/api/payrollApi";
import LoadingSuspense from "../common/LoadingSuspense/LoadingSuspense";

export default function PayrollPage() {
  const {
    data: latestPayRun,
    isLoading,
    isError,
  } = useGetLatestPayrollRunQuery({});
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Payroll Overview</h2>
          <div className="flex-default">
            <Button variant={"outline"} asChild>
              <Link href="/payroll/components">
                <Blocks /> Components
              </Link>
            </Button>
            <Button asChild>
              <Link href="/payroll/run">
                <PlusCircle /> Create Payrun
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <LoadingSuspense isLoading={isLoading} isError={isError}>
          <RecordTableContainer payrun={latestPayRun} />
        </LoadingSuspense>
      </div>
    </div>
  );
}
