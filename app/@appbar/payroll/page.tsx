import { CircleDollarSign } from "lucide-react";

export default function PayrollAppBar() {
  return (
    <>
      <div className="flex items-center gap-2 text-zinc-800">
        <div>
          <CircleDollarSign size={20} />
        </div>
        <h1 className="font-medium text-sm">Payroll</h1>
      </div>
    </>
  );
}
