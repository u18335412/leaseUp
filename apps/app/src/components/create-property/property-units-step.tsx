import type { FC } from "react";
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
import { Step } from "./step-wrapper";
import { unitFields, type createPropertyFormSchema } from "./constants";

export const PropertyUnitsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "units",
  });

  return (
    <div>
      <Step
        description="Please add the units for this property"
        title="Property Units"
      >
        <div className="mt-4">
          {fields.map((item, fieldsIndex) => (
            <div
              className="flex flex-col md:flex-row md:items-end gap-2 animate-in fade-in slide-in-from-top-1"
              key={item.id}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
                {unitFields.map(({ name, label, type }) => (
                  <FormField
                    control={form.control}
                    key={name}
                    name={`units.${fieldsIndex}.name`}
                    render={() => (
                      <FormItem>
                        <FormLabel className="sr-only">{label}</FormLabel>
                        <FormControl>
                          <Input placeholder={label} type={type} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                className="group text-destructive hover:bg-transparent h-9"
                onClick={() => {
                  remove(fieldsIndex);
                }}
                size="sm"
                type="button"
                variant="outline"
              >
                <span className="md:sr-only mr-2">Remove unit</span>
                <X className="h-4 w-4 transition-colors group-hover:text-primary" />
              </Button>
            </div>
          ))}

          <div className="mt-4">
            <Button
              className="flex w-full gap-x-2"
              onClick={() => {
                append({
                  name: "",
                  bedrooms: 0,
                  bathrooms: 0,
                  rent: 0,
                });
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              <PlusIcon className="h-4 w-4 flex-shrink-0" />
              Add Unit
            </Button>
          </div>
        </div>
      </Step>
    </div>
  );
};
