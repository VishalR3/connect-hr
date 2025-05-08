"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

// --- Define the expected Employee prop type ---
// Needs to align with data fetched in layout.tsx
type EmployeeTimeData = {
  id: number;
  // Placeholder for time management data structure
  timeManagement: {
    attendance: { date: string | Date; status: string }[];
    leaveBalances: { type: string; balance: number }[];
  } | null;
};

export default function EmployeeTimePage({
  employee,
}: {
  employee: EmployeeTimeData;
}) {
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Implement form handling if editing is needed

  const ReadOnlyTime = () => (
    <Card>
      <CardHeader>
        <CardTitle>Time Management (Employee ID: {employee.id})</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Display Attendance Records using employee.timeManagement?.attendance */}
        <p className="text-sm text-muted-foreground">
          Attendance records display coming soon.
        </p>
        {/* TODO: Display Leave Balances */}
        <p className="text-sm text-muted-foreground mt-4">
          Leave balance display coming soon.
        </p>
      </CardContent>
    </Card>
  );

  const EditTime = () => (
    <Card>
      <CardHeader>
        <CardTitle>Edit Time Management (Employee ID: {employee.id})</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Add form fields/components for editing time data */}
        <p className="text-sm text-muted-foreground">
          Time management editing coming soon.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {!isEditing && (
        <div className="flex justify-end">
          {/* Disable edit button until functionality is implemented */}
          <Button variant="outline" onClick={() => setIsEditing(true)} disabled>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Time Data (Disabled)
          </Button>
        </div>
      )}
      {isEditing ? <EditTime /> : <ReadOnlyTime />}
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
