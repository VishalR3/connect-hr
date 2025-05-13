import { RecordTable } from ".";
import { columns, Record } from "./columns";

// const records: Record[] = Array(50)
//   .fill(0)
//   .map(() => ({
//     id: "FM-" + faker.number.int({ min: 100, max: 999 }),
//     totalAmount: faker.finance.amount({ min: 80000, max: 400000 }),
//     employee: faker.person.fullName(),
//     employeeImage: faker.image.avatar(),
//     processedDate: faker.date.past().toISOString(),
//     status: faker.helpers.arrayElement(Object.values(Statuses)),
//   }));

export function RecordTableContainer({ payrun }: { payrun: any }) {
  const records: Record[] = payrun.PayrollRecord.map((record) => ({
    id: record.id,
    totalAmount: record.netSalary,
    employee: record.employee.name,
    processedDate: record.paymentDate,
    status: record.status,
  }));
  return <RecordTable columns={columns} data={records} payrun={payrun} />;
}
