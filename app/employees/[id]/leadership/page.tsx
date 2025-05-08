"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

// --- Reusable Detail Item (Ideally move to a shared location) ---
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

// --- Define the expected Employee prop type (subset needed) ---
// Needs to align with data fetched in layout.tsx
type EmployeeLeadershipData = {
  id: number;
  manager: {
    id: number;
    name: string;
  } | null;
  // Add directReports: { id: number; name: string }[] | null; when available
};

export default function EmployeeLeadershipPage({
  employee,
}: {
  employee: EmployeeLeadershipData;
}) {
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Implement form handling (schema, useForm, onSubmit) if editing is needed
  // const form = useForm(...);
  // async function onSubmit(values) { ... }

  const ReadOnlyLeadership = () => (
    <Card>
      <CardHeader>
        <CardTitle>Chain of Leadership</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DetailItem label="Manager" value={employee.manager?.name} />
        {/* TODO: Display Direct Reports List */}
        <p className="text-sm text-muted-foreground pt-2">
          Direct reports display coming soon.
        </p>
      </CardContent>
    </Card>
  );

  const EditLeadership = () => (
    // <Form {...form}>
    //  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Edit Chain of Leadership</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* TODO: Add form fields for editing manager (e.g., searchable select) */}
        <DetailItem label="Manager" value={employee.manager?.name} />
        <p className="text-sm text-muted-foreground pt-2">
          Manager editing coming soon.
        </p>
        {/* TODO: Add interface for managing direct reports if applicable */}
      </CardContent>
    </Card>
    //     <div className="flex justify-end gap-2">
    //        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
    //        <Button type="submit">
    //           <Save className="mr-2 h-4 w-4" />
    //           Save Changes
    //        </Button>
    //     </div>
    //   </form>
    // </Form>
  );

  return (
    <div className="space-y-6">
      {!isEditing && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsEditing(true)} disabled>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Leadership (Disabled)
          </Button>
        </div>
      )}
      {isEditing ? <EditLeadership /> : <ReadOnlyLeadership />}
      {/* Show cancel button if editing */}
      {isEditing && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
