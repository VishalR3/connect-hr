import { columns } from "./employee-table/columns";
import { EmployeeTable } from "./employee-table";
import { prisma } from "@/lib/prisma";

async function getEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return employees;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

export async function EmployeeTableContainer() {
  const employees = await getEmployees();

  return <EmployeeTable columns={columns} data={employees} />;
}
