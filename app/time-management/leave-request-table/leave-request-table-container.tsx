import { faker } from "@faker-js/faker";
import { columns, LeaveRequest } from "./columns";
import LeaveRequestTable from ".";

const leaveRequests: LeaveRequest[] = Array(5)
  .fill(0)
  .map(() => ({
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    timeOffType: faker.helpers.arrayElement([
      "Privilege Leave",
      "Sick Leave",
      "Casual Leave",
      "Compensatory Leave",
    ]),
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
  }));

export function LeaveRequestTableContainer() {
  return <LeaveRequestTable columns={columns} data={leaveRequests} />;
}
