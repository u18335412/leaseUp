import { UseFormReturn } from "react-hook-form";
import { StepperStep, StepperStepDescription, StepperStepTitle } from "../multistep-form";
import { createLeaseFormSchema } from "./constants";
import * as z from "zod";

export const FinalisStep: React.FC<{
  form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={5}>
      <StepperStepTitle>Deposit</StepperStepTitle>
      <StepperStepDescription>
        Add the deposit amount and details.
      </StepperStepDescription>
    </StepperStep>
  );
};
