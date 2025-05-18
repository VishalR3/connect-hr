import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.payrollEntry.delete({
      where: { id: parseInt((await params).id) },
    });
    return NextResponse.json({
      message: "Payroll entry deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete payroll entry: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
