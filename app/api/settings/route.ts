import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch settings: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: data,
      create: data,
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update settings: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
