import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Plus, Pencil, Minus } from "lucide-react";
import AdditionalPayDialog from "./AdditionalPayDialog";
import { formatIndianCurrency } from "@/utils/utils";
import { RecordWithEmployee } from "./columns";

interface AdditionalPayComponent {
  id: string;
  name: string;
  amount: number;
  type: "earning" | "deduction";
}

const getComponents = (components, type: "earning" | "deduction") => {
  try {
    return components
      ?.filter((c) => c.type === type)
      ?.map((c) => ({
        id: c.id,
        name: c.componentName,
        amount: c.amount,
        type: c.type,
      }));
  } catch (e) {
    console.log("Error getting components", e);
    return [];
  }
};

export default function AdditionalPay({
  row,
}: {
  row: Row<RecordWithEmployee>;
}) {
  const payRollRecordId = row.original.id;
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const [deductionDialogOpen, setDeductionDialogOpen] = useState(false);
  const [bonusComponents, setBonusComponents] = useState<
    AdditionalPayComponent[]
  >(getComponents(row.original.PayrollEntry, "earning"));
  const [deductionComponents, setDeductionComponents] = useState<
    AdditionalPayComponent[]
  >(getComponents(row.original.PayrollEntry, "deduction"));

  const totalBonus = bonusComponents.reduce(
    (sum, comp) => sum + comp.amount,
    0
  );
  const totalDeduction = deductionComponents.reduce(
    (sum, comp) => sum + comp.amount,
    0
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Button
          variant="ghost"
          size={"sm"}
          onClick={() => setBonusDialogOpen(true)}
          className="justify-start"
        >
          {bonusComponents.length > 0 ? (
            <>
              <Plus className="-mr-1" />
              {formatIndianCurrency(totalBonus)}
              <Pencil className="size-3" />
            </>
          ) : (
            <>
              <Plus />
              Earnings
            </>
          )}
        </Button>
        <AdditionalPayDialog
          open={bonusDialogOpen}
          onOpenChange={setBonusDialogOpen}
          type="earning"
          payRollRecordId={payRollRecordId}
          existingComponents={bonusComponents}
          onSave={setBonusComponents}
        />
      </div>
      <div>
        <Button
          variant="ghost"
          size={"sm"}
          onClick={() => setDeductionDialogOpen(true)}
          className="justify-start"
        >
          {deductionComponents.length > 0 ? (
            <>
              <Minus className="-mr-1" />
              {formatIndianCurrency(Math.abs(totalDeduction))}
              <Pencil className="size-3" />
            </>
          ) : (
            <>
              <Plus />
              Deductions
            </>
          )}
        </Button>
        <AdditionalPayDialog
          open={deductionDialogOpen}
          onOpenChange={setDeductionDialogOpen}
          type="deduction"
          payRollRecordId={payRollRecordId}
          existingComponents={deductionComponents}
          onSave={setDeductionComponents}
        />
      </div>
    </div>
  );
}
