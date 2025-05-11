// Make this a client component for form handling
"use client";
import { useParams } from "next/navigation";
import { useGetEmployeeQuery } from "@/lib/api/employeesApi";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { Box } from "@mui/material";
import PersonalInformation from "./PersonalInformation";
import AddressInformation from "./AddressInformation";
import ContactInformation from "./ContactInformation";
import EmploymentInformation from "./EmploymentInformation";
import ConfidentialInformation from "./ConfidentialInformation";

export default function EmployeeOverviewPage() {
  const { id }: { id: string } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(id);

  return (
    <div className="space-y-6">
      <LoadingSuspense isLoading={isLoading} isError={isError}>
        {/* {isEditing ? <EditOverview /> : <ReadOnlyOverview />} */}
        <Box
          className="grid grid-cols-12 gap-4"
          sx={{
            "& .MuiCardHeader-title": { fontSize: "1rem", fontWeight: "bold" },
          }}
        >
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <PersonalInformation employee={employee} />
            <AddressInformation employee={employee} />
          </div>
          <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
            <ContactInformation employee={employee} />
            <EmploymentInformation employee={employee} />
            <ConfidentialInformation employee={employee} />
          </div>
        </Box>
      </LoadingSuspense>
    </div>
  );
}
