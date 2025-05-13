import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payrollRuns = await prisma.payrollRun.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(payrollRuns);
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
