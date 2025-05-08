import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default function Compensation() {
  return (
    <>
      <Accordion>
        <AccordionSummary>Current Compensation</AccordionSummary>
        <AccordionDetails>
          <div className="flex-default">
            <div>
              <h4></h4>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
