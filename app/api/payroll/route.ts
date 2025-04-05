import { NextResponse } from "next/server";

// Temporary in-memory storage (replace with database later)
const payrollRecords = [
  {
    id: 1,
    employeeId: 1,
    salary: 5000,
    bonus: 1000,
    deductions: 500,
    paymentDate: "2024-03-01",
    status: "paid",
  },
];

export async function GET() {
  return NextResponse.json(payrollRecords);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newRecord = {
    id: payrollRecords.length + 1,
    ...body,
  };
  payrollRecords.push(newRecord);
  return NextResponse.json(newRecord, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;

  const index = payrollRecords.findIndex((record) => record.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Payroll record not found" },
      { status: 404 }
    );
  }

  payrollRecords[index] = { ...payrollRecords[index], ...data };
  return NextResponse.json(payrollRecords[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "0");

  const index = payrollRecords.findIndex((record) => record.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Payroll record not found" },
      { status: 404 }
    );
  }

  payrollRecords.splice(index, 1);
  return NextResponse.json({ message: "Payroll record deleted successfully" });
}
