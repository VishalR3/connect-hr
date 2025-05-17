import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payrollEntry = await prisma.payrollEntry.create({
      data: {
        componentName: body.payComponentName,
        amount: body.amount,
        type: body.type,
        payrollRecord: {
          connect: {
            id: body.payrollRecordId,
          },
        },
        component: body.payComponentId
          ? {
              connect: {
                id: body.payComponentId,
              },
            }
          : undefined,
      },
    });
    return NextResponse.json(payrollEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create payroll Entry: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
