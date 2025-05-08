import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function CompensationForm() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="text-lg text-black font-medium">Compensation Form</div>
        <Button>Save</Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="gross-monthly-compensation">
            Monthly Compensation
          </Label>
          <TextField
            id="gross-monthly-compensation"
            type="number"
            placeholder="40000"
            size="small"
            fullWidth
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="effective-from">Effective From</Label>
          <TextField
            id="effective-from"
            type="date"
            size="small"
            placeholder="2023-01-01"
            fullWidth
          />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="text-lg text-black">Components</div>
          <Button variant={"ghost"}>Presets</Button>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-2">
          <CompensationComponent />
          <CompensationComponent />
          <CompensationComponent />
        </div>
        <Button variant={"outline"}>
          <PlusCircle /> Add Component
        </Button>
      </div>
    </div>
  );
}

export function CompensationComponent() {
  const [component, setComponent] = useState("");
  return (
    <div className="grid grid-cols-subgrid col-span-4 items-center justify-items-center">
      <FormControl fullWidth size="small">
        <Select
          variant="outlined"
          value={component}
          displayEmpty
          onChange={(e) => setComponent(e.target.value)}
        >
          <MenuItem value="">Component</MenuItem>
          <MenuItem value={10}>Basic</MenuItem>
          <MenuItem value={20}>HRA</MenuItem>
          <MenuItem value={30}>LTA</MenuItem>
        </Select>
      </FormControl>
      <div>Fixed</div>
      <div>Earning</div>
      <div>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Amount"
          fullWidth
        />
      </div>
    </div>
  );
}
