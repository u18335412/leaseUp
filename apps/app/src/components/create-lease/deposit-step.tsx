import {
  StepperStep,
  StepperStepDescription,
  StepperStepTitle,
} from "../multistep-form";
import { createLeaseFormSchema } from "./constants";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const DepositStep: React.FC<{
  form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={4}>
      <StepperStepTitle>Deposit</StepperStepTitle>
      <StepperStepDescription>
        Add the deposit amount and details.
      </StepperStepDescription>
    </StepperStep>
  );
};
