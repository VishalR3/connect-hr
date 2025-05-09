import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Attendance endpoints
export async function GET() {
  try {
    const attendanceRecords = await prisma.attendanceRecord.findMany({
      orderBy: { createdAt: "desc" },
      include: { employee: true },
    });
    return NextResponse.json(attendanceRecords);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch attendance records: ${
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
    const attendanceRecord = await prisma.attendanceRecord.create({
      data: {
        employeeId: body.employeeId,
        checkIn: new Date(body.checkIn),
        checkOut: body.checkOut ? new Date(body.checkOut) : null,
        status: body.status,
      },
      include: { employee: true },
    });
    return NextResponse.json(attendanceRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create attendance record: ${
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
    const attendanceRecord = await prisma.attendanceRecord.update({
      where: { id },
      data: {
        ...data,
        checkIn: data.checkIn ? new Date(data.checkIn) : undefined,
        checkOut: data.checkOut ? new Date(data.checkOut) : undefined,
      },
      include: { employee: true },
    });
    return NextResponse.json(attendanceRecord);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update attendance record: ${
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

    await prisma.attendanceRecord.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to delete attendance record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
