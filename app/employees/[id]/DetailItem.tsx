import { cn } from "@/lib/utils";
import React from "react";

export default function DetailItem({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 items-start w-1/2", className)}>
      <span className="text-xs font-medium text-muted-foreground col-span-1">
        {label}
      </span>
      <span className="text-sm col-span-2">{value || "-"}</span>
    </div>
  );
}
