import { Button } from "@/components/ui/button";
import { RecordTableContainer } from "./record-table/container";
import { Blocks } from "lucide-react";
import Link from "next/link";

export default function PayrollPage() {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Payroll Overview</h2>
          <div className="flex-default">
            <Button variant={"outline"} asChild>
              <Link href="/payroll/components">
                <Blocks /> Components
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <RecordTableContainer />
      </div>
    </div>
  );
}
