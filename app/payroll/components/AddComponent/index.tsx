"use client";
import DialogOrDrawer from "@/app/common/DialogOrDrawer";
import LoadingSuspense from "@/app/common/LoadingSuspense/LoadingSuspense";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useCreatePayComponentMutation,
  useGetPayComponentsQuery,
} from "@/lib/api/payComponentApi";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import {
  PayComponentCalculationType,
  PayComponentCategory,
} from "@prisma/client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AddComponent() {
  const { register, control, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      category: PayComponentCategory.earning,
      calculationType: PayComponentCalculationType.fixed,
      amount: 0,
      percentage: 0.0,
      isStatutory: false,
      formula: "",
      baseComponentId: null,
    },
  });
  const [open, setOpen] = useState(false);

  const {
    data: payComponents,
    isLoading,
    isError,
  } = useGetPayComponentsQuery();
  const [createComponent] = useCreatePayComponentMutation();

  const watchCalculationType: PayComponentCalculationType | any =
    watch("calculationType");

  const addComponent = async (data) => {
    const payload = {
      name: data.name,
      amount: data.calculationType === "fixed" ? data.amount : data.percentage,
      category: data.category,
      calculationType: data.calculationType,
      formula: data.formula || null,
      baseComponentId: data.baseComponentId || null,
      isStatutory: data.isStatutory || false,
    };

    await createComponent(payload);
    reset();
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Component</Button>
      <DialogOrDrawer
        open={open}
        handleClose={() => setOpen(false)}
        maxWidth="xs"
      >
        <div className="p-4">
          <Box
            className="flex flex-col gap-4"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",

              "&>div": {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
            }}
          >
            <div>
              <Label>Component Name</Label>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                {...register("name")}
              />
            </div>

            <div className="mt-4">
              <Label>Category</Label>
              <Select
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={PayComponentCategory.earning}
                {...register("category")}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {Object.entries(PayComponentCategory).map((category) => (
                  <MenuItem
                    key={category[0]}
                    value={category[0]}
                    className="capitalize"
                  >
                    {category[1]}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <Label>Calculation Type</Label>
              <Select
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={PayComponentCalculationType.fixed}
                {...register("calculationType")}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {Object.entries(PayComponentCalculationType).map(
                  (calculationType) => (
                    <MenuItem
                      key={calculationType[0]}
                      value={calculationType[0]}
                      className="capitalize"
                    >
                      {calculationType[1]}
                    </MenuItem>
                  )
                )}
              </Select>
            </div>
            <div className="mb-4">
              <div className="flex items- justify-between  space-x-3 space-y-0 rounded border-[#c4c4c4] px-3 py-2 border">
                <Label>Statutory</Label>
                <Controller
                  name="isStatutory"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      {...field}
                      value={undefined}
                    />
                  )}
                />
              </div>
            </div>
            {watchCalculationType === PayComponentCalculationType.fixed && (
              <div>
                <Label>Amount</Label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  {...register("amount", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
              </div>
            )}
            {watchCalculationType ===
              PayComponentCalculationType.percentage && (
              <div>
                <Label>Percentage</Label>
                <div className="flex items-center gap-2">
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-1/3"
                    slotProps={{
                      input: {
                        endAdornment: "%",
                      },
                    }}
                    {...register("percentage", {
                      valueAsNumber: true,
                      min: 0,
                      max: 100,
                    })}
                  />
                  <LoadingSuspense isLoading={isLoading} isError={isError}>
                    <Select
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("baseComponentId")}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {payComponents?.map((component) => (
                        <MenuItem
                          key={component.id}
                          value={component.id}
                          className="capitalize"
                        >
                          {component.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </LoadingSuspense>
                </div>
              </div>
            )}
            {watchCalculationType === PayComponentCalculationType.formula && (
              <div>
                <Label>Formula</Label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("formula")}
                />
              </div>
            )}

            <div className="mt-4">
              <Button onClick={handleSubmit(addComponent)}>
                Add Component
              </Button>
            </div>
          </Box>
        </div>
      </DialogOrDrawer>
    </>
  );
}
