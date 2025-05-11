import { CardContent, CardHeader } from "@mui/material";
import DetailItem from "./DetailItem";
import { Separator } from "@/components/ui/separator";
import { EmployeeInfoCard } from "./Employee.style";

export default function ContactInformation({ employee }) {
  return (
    <EmployeeInfoCard elevation={0}>
      <CardHeader title="Contact Information" />
      <CardContent>
        <div className="space-y-4">
          <div>Personal Contact</div>
          <div className="space-y-2 flex flex-wrap">
            <DetailItem label="Phone" value={employee?.phone} />
            <DetailItem label="Email" value={employee?.email} />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div>Emergency Contact</div>
          <div className="space-y-2 flex flex-wrap">
            <DetailItem label="Phone" value={"+91 123456789"} />
            <DetailItem label="Name" value={"John Doe"} />
            <DetailItem label="Relation" value={"Brother"} />
          </div>
        </div>
      </CardContent>
    </EmployeeInfoCard>
  );
}
