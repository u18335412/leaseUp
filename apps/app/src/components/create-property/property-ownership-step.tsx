import { ownerFields, propertyOwners } from "./constants";
import type { createPropertyFormSchema } from "./constants";
import { Step } from "./step-wrapper";
import { cn } from "lib";
import { CheckCircle2, Plus, X } from "lucide-react";
import type { FC } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Button,
  Input,
} from "ui";
import type * as z from "zod";

export const PropertyOwnershipStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  const watchedField = form.watch("propertyOwnership.ownershipType");
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "propertyOwnership.propertyOwners",
  });
  return (
    <Step
      description="Please fill in property ownership details."
      title="Property Ownership"
    >
      <div className="mt-4">
        <FormField
          control={form.control}
          name="propertyOwnership.ownershipType"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyOwners.map((propertyType) => (
                    <FormItem
                      className={cn(
                        "relative flex h-10 flex-row items-center gap-x-2  space-y-0  rounded-md border border-border px-2 text-muted-foreground transition-colors",
                        propertyType.name === field.value &&
                          "border-2 border-primary text-primary"
                      )}
                      key={propertyType.name}
                    >
                      <propertyType.icon className="h-4 w-4 text-inherit" />
                      <FormControl>
                        <RadioGroupItem
                          className="absolute left-0 top-2 h-full w-full cursor-pointer rounded-md opacity-0"
                          value={propertyType.name}
                        />
                      </FormControl>
                      {propertyType.name === field.value && (
                        <CheckCircle2
                          aria-hidden="true"
                          className="absolute right-2 top-2 h-5 w-5"
                        />
                      )}
                      <FormLabel
                        className={cn(
                          "ml-0 space-x-0 text-xs",
                          propertyType.name === field.value && "font-bold"
                        )}
                      >
                        {propertyType.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {watchedField === "SOMEONE_ELSE" && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-1">
          <div>
            {fields.map((item, fieldsIndex) => (
              <div
                className="flex items-end gap-x-2 animate-in fade-in slide-in-from-top-1"
                key={item.id}
              >
                <div className="grid grid-cols-4 gap-x-4">
                  {ownerFields.map(({ name, label, type }) => (
                    <FormField
                      control={form.control}
                      key={name + item.id}
                      name={`propertyOwnership.propertyOwners.${fieldsIndex}.${name}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">{label}</FormLabel>
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
                  className="group hover:bg-transparent"
                  onClick={() => {
                    remove(fieldsIndex);
                  }}
                  size="sm"
                  type="button"
                  variant="ghost"
                >
                  <span className="sr-only">Remove unit</span>
                  <X className="h-4 w-4 transition-colors group-hover:text-primary" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              className="w-full flex gap-x-2"
              onClick={() => {
                append({
                  firstName: "",
                  lastName: "",
                  email: "",
                  percentageOwned: "",
                });
              }}
              type="button"
              variant="secondary"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Add Owner
            </Button>
          </div>
        </div>
      )}
    </Step>
  );
};
