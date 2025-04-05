import { NextResponse } from "next/server";

// Temporary in-memory storage (replace with database later)
const attendanceRecords = [
  {
    id: 1,
    employeeId: 1,
    date: "2024-03-25",
    checkIn: "09:00",
    checkOut: "17:00",
    status: "present",
  },
];

const leaveRequests = [
  {
    id: 1,
    employeeId: 1,
    startDate: "2024-04-01",
    endDate: "2024-04-03",
    type: "vacation",
    status: "pending",
    reason: "Family vacation",
  },
];

// Attendance endpoints
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type === "leave") {
    return NextResponse.json(leaveRequests);
  }
  return NextResponse.json(attendanceRecords);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type, ...data } = body;

  if (type === "attendance") {
    const newRecord = {
      id: attendanceRecords.length + 1,
      ...data,
    };
    attendanceRecords.push(newRecord);
    return NextResponse.json(newRecord, { status: 201 });
  } else if (type === "leave") {
    const newRequest = {
      id: leaveRequests.length + 1,
      ...data,
    };
    leaveRequests.push(newRequest);
    return NextResponse.json(newRequest, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { type, id, ...data } = body;

  if (type === "attendance") {
    const index = attendanceRecords.findIndex((record) => record.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 }
      );
    }
    attendanceRecords[index] = { ...attendanceRecords[index], ...data };
    return NextResponse.json(attendanceRecords[index]);
  } else if (type === "leave") {
    const index = leaveRequests.findIndex((request) => request.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }
    leaveRequests[index] = { ...leaveRequests[index], ...data };
    return NextResponse.json(leaveRequests[index]);
  }

  return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "0");
  const type = searchParams.get("type");

  if (type === "attendance") {
    const index = attendanceRecords.findIndex((record) => record.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 }
      );
    }
    attendanceRecords.splice(index, 1);
    return NextResponse.json({
      message: "Attendance record deleted successfully",
    });
  } else if (type === "leave") {
    const index = leaveRequests.findIndex((request) => request.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }
    leaveRequests.splice(index, 1);
    return NextResponse.json({ message: "Leave request deleted successfully" });
  }

  return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
}
