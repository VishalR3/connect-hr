import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payrollRecords = await prisma.payrollRecord.findMany({
      orderBy: { createdAt: "desc" },
      include: { employee: true },
    });
    return NextResponse.json(payrollRecords);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch payroll records: ${
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
    const payrollRecord = await prisma.payrollRecord.create({
      data: {
        employeeId: body.employeeId,
        salary: body.salary,
        bonus: body.bonus,
        deductions: body.deductions,
        status: body.status,
        paymentDate: new Date(body.paymentDate),
      },
      include: { employee: true },
    });
    return NextResponse.json(payrollRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create payroll record: ${
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
    const payrollRecord = await prisma.payrollRecord.update({
      where: { id },
      data: {
        ...data,
        paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
      },
      include: { employee: true },
    });
    return NextResponse.json(payrollRecord);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update payroll record: ${
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

    await prisma.payrollRecord.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "Payroll record deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete payroll record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
