import { Card, styled } from "@mui/material";

export const EmployeeInfoCard = styled(Card)(() => ({
  border: "1px solid var(--border)",
  "& .MuiCardHeader-title": { fontSize: "1rem", fontWeight: "bold" },
}));
