"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@mui/material";
import { Plus } from "lucide-react";
import { useState } from "react";
import CompensationForm from "./CompensationForm";

export default function NewCompensation() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> New Compensation
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <CompensationForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
