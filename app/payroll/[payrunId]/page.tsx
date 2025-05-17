"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateFilter from "@/app/common/DateFilter";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetPayrollRunQuery } from "@/lib/api/payrollApi";
import { useParams } from "next/navigation";
import EmployeeTable from "./EmployeeTable";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";

export default function PayRun() {
  const { payrunId } = useParams();
  const [date, setDate] = useState<any>({
    from: dayjs().startOf("month").toDate(),
    to: dayjs().endOf("month").toDate(),
  });

  const {
    data: payrun,
    isLoading,
    isError,
  } = useGetPayrollRunQuery(payrunId as any, {
    skip: !payrunId,
  });

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Payroll Run</h2>
          <div className="flex-default">
            <Button> Run Payroll</Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="period-start">Payroll Period</Label>
              <div>
                <DateFilter date={date} setDate={setDate} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <LoadingSuspense isLoading={isLoading} isError={isError}>
              <EmployeeTable payrollRecords={payrun?.PayrollRecord} />
            </LoadingSuspense>
          </div>
        </div>
      </div>
    </div>
  );
}
