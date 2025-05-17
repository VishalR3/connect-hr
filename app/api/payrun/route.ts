import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payrollRun = await prisma.payrollRun.findFirst({
      orderBy: { periodStart: "desc" },
      include: {
        PayrollRecord: {
          include: {
            employee: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(payrollRun);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch pay components: ${
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

    const payRollRun = await prisma.payrollRun.create({
      data: {
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
        status: body.status,
        PayrollRecord: {
          create: body.payrollRecords.map((payrollRecord: any) => ({
            employeeId: payrollRecord.employeeId,
            netSalary: payrollRecord.netSalary,
            grossSalary: payrollRecord.grossSalary,
            bonus: payrollRecord.bonus,
            deductions: payrollRecord.deductions,
            PayrollEntry: {
              createMany: {
                data: payrollRecord.payrollEntries,
              },
            },
          })),
        },
      },
    });
    return NextResponse.json(payRollRun, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create pay component: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
