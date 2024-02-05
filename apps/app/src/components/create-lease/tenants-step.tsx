import {
  StepperStep,
  StepperStepContent,
  StepperStepDescription,
  StepperStepTitle,
} from "../multistep-form";
import { AddNewTenantDialog } from "./add-tenat";
import { createLeaseFormSchema } from "./constants";
import { UseFormReturn } from "react-hook-form";
import { EmptyState, EmptyStatePrimaryAction, EmptyStateTitle } from "ui";
import * as z from "zod";

export const TenantsStep: React.FC<{
  form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={2}>
      <StepperStepTitle>Tenants</StepperStepTitle>
      <StepperStepDescription>
        Add the tenants associated with this lease.
      </StepperStepDescription>

      <StepperStepContent>
        <AddNewTenantDialog />
      </StepperStepContent>
    </StepperStep>
  );
};
