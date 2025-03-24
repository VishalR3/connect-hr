import { cn } from "@/lib/utils";
import {
  CircleCheck,
  CircleCheckBig,
  CircleDashed,
  CircleX,
} from "lucide-react";

export enum Statuses {
  Pending = "Pending",
  Processed = "Processed",
  Received = "Received",
  Failed = "Failed",
}

const renderStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <CircleDashed size={16} />;
    case "Processed":
      return <CircleCheck size={16} />;
    case "Received":
      return <CircleCheckBig size={16} />;
    case "Failed":
      return <CircleX size={16} />;
    default:
      return Statuses.Pending;
  }
};

export default function StatusCell({ status }: { status: string }) {
  return (
    <>
      <div
        className={cn(
          "border rounded-md px-2 py-1 w-fit flex items-center gap-2",
          status === "Pending" && "bg-amber-100 text-amber-800",
          status === "Processed" && "bg-blue-100 text-blue-800",
          status === "Received" && "bg-green-100 text-green-800",
          status === "Failed" && "bg-red-100 text-red-800"
        )}
      >
        {renderStatusIcon(status)}
        {status}
      </div>
    </>
  );
}
