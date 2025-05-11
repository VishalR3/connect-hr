import { CardContent, CardHeader } from "@mui/material";
import { EmployeeInfoCard } from "./Employee.style";
import DetailItem from "./DetailItem";
import { Separator } from "@/components/ui/separator";

export default function ConfidentialInformation({ employee }) {
  return (
    <EmployeeInfoCard elevation={0}>
      <CardHeader title="Financial Information" />
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 flex flex-wrap">
            <DetailItem label="PAN" value={employee?.pan} className="w-full" />
            <DetailItem
              label="PF Number"
              value={employee?.pfNumber}
              className="w-full"
            />
            <DetailItem label="UAN" value={employee?.uan} className="w-full" />
            <Separator className="my-4" />
            <div className="font-semibold w-full text-sm">
              Bank Account Details
            </div>
            <div className="w-full flex flex-col space-y-2">
              <DetailItem
                label="Account Number"
                value={employee?.accountNumber}
                className="w-full"
              />
              <DetailItem
                label="IFSC Code"
                value={employee?.ifscCode}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </EmployeeInfoCard>
  );
}
