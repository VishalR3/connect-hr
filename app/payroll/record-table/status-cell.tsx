import { cn } from "@/lib/utils";
import { CircleCheck, CircleDashed, CircleX } from "lucide-react";

export enum Statuses {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
}

const renderStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <CircleDashed size={16} />;
    case "paid":
      return <CircleCheck size={16} />;
    case "failed":
      return <CircleX size={16} />;
    default:
      return <CircleDashed size={16} />;
  }
};

export default function StatusCell({ status }: { status: string }) {
  return (
    <>
      <div
        className={cn(
          "border rounded-md px-2 py-1 w-fit flex items-center gap-2 capitalize",
          status === "pending" && "bg-amber-100 text-amber-800",
          status === "paid" && "bg-green-100 text-green-800",
          status === "failed" && "bg-red-100 text-red-800"
        )}
      >
        {renderStatusIcon(status)}
        {status}
      </div>
    </>
  );
}
