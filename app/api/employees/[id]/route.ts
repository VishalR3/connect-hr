import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateEmployeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  position: z.string().min(2),
  department: z.string().min(2),
  joinDate: z.string(),
  salary: z.number().min(0),
  isActive: z.boolean(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        payrollRecords: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!employee) {
      return new NextResponse("Employee not found", { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Failed to fetch employee:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateEmployeeSchema.parse(body);

    const employee = await prisma.employee.update({
      where: { id: parseInt(params.id) },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        position: validatedData.position,
        department: validatedData.department,
        joinDate: new Date(validatedData.joinDate),
      },
    });

    // Create a new payroll record to reflect the salary change
    await prisma.payrollRecord.create({
      data: {
        employeeId: employee.id,
        salary: validatedData.salary,
        paymentDate: new Date(),
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    console.error("Failed to update employee:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
