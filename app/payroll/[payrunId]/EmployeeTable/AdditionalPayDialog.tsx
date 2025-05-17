import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogOrDrawer from "@/app/common/DialogOrDrawer";
import { Autocomplete, TextField } from "@mui/material";
import { useGetPayComponentsQuery } from "@/lib/api/payComponentApi";
import { PayComponent } from "@prisma/client";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import {
  useCreatePayrollEntryMutation,
  useDeletePayrollEntryMutation,
} from "@/lib/api/payrollApi";
import { formatIndianCurrency, handleAsyncWithToast } from "@/utils/utils";

interface AdditionalPayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "earning" | "deduction";
  payRollRecordId: number;
  existingComponents: any[];
  onSave: (components: any[]) => void;
}

interface AdditionalPayComponent {
  id: string;
  name: string;
  amount: number;
  type: "earning" | "deduction";
}

export default function AdditionalPayDialog({
  open,
  onOpenChange,
  type,
  payRollRecordId,
  existingComponents,
  onSave,
}: AdditionalPayDialogProps) {
  const [components, setComponents] =
    useState<AdditionalPayComponent[]>(existingComponents);
  const [selectedComponent, setSelectedComponent] = useState<
    AdditionalPayComponent | any | null
  >(null);
  const [amount, setAmount] = useState<string>("");
  const [createEntry] = useCreatePayrollEntryMutation();
  const [removeEntry] = useDeletePayrollEntryMutation();

  useEffect(() => {
    if (open) {
      setSelectedComponent(null);
      setAmount("");
      setComponents(existingComponents);
    }
  }, [open]);

  const {
    data: payComponents,
    isLoading,
    isError,
  } = useGetPayComponentsQuery();

  const handleComponentChange = (value: string | PayComponent | null) => {
    if (typeof value === "string") {
      setSelectedComponent({ name: value, amount: 0 });
    } else if (value) {
      setSelectedComponent(value);
      setAmount(value.amount.toString());
    } else {
      setSelectedComponent(null);
      setAmount("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleAddComponent = () => {
    if (selectedComponent && amount) {
      const newComponent: any = {
        id: selectedComponent.id ?? crypto.randomUUID(),
        name: selectedComponent.name,
        amount: parseFloat(amount) || 0,
        type,
      };
      setComponents([...components, newComponent]);
      setSelectedComponent(null);
      setAmount("");

      const payload = {
        payrollRecordId: payRollRecordId,
        payComponentId: selectedComponent.id,
        payComponentName: selectedComponent.name,
        amount: parseFloat(amount) || 0,
        type,
      };

      handleAsyncWithToast(
        () => createEntry(payload),
        "Added component successfully"
      );
    }
  };

  const handleRemoveComponent = (component) => {
    setComponents(components.filter((c) => c.id !== component.id));
    handleAsyncWithToast(
      () => removeEntry(component.id),
      "Removed component successfully"
    );
  };

  const handleSave = () => {
    onSave([...components]);
    onOpenChange(false);
  };

  const totalAmount = [...components].reduce(
    (sum, comp) => sum + comp.amount,
    0
  );

  return (
    <DialogOrDrawer
      open={open}
      handleClose={() => onOpenChange(false)}
      maxWidth="sm"
    >
      <div className="p-6 pt-10 space-y-6">
        <LoadingSuspense isLoading={isLoading} isError={isError}>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label className="mb-2 block">Component</Label>
              <Autocomplete
                freeSolo
                options={
                  payComponents?.filter((comp) =>
                    type === "earning"
                      ? comp.category !== "deduction"
                      : comp.category === "deduction"
                  ) ?? []
                }
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={selectedComponent}
                onChange={(_, value) => handleComponentChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    placeholder="Select or type component name"
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Label className="mb-2 block">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="h-10"
              />
            </div>
            <Button
              onClick={handleAddComponent}
              disabled={!selectedComponent || !amount}
              className="h-10"
            >
              Add
            </Button>
          </div>
        </LoadingSuspense>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="font-semibold">Added Components</Label>
            <span className="text-sm font-medium">
              Total: {formatIndianCurrency(Math.abs(totalAmount))}
            </span>
          </div>

          {components.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No components added yet
            </p>
          ) : (
            <div className="space-y-2">
              {[...components]?.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatIndianCurrency(Math.abs(component.amount))}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveComponent(component)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 ">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </DialogOrDrawer>
  );
}
