"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { User, Users, Banknote, Clock, Receipt } from "lucide-react";
import React from "react";
import { useGetEmployeeQuery } from "@/lib/api/employeesApi";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";

// Navigation component within the layout
function EmployeeNavigation({ employeeId }: { employeeId: string }) {
  // TODO: Add active state styling based on current pathname
  const navItems = [
    { href: `/employees/${employeeId}`, label: "Overview", icon: User },
    {
      href: `/employees/${employeeId}/leadership`,
      label: "Leadership",
      icon: Users,
    },
    {
      href: `/employees/${employeeId}/compensation`,
      label: "Compensation",
      icon: Receipt,
    },
    {
      href: `/employees/${employeeId}/payroll`,
      label: "Payroll",
      icon: Banknote,
    },
    { href: `/employees/${employeeId}/time`, label: "Time", icon: Clock },
  ];

  return (
    <nav className="flex border-b">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center px-4 py-3 border-b-2 border-transparent hover:border-primary hover:text-primary data-[active=true]:border-primary data-[active=true]:text-primary transition-colors"
          // Add logic here to determine active state, e.g., using usePathname() in a client component wrapper if needed
          // data-active={pathname === href}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function EmployeeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id }: { id: string } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(id);
  // Basic employee header (can be enhanced)
  const EmployeeHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <LoadingSuspense isLoading={isLoading} isError={isError}>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-medium">
            {employee?.name?.charAt(0).toUpperCase() || "-"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {employee?.name || "Employee Details"}
            </h1>
            <p className="text-muted-foreground">
              {employee?.email || "No email"}
            </p>
          </div>
        </div>
      </LoadingSuspense>
      {/* Edit button might link to an edit mode or be handled differently */}
      {/* <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Details
        </Button> */}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <EmployeeHeader />
      <EmployeeNavigation employeeId={id} />
      <div className="mt-6">
        <LoadingSuspense isLoading={isLoading} isError={isError}>
          {children}
        </LoadingSuspense>
      </div>
    </div>
  );
}
