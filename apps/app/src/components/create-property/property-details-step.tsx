import type { FC } from "react";
import type { createPropertyFormSchema } from "./constants";
import { formFields } from "./constants";
import {
  StepperStep,
  StepperStepDescription,
  StepperStepTitle,
} from "@/components/multistep-form";
import { cn } from "lib";
import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "ui";
import type * as z from "zod";

export const PropertyDetailsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <StepperStep stepIndex={2}>
      <StepperStepTitle>Property Address</StepperStepTitle>
      <StepperStepDescription>
        Lets fill in the property address.
      </StepperStepDescription>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {formFields.map(({ name, label, placeholder }) => (
          <FormField
            control={form.control}
            key={name}
            name={name}
            render={({ field }) => (
              <FormItem
                className={cn("col-span-2", {
                  "col-span-4": name === "propertyDetails.name",
                })}
              >
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </StepperStep>
  );
};
