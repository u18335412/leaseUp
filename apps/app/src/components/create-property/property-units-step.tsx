import type { FC } from "react";
import {
  StepperStep,
  StepperStepDescription,
  StepperStepTitle,
} from "../multistep-form";
import { unitFields, type createPropertyFormSchema } from "./constants";
import { PlusIcon, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "ui";
import type * as z from "zod";

export const PropertyUnitsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "units",
  });

  return (
    <StepperStep stepIndex={3}>
      <StepperStepTitle>Property Units</StepperStepTitle>
      <StepperStepDescription>
        Lets fill in the property units.
      </StepperStepDescription>
      <ul className="mt-4">
        <div className="divide-y">
          {fields.map((item, fieldsIndex) => (
            <li
              className="animate-in fade-in slide-in-from-top-1 relative flex flex-col gap-2 gap-y-2 pb-4 pt-2 md:flex-row md:items-end"
              key={item.id}
            >
              <div className="grid grid-cols-2 gap-x-4 md:grid-cols-4">
                {unitFields.map(({ name, label, type }) => (
                  <FormField
                    control={form.control}
                    key={name}
                    name={`units.${fieldsIndex}.${name}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">{label}</FormLabel>
                        <FormControl>
                          <Input placeholder={label} type={type} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                className="text-destructive group h-9 hover:bg-transparent  md:absolute md:-right-14 md:top-10"
                onClick={() => {
                  remove(fieldsIndex);
                }}
                size="sm"
                type="button"
                variant="outline"
              >
                <span className="mr-2 md:sr-only">Remove unit</span>
                <X className="group-hover:text-primary h-4 w-4 transition-colors" />
              </Button>
            </li>
          ))}

          <div className="mt-4">
            <Button
              className="flex w-full gap-x-2"
              onClick={() => {
                append({
                  name: "",
                  bedrooms: 1,
                  bathrooms: 1,
                  rent: 0,
                });
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              <PlusIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              Add Unit
            </Button>
          </div>
        </div>
      </ul>
    </StepperStep>
  );
};
