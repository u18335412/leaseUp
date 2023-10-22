import type { FC } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "ui";
import type { UseFormReturn } from "react-hook-form";
import type * as z from "zod";
import type { createPropertyFormSchema } from "./constants";
import { formFields } from "./constants";
import { Step } from "./step-wrapper";

export const PropertyDetailsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <Step
      description="Lets fill in the property address."
      title="Property Address"
    >
      <div className="mt-4 grid grid-cols-4 gap-4">
        {formFields.map(({ name, label, placeholder }) => (
          <FormField
            control={form.control}
            key={name}
            name={name}
            render={({ field }) => (
              <FormItem className=" col-span-2">
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
    </Step>
  );
};
