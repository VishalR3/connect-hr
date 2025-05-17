import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payRollRun = await prisma.payrollRun.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        PayrollRecord: {
          include: {
            employee: true,
            PayrollEntry: {
              where: {
                type: {
                  not: null,
                },
              },
            },
          },
        },
      },
    });

    if (!payRollRun) {
      return new NextResponse("PayRoll Run not found", { status: 404 });
    }

    // Calculate totalAmount for each payroll record
    const payRollRunWithTotal = {
      ...payRollRun,
      PayrollRecord: payRollRun.PayrollRecord.map((record) => {
        const totalAmount = record.PayrollEntry.reduce((sum, entry) => {
          if (entry.type === "deduction") {
            return sum - (entry.amount || 0);
          }
          return sum + (entry.amount || 0);
        }, record.netSalary || 0);

        return {
          ...record,
          totalAmount,
        };
      }),
    };

    return NextResponse.json(payRollRunWithTotal);
  } catch (error) {
    console.error("Failed to fetch Payroll Run:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
