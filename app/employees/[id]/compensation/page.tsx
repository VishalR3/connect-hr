"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import NewCompensation from "./NewCompensation";
import { useGetEmployeeCompensationsQuery } from "@/lib/api/employeesApi";
import { useParams } from "next/navigation";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/app/constants/constants";
import { formatIndianCurrency } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Compensation() {
  const { id } = useParams();
  const {
    data: compensations,
    isLoading,
    isError,
  } = useGetEmployeeCompensationsQuery(id);

  const [activeCompensation, setActiveCompensation] = useState(0);

  useEffect(() => {
    if (compensations) {
      const index = compensations.findIndex((compensation) =>
        dayjs().isAfter(compensation.salaryStructure.effectiveFrom)
      );
      setActiveCompensation(index);
    }
  }, [compensations]);

  return (
    <>
      <div className="mb-4">
        <NewCompensation />
      </div>
      <LoadingSuspense isLoading={isLoading} isError={isError}>
        {compensations?.map((compensation, index) => (
          <Accordion
            key={compensation.id}
            defaultExpanded={index == activeCompensation}
          >
            <AccordionSummary>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between gap-4">
                  Compensation
                  <div>
                    Effective From{" "}
                    {dayjs(compensation.salaryStructure.effectiveFrom).format(
                      DATE_FORMAT
                    )}
                  </div>
                </div>
                <div className="flex-default flex-row">
                  <div className="p-3 flex flex-col gap-2 shadow rounded">
                    <div className="text-2xl text-muted-foreground">
                      {compensation.salaryStructure.yearlyCompensation}
                    </div>
                    <div className="font-medium">Yearly Compensation</div>
                  </div>
                  <div className="p-3 flex flex-col gap-2 shadow rounded">
                    <div className="text-2xl text-muted-foreground">
                      {compensation.salaryStructure.monthlyCompensation}
                    </div>
                    <div className="font-medium">Total Compensation</div>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className="grid gap-x-4 gap-y-2"
                style={{ gridTemplateColumns: "2fr 150px 150px  1fr 1fr" }}
              >
                {compensation.salaryStructure.components?.map((component) => (
                  <div
                    key={component.id}
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
                      {component.payComponent.name}
                    </Box>
                    <div className="capitalize">
                      {component.payComponent.category}
                    </div>
                    <div className="capitalize">
                      {component.payComponent.calculationType}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-end cursor-pointer text-nowrap">
                        <div className="border-b-2 border-dashed border-indigo-200">
                          {component.payComponent.calculationType === "fixed" &&
                            formatIndianCurrency(component.amountOverride)}
                          {component.payComponent.calculationType ===
                            "percentage" &&
                            Number(component.amountOverride).toFixed(2) + "%"}
                        </div>
                        {component.payComponent.calculationType ===
                          "percentage" && (
                          <div>
                            of {component.payComponent.baseComponent.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`capitalize font-medium justify-self-end ${
                        component.payComponent.category === "deduction"
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {formatIndianCurrency(component.calculatedAmount)}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </LoadingSuspense>
    </>
  );
}
