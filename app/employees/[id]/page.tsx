"use client"; // Make this a client component for form handling

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { Save } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetEmployeeQuery } from "@/lib/api/employeesApi";
import React from "react";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/app/constants/constants";

// --- Reusable Detail Item (can be moved to a shared components folder) ---
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground col-span-1">
        {label}
      </span>
      <span className="text-sm col-span-2">{value || "-"}</span>
    </div>
  );
}

// --- Form Schema for Overview section ---
const overviewFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  joinDate: z.string().min(1, "Join date is required"), // YYYY-MM-DD
  isActive: z.boolean(),
});

// --- Main Page Component (Overview) ---
export default function EmployeeOverviewPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { id }: { id: string } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(id);

  const form = useForm<z.infer<typeof overviewFormSchema>>({
    resolver: zodResolver(overviewFormSchema),
    // Initialize form with employee data passed from layout (or fetched here if layout doesn't pass it)
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      position: employee?.position || "",
      department: employee?.department || "",
      joinDate: employee?.joinDate
        ? format(new Date(employee?.joinDate), "yyyy-MM-dd")
        : "",
      isActive: employee?.isActive ?? true, // Default to true if undefined
    },
  });

  async function onSubmit(values: z.infer<typeof overviewFormSchema>) {
    try {
      const response = await fetch(`/api/employees/${employee?.id}`, {
        method: "PUT", // Assuming PUT updates the whole employee or relevant part
        headers: {
          "Content-Type": "application/json",
        },
        // Send only the fields relevant to this section
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update employee overview: ${response.statusText}`
        );
      }

      toast.success("Employee overview updated successfully");
      setIsEditing(false);
      router.refresh(); // Refresh data potentially fetched in layout
    } catch (error) {
      toast.error("Failed to update employee overview");
      console.error("Update error:", error);
    }
  }

  // --- Read-Only View for Overview ---
  const ReadOnlyOverview = () => (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Card>
          <CardHeader title="Personal Information" />
          <CardContent className="space-y-12 ">
            <DetailItem label="Full Name" value={employee?.name} />
            <DetailItem label="Email" value={employee?.email} />
            <DetailItem label="Position" value={employee?.position} />
            <DetailItem label="Department" value={employee?.department} />
            <DetailItem
              label="Join Date"
              value={
                employee?.joinDate
                  ? format(new Date(employee?.joinDate), "PPP")
                  : "-"
              }
            />
            <DetailItem
              label="Status"
              value={employee?.isActive ? "Active" : "Inactive"}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
        <Card>
          <CardHeader title="Contact Information" />
          <CardContent>
            <div className="space-y-4">
              <div>Personal Contact</div>
              <div className="space-y-2">
                <DetailItem label="Phone" value={"+91 123456789"} />
                <DetailItem label="Email" value={"bM8oO@example.com"} />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div>Emergency Contact</div>
              <div className="space-y-2">
                <DetailItem label="Phone" value={"+91 123456789"} />
                <DetailItem label="Name" value={"John Doe"} />
                <DetailItem label="Relation" value={"Brother"} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Employment Overview" />
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <DetailItem
                  label="Joining Date"
                  value={dayjs(employee?.joinDate).format(DATE_FORMAT)}
                />
                <DetailItem label="Position" value={employee?.position} />
                <DetailItem label="Department" value={employee?.department} />
                <DetailItem label="Job Type" value={"Full Time"} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // --- Edit View for Overview ---
  const EditOverview = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Personal & Job Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Full Name</FormLabel>{" "}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Email</FormLabel>{" "}
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Position</FormLabel>{" "}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Department</FormLabel>{" "}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="joinDate"
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Join Date</FormLabel>{" "}
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                  {" "}
                  <div className="space-y-0.5">
                    {" "}
                    <FormLabel className="text-base">
                      Active Status
                    </FormLabel>{" "}
                    <div className="text-sm text-muted-foreground">
                      {" "}
                      Mark employee as active or inactive{" "}
                    </div>{" "}
                  </div>{" "}
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>{" "}
                </FormItem>
              )}
            />
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
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      <LoadingSuspense isLoading={isLoading} isError={isError}>
        {/* {!isEditing && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Overview
            </Button>
          </div>
        )} */}

        {isEditing ? <EditOverview /> : <ReadOnlyOverview />}
      </LoadingSuspense>
    </div>
  );
}
