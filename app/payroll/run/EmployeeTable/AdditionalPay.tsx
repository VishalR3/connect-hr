import { Button } from "@/components/ui/button";
import { Employee } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export default function AdditionalPay({ row }: { row: Row<Employee> }) {
  return (
    <div className="flex flex-col">
      <div>
        <Button variant={"ghost"}>
          <Plus /> Bonus
        </Button>
      </div>
      <div>
        <Button variant={"ghost"}>
          <Plus /> Deductions
        </Button>
      </div>
    </div>
  );
}
