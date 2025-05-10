"use client";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetPayComponentsQuery } from "@/lib/api/payComponentApi";
import { Box, TextField } from "@mui/material";
import { PayComponent } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { formatIndianCurrency } from "@/utils/utils";
import {
  useCreateCompensationMutation,
  useGetEmployeeQuery,
} from "@/lib/api/employeesApi";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

export default function CompensationForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { id } = useParams();

  const { data: employee } = useGetEmployeeQuery(id as string);

  const {
    data: payComponents,
    isLoading,
    isError,
  } = useGetPayComponentsQuery();
  const [createCompensation] = useCreateCompensationMutation();

  const [employeeComponents, setEmployeeComponents] = useState<PayComponent[]>(
    []
  );
  const [effectiveDate, setEffectiveDate] = useState(new Date());

  const totalCompensation = useMemo(() => {
    return employeeComponents.reduce((total, component) => {
      const sign = component.category === "deduction" ? -1 : 1;

      if (component.calculationType === "fixed") {
        return total + sign * component.amount;
      } else {
        const baseComponent: any = employeeComponents.find(
          (c) => c.id === component.baseComponentId
        );
        return total + (sign * component.amount * baseComponent.amount) / 100;
      }
    }, 0);
  }, [employeeComponents]);

  const handleSaveCompensation = async () => {
    const payload = {
      name: `${employee?.name} - ${dayjs(effectiveDate).format("MMM YYYY")}`,
      effectiveFrom: effectiveDate,
      employeeId: Number(id),
      components: employeeComponents.map((component) => ({
        amount: component.amount,
        formula: component.formula,
        id: component.id,
        calculatedAmount: component.calculatedAmount,
      })),
      monthlyCompensation: totalCompensation,
      yearlyCompensation: totalCompensation * 12,
    };
    await createCompensation(payload);
    handleClose();
  };

  useEffect(() => {
    if (payComponents) {
      setEmployeeComponents(payComponents);
    }
  }, [payComponents, isLoading, isError]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="text-lg text-black font-medium">Compensation Form</div>
        <Button className="cursor-pointer" onClick={handleSaveCompensation}>
          Save
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="gross-monthly-compensation">
              Net Monthly Compensation
            </Label>
            <div>{formatIndianCurrency(totalCompensation)}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gross-monthly-compensation">
              Yearly Compensation
            </Label>
            <div>{formatIndianCurrency(totalCompensation * 12)}</div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="effective-from">Effective From</Label>
          <TextField
            id="effective-from"
            type="date"
            size="small"
            placeholder="2023-01-01"
            fullWidth
            value={effectiveDate.toISOString().split("T")[0]}
            onChange={(e) => setEffectiveDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="text-lg text-black">Components</div>
        </div>
        <div
          className="grid gap-x-4 gap-y-2"
          style={{ gridTemplateColumns: "2fr 120px 120px 150px 1fr" }}
        >
          <LoadingSuspense isLoading={isLoading} isError={isError}>
            {employeeComponents?.map((component) => (
              <CompensationComponent
                key={component.id}
                component={component}
                components={employeeComponents}
                setComponents={setEmployeeComponents}
              />
            ))}
          </LoadingSuspense>
        </div>
      </div>
    </div>
  );
}

export function CompensationComponent({
  component,
  components,
  setComponents,
}: {
  component: PayComponent;
  components: PayComponent[];
  setComponents: React.Dispatch<React.SetStateAction<PayComponent[]>>;
}) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(component.amount);

  const stopEditing = () => {
    setEditing(false);
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id === component.id) {
          return { ...c, amount };
        }
        return c;
      })
    );
  };

  const calculatedAmount = useMemo(() => {
    if (component.calculationType === "fixed") {
      return amount;
    } else {
      const baseComponent: any = components.find(
        (c) => c.id === component.baseComponentId
      );
      return (amount * baseComponent.amount) / 100;
    }
  }, [amount, components]);

  useEffect(() => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id === component.id) {
          return { ...c, calculatedAmount };
        }
        return c;
      })
    );
  }, [calculatedAmount]);

  return (
    <div
      className="grid grid-cols-subgrid col-span-5 items-center gap-x-4 h-10"
      style={{
        counterIncrement: "component",
      }}
    >
      <Box
        sx={{
          "&:before": {
            content: `counter(component) ". "`,
          },
        }}
        className="font-medium"
      >
        {component.name}
      </Box>
      <div className="capitalize">{component.category}</div>
      <div className="capitalize">{component.calculationType}</div>
      <div className="capitalize font-medium">
        {formatIndianCurrency(calculatedAmount)}
      </div>
      <div>
        {!editing && (
          <div
            className="flex items-center gap-2 justify-end cursor-pointer text-nowrap"
            onClick={() => setEditing(true)}
          >
            <div className="border-b-2 border-dashed border-indigo-200">
              {component.calculationType === "fixed" &&
                formatIndianCurrency(amount)}
              {component.calculationType === "percentage" &&
                Number(amount).toFixed(2) + "%"}
            </div>
            {component.calculationType === "percentage" && (
              <div>of {component.baseComponent.name}</div>
            )}
            <Pencil size={12} />
          </div>
        )}

        {editing && (
          <motion.div layout layoutId="override-input">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Amount"
              type="number"
              fullWidth
              autoFocus
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              onBlur={stopEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  stopEditing();
                }
              }}
              slotProps={{
                input: {
                  endAdornment:
                    component.calculationType === "percentage" ? "%" : null,
                },
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
