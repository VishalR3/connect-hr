import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch employees: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        email: body.email,
        position: body.position,
        department: body.department,
        joinDate: new Date(body.joinDate),
      },
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create employee: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...data,
        joinDate: data.joinDate ? new Date(data.joinDate) : undefined,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update employee: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    await prisma.employee.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete employee: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
