"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useGetEmployeeQuery } from "@/lib/api/employeesApi";
import React from "react";

// --- Reusable Detail Item ---
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center py-1">
      <span className="text-sm font-medium text-muted-foreground col-span-1">
        {label}
      </span>
      <span className="text-sm col-span-2">{value || "-"}</span>
    </div>
  );
}

// --- Define the expected Employee prop type ---
type PayrollRecord = {
  id: number;
  salary: number;
  effectiveDate: string | Date;
};

type EmployeePayrollData = {
  id: number;
  payrollRecords: PayrollRecord[];
};

// --- Form Schema for Payroll section (Current Salary only for now) ---
const payrollFormSchema = z.object({
  currentSalary: z.number().min(0, "Salary must be positive"),
  // TODO: Potentially add fields for adding a new payroll record
});

export default function EmployeePayrollPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { id }: { id: string } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(id);

  // Find the most recent payroll record
  const currentPayrollRecord = [...employee?.payrollRecords].sort(
    (a, b) =>
      new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
  )[0];

  const form = useForm<z.infer<typeof payrollFormSchema>>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: {
      currentSalary: currentPayrollRecord?.salary || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof payrollFormSchema>) {
    try {
      // TODO: Determine the correct API endpoint and payload structure
      // This might involve creating a *new* payroll record rather than updating the employee directly.
      const payload = {
        salary: values.currentSalary,
        effectiveDate: new Date().toISOString().split("T")[0], // Example: Use today as effective date
      };
      // Example: POST /api/employees/{employee.id}/payroll
      const response = await fetch(`/api/employees/${employee.id}/payroll`, {
        // ADJUST API ENDPOINT
        method: "POST", // Example: Use POST to create new record
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update payroll: ${response.statusText}`);
      }

      toast.success("Payroll updated successfully");
      setIsEditing(false);
      router.refresh(); // Refresh data
    } catch (error) {
      toast.error("Failed to update payroll");
      console.error("Payroll update error:", error);
    }
  }

  const ReadOnlyPayroll = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DetailItem
          label="Current Salary"
          value={currentPayrollRecord?.salary?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        />
        {/* TODO: Display Payroll History Table */}
        {/* <PayrollHistoryTable records={employee.payrollRecords} /> */}
        <p className="text-sm text-muted-foreground pt-2">
          Payroll history display coming soon.
        </p>
      </CardContent>
    </Card>
  );

  const EditPayroll = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Payroll Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add fields for effective date if needed */}
            <p className="text-sm text-muted-foreground pt-2">
              Note: Saving will create a new payroll record effective today.
            </p>
            {/* TODO: Display Payroll History Table maybe? */}
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save New Salary
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      {!isEditing && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Payroll
          </Button>
        </div>
      )}
      {isEditing ? <EditPayroll /> : <ReadOnlyPayroll />}
    </div>
  );
}
