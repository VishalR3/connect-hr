import { columns, Employee } from "./employee-table/columns";
import { EmployeeTable } from "./employee-table";
import { faker } from "@faker-js/faker";

const payments: Employee[] = Array(50)
  .fill(0)
  .map(() => ({
    id: faker.database.mongodbObjectId(),
    employeeId: "FM" + faker.number.int({ min: 100, max: 999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    department: faker.company.buzzNoun(),
    jobTitle: faker.person.jobTitle(),
    joiningDate: faker.date.past().toISOString(),
  }));

export function EmployeeTableContainer() {
  return <EmployeeTable columns={columns} data={payments} />;
}
