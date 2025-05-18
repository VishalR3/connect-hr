"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import EmployeeTable from "./EmployeeTable";
import DateFilter from "@/app/common/DateFilter";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetEmployeesQuery } from "@/lib/api/employeesApi";
import { useCreatePayrollRunMutation } from "@/lib/api/payrollApi";
import { handleAsyncWithToast } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function PayrollRun() {
  const [date, setDate] = useState<any>({
    from: dayjs().startOf("month").toDate(),
    to: dayjs().endOf("month").toDate(),
  });

  const { data: employees } = useGetEmployeesQuery();
  const [createPayrollRun] = useCreatePayrollRunMutation();
  const router = useRouter();

  const handleSavePayRun = () => {
    const payload = {
      periodStart: date.from,
      periodEnd: date.to,
      status: "draft",
      payrollRecords: employees?.map((employee) => ({
        employeeId: employee.id,
        netSalary:
          employee.salaryStructures?.[0]?.salaryStructure.monthlyCompensation ??
          0,
        grossSalary:
          employee.salaryStructures?.[0]?.salaryStructure?.components?.reduce(
            (total, component: any) =>
              total +
              ((component?.payComponent ?? {}).category !== "deduction"
                ? component?.calculatedAmount
                : 0),
            0
          ) ?? 0,
        bonus: 0,
        deductions: 0,
        payrollEntries:
          employee.salaryStructures?.[0]?.salaryStructure?.components?.map(
            (component) => ({
              amount: component.calculatedAmount,
              componentId: component.payComponent.id,
              componentName: component.payComponent.name,
            })
          ) ?? [],
      })),
    };

    handleAsyncWithToast(() => createPayrollRun(payload), "Payroll run saved");
    router.push("/payroll");
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Payroll Run</h2>
          <div className="flex-default">
            <Button onClick={handleSavePayRun}>
              <Save /> Save
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-2xl">
          <div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="period-start">Payroll Period</Label>
              <div>
                <DateFilter date={date} setDate={setDate} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <EmployeeTable />
          </div>
        </div>
      </div>
    </div>
  );
}
