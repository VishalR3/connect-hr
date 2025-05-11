import { CardContent, CardHeader } from "@mui/material";
import DetailItem from "./DetailItem";
import { EmployeeInfoCard } from "./Employee.style";

export default function AddressInformation({ employee }) {
  return (
    <EmployeeInfoCard elevation={0}>
      <CardHeader title="Address" />
      <CardContent className="flex items-start flex-wrap space-y-4">
        <DetailItem label="Address" value={employee?.address} />
        <DetailItem label="City" value={employee?.city} />
        <DetailItem label="State" value={employee?.state} />
        <DetailItem label="Country" value={employee?.country} />
        <DetailItem label="Postal Code" value={employee?.postalCode} />
      </CardContent>
    </EmployeeInfoCard>
  );
}
