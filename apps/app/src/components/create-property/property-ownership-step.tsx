import type { FC } from "react";
import {
  MultiStepFormStep,
  MultiStepFormStepDescription,
  MultiStepFormStepTitle,
} from "../multistep-form";
import type { createPropertyFormSchema } from "./constants";
import { ownerFields, propertyOwners } from "./constants";
import { cn } from "lib";
import { CheckCircle2, Plus, X } from "lucide-react";
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
    <MultiStepFormStep stepIndex={4}>
      <MultiStepFormStepTitle>Property Ownership</MultiStepFormStepTitle>
      <MultiStepFormStepDescription>
        Please fill in property ownership details.
      </MultiStepFormStepDescription>
      <div className="mt-4">
        <FormField
          control={form.control}
          name="propertyOwnership.ownershipType"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyOwners.map((propertyType) => (
                    <FormItem
                      className={cn(
                        "border-border text-muted-foreground relative flex h-10 flex-row  items-center  gap-x-2 space-y-0 rounded-md border px-2 transition-colors",
                        propertyType.name === field.value &&
                          "border-primary text-primary border-2",
                      )}
                      key={propertyType.name}
                    >
                      <propertyType.icon className="h-4 w-4 text-inherit" />
                      <FormControl>
                        <RadioGroupItem
                          className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-md border-0 opacity-0"
                          value={propertyType.name}
                          disabled={propertyType.name === "SOMEONE_ELSE"}
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
                          propertyType.name === field.value && "font-bold",
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
        <div className="animate-in fade-in slide-in-from-top-1 mt-6">
          <div className="divide-y">
            {fields.map((item, fieldsIndex) => (
              <div
                className="animate-in fade-in slide-in-from-top-1 relative flex flex-col gap-x-2 gap-y-2 pb-4 pt-2 md:flex-row"
                key={item.id}
              >
                <div className="grid grid-cols-2 gap-x-4 md:grid-cols-4">
                  {ownerFields.map(({ name, label, type }) => (
                    <FormField
                      control={form.control}
                      key={name + item.id}
                      name={`propertyOwnership.propertyOwners.${fieldsIndex}.${name}`}
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
                  <span className="not-sr-only mr-2 md:sr-only">
                    Remove owner
                  </span>
                  <X
                    aria-hidden="true"
                    className="group-hover:text-primary h-4 w-4 transition-colors"
                  />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              className="flex w-full gap-x-2"
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
    </MultiStepFormStep>
  );
};
