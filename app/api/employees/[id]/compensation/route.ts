import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const compensations = await prisma.employeeSalaryStructure.findMany({
      where: {
        employeeId: parseInt(params.id),
      },
      orderBy: { salaryStructure: { effectiveFrom: "desc" } },
      include: {
        salaryStructure: {
          include: {
            components: {
              orderBy: { payComponent: { category: "asc" } },
              include: {
                payComponent: {
                  include: {
                    baseComponent: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(compensations);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch compensations: ${
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
    const salaryStructure = await prisma.salaryStructure.create({
      data: {
        name: body.name,
        effectiveFrom: body.effectiveFrom,
        monthlyCompensation: body.monthlyCompensation,
        yearlyCompensation: body.yearlyCompensation,
      },
    });
    await prisma.structureComponent.createMany({
      data: body.components.map((component: any) => ({
        amountOverride: component.amount || null,
        formulaOverride: component.formula || null,
        payComponentId: component.id,
        calculatedAmount: component.calculatedAmount,
        salaryStructureId: salaryStructure.id,
      })),
    });

    const employeeSalaryStructure = await prisma.employeeSalaryStructure.create(
      {
        data: {
          employeeId: body.employeeId,
          salaryStructureId: salaryStructure.id,
        },
      }
    );

    return NextResponse.json(employeeSalaryStructure, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create compensation: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
