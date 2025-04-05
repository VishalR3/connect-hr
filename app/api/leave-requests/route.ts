import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { employee: true },
    });
    return NextResponse.json(leaveRequests);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch leave requests: ${
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
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: body.employeeId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        type: body.type,
        status: body.status,
        reason: body.reason,
      },
      include: { employee: true },
    });
    return NextResponse.json(leaveRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create leave request: ${
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
    const leaveRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: { employee: true },
    });
    return NextResponse.json(leaveRequest);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update leave request: ${
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

    await prisma.leaveRequest.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete leave request: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
