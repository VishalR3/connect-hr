import { NextResponse } from "next/server";

// Temporary in-memory storage (replace with database later)
const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    position: "Software Engineer",
    department: "Engineering",
    joinDate: "2023-01-01",
  },
];

export async function GET() {
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newEmployee = {
    id: employees.length + 1,
    ...body,
  };
  employees.push(newEmployee);
  return NextResponse.json(newEmployee, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;

  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  employees[index] = { ...employees[index], ...data };
  return NextResponse.json(employees[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "0");

  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  employees.splice(index, 1);
  return NextResponse.json({ message: "Employee deleted successfully" });
}
