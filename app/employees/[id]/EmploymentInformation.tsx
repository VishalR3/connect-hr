import { CardContent, CardHeader } from "@mui/material";
import DetailItem from "./DetailItem";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/app/constants/constants";
import { EmployeeInfoCard } from "./Employee.style";

export default function EmploymentInformation({ employee }) {
  return (
    <EmployeeInfoCard elevation={0}>
      <CardHeader title="Employment Overview" />
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 flex flex-wrap">
            <DetailItem
              label="Joining Date"
              value={dayjs(employee?.joinDate).format(DATE_FORMAT)}
            />
            <DetailItem label="Position" value={employee?.position} />
            <DetailItem label="Department" value={employee?.department} />
            <DetailItem label="Location" value={"Bangalore"} />
          </div>
        </div>
      </CardContent>
    </EmployeeInfoCard>
  );
}
