import { faker } from "@faker-js/faker";
import { RecordTable } from ".";
import { columns, Record } from "./columns";
import { Statuses } from "./status-cell";

const records: Record[] = Array(50)
  .fill(0)
  .map(() => ({
    id: "FM-" + faker.number.int({ min: 100, max: 999 }),
    totalAmount: faker.finance.amount({ min: 80000, max: 400000 }),
    employee: faker.person.fullName(),
    employeeImage: faker.image.avatar(),
    payPeriodStart: faker.date.past().toISOString(),
    payPeriodEnd: faker.date.past().toISOString(),
    processedDate: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(Object.values(Statuses)),
  }));

export function RecordTableContainer() {
  return <RecordTable columns={columns} data={records} />;
}
