import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@mui/material";
import { PencilLine } from "lucide-react";
import DetailItem from "./DetailItem";
import { EmployeeInfoCard } from "./Employee.style";

export default function PersonalInformation({ employee }) {
  return (
    <EmployeeInfoCard elevation={0}>
      <CardHeader
        title="Personal Information"
        action={
          <>
            <Button variant={"outline"}>
              <PencilLine />
              Edit
            </Button>
          </>
        }
      />
      <CardContent className="flex items-start flex-wrap space-y-8">
        <DetailItem label="Full Name" value={employee?.name} />
        <DetailItem label="Gender" value={employee?.gender} />
        <DetailItem label="Marital Status" value={employee?.maritalStatus} />
        <DetailItem label="Religion" value={employee?.religion} />
        <DetailItem label="Date of Birth" value={employee?.dob} />
        <DetailItem label="Blood Group" value={employee?.bloodGroup} />
        <DetailItem
          label="Status"
          value={employee?.isActive ? "Active" : "Inactive"}
        />
      </CardContent>
    </EmployeeInfoCard>
  );
}
