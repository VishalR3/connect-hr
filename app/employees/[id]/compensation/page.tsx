import { PayComponent } from "@/prisma/client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useCallback } from "react";
import NewCompensation from "./NewCompensation";

export default function Compensation() {
  const salaryComponents: PayComponent[] = [
    {
      id: 1,
      name: "Basic",
      category: "earning",
      calculationType: "fixed",
      amount: 40000,
      isStatutory: false,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 2,
      name: "HRA",
      category: "earning",
      calculationType: "percentage",
      amount: 20.0,
      isStatutory: false,
      formula: null,
      baseComponentId: 1,
    },
    {
      id: 3,
      name: "Children Education Allowance",
      category: "earning",
      calculationType: "fixed",
      amount: 200,
      isStatutory: false,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 4,
      name: "Children Hostel Allowance",
      category: "earning",
      calculationType: "fixed",
      amount: 600,
      isStatutory: false,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 5,
      name: "Communication allowance",
      category: "earning",
      calculationType: "percentage",
      amount: 10.0,
      isStatutory: false,
      formula: null,
      baseComponentId: 1,
    },
    {
      id: 6,
      name: "Travel reimbursement",
      category: "earning",
      calculationType: "fixed",
      amount: 2500,
      isStatutory: false,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 7,
      name: "Special Allowance",
      category: "earning",
      calculationType: "percentage",
      amount: 15.0,
      isStatutory: false,
      formula: null,
      baseComponentId: 1,
    },
    {
      id: 8,
      name: "Variable pay",
      category: "earning",
      calculationType: "percentage",
      amount: 0.0,
      isStatutory: false,
      formula: null,
      baseComponentId: 1,
    },
    {
      id: 9,
      name: "Employee PF",
      category: "deduction",
      calculationType: "fixed",
      amount: 1800,
      isStatutory: true,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 10,
      name: "Employee ESI",
      category: "deduction",
      calculationType: "fixed",
      amount: 0,
      isStatutory: true,
      formula: null,
      baseComponentId: null,
    },
    {
      id: 11,
      name: "PT",
      category: "deduction",
      calculationType: "fixed",
      amount: 200,
      isStatutory: true,
      formula: null,
      baseComponentId: null,
    },
  ];

  const getComponentAmount = useCallback((component: PayComponent) => {
    if (
      component.calculationType === "percentage" &&
      component.baseComponentId
    ) {
      const baseComponent = salaryComponents.find(
        (c) => c.id === component.baseComponentId
      );
      if (baseComponent) {
        return baseComponent.amount * (component.amount / 100);
      }
    }
    return component.amount;
  }, []);

  const getTotalAmount = useCallback(() => {
    return salaryComponents.reduce(
      (total, component) =>
        total +
        (component.category === "deduction"
          ? -getComponentAmount(component)
          : getComponentAmount(component)),
      0
    );
  }, []);

  return (
    <>
      <div className="mb-4">
        <NewCompensation />
      </div>
      <Accordion>
        <AccordionSummary>Current Compensation</AccordionSummary>
        <AccordionDetails>
          <div className="flex-default max-w-2xl flex-row">
            <div className="p-3 flex flex-col gap-2 shadow rounded">
              <div className="text-2xl text-muted-foreground">
                {getTotalAmount() * 12}
              </div>
              <div className="font-medium">Yearly Compensation</div>
            </div>
            <div className="p-3 flex flex-col gap-2 shadow rounded">
              <div className="text-2xl text-muted-foreground">
                {getTotalAmount()}
              </div>
              <div className="font-medium">Total Compensation</div>
            </div>
          </div>
          <div className="flex flex-col max-w-2xl mt-6">
            {salaryComponents.map((component) => (
              <div className="flex-default" key={component.id}>
                <div>{component.name}</div>
                <div
                  className={`${
                    component.category === "deduction" ? "text-red-500" : ""
                  }`}
                >
                  {getComponentAmount(component)}
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
