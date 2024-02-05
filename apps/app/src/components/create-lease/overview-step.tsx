import { propertyTypes } from "../create-property";
import {
  StepperStep,
  StepperStepContent,
  StepperStepDescription,
  StepperStepTitle,
} from "../multistep-form";
import { FormFields, LeaseTypes, createLeaseFormSchema } from "./constants";
import { cn } from "lib";
import { CheckCircle2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "ui";
import * as z from "zod";

export const OverviewStep: React.FC<{
  form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={1}>
      <StepperStepTitle>Overview</StepperStepTitle>
      <StepperStepDescription>
        Basic details about the lease.
      </StepperStepDescription>

      <StepperStepContent>
        <div className="grid grid-cols-2 gap-3">
          {FormFields.basics.map((field) => {
            if (field.field) return field.field(form);
          })}
        </div>
      </StepperStepContent>
    </StepperStep>
  );
};
