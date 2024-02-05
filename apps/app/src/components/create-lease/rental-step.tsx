import { UseFormReturn } from "react-hook-form";
import { StepperStep, StepperStepDescription, StepperStepTitle } from "../multistep-form";
import { createLeaseFormSchema } from "./constants";
import * as z from "zod";

export const RentalStep: React.FC<{
  form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={3}>
      <StepperStepTitle>Rental</StepperStepTitle>
      <StepperStepDescription>
        Add the rental charges and details.
      </StepperStepDescription>
    </StepperStep>
  );
};
