import { NextResponse } from "next/server";

// Temporary in-memory storage (replace with database later)
const settings = {
  company: {
    name: "Connect HR",
    address: "123 Business St, City, Country",
    contact: "contact@connecthr.com",
    taxId: "TAX123456",
  },
  payroll: {
    currency: "USD",
    payday: 15,
    overtimeRate: 1.5,
  },
  leave: {
    annualLeaveDays: 20,
    sickLeaveDays: 10,
    carryForward: true,
  },
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { section, data } = body;

  if (!settings[section as keyof typeof settings]) {
    return NextResponse.json(
      { error: "Invalid settings section" },
      { status: 400 }
    );
  }

  settings[section as keyof typeof settings] = {
    ...settings[section as keyof typeof settings],
    ...data,
  };

  return NextResponse.json(settings[section as keyof typeof settings]);
}
