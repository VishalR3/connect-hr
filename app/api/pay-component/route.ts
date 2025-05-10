import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payComponents = await prisma.payComponent.findMany({
      orderBy: { createdAt: "asc" },
      include: { baseComponent: true },
    });
    return NextResponse.json(payComponents);
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
    const payComponent = await prisma.payComponent.create({
      data: {
        name: body.name,
        amount: body.amount,
        category: body.category,
        calculationType: body.calculationType,
        formula: body.formula || null,
        baseComponentId: body.baseComponentId || null,
        isStatutory: body.isStatutory || false,
      },
    });
    return NextResponse.json(payComponent, { status: 201 });
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
