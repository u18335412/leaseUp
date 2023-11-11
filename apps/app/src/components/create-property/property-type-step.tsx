import type { FC } from "react";
import type { createPropertyFormSchema } from "./constants";
import { propertyDescriptions, propertyTypes } from "./constants";
import { Step } from "./step-wrapper";
import { cn } from "lib";
import { CheckCircle2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "ui";
import type * as z from "zod";

export const PropertyTypeStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <Step description="" title="Property type & description">
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">
          Please select a type that best describes your property.
        </p>
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 md:grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyTypes.map((propertyType) => (
                    <FormItem
                      className={cn(
                        "border-border text-muted-foreground relative flex h-10 flex-row items-center gap-x-2 space-y-0 rounded-md border px-2 transition-colors",
                        propertyType.name === field.value &&
                          "border-primary text-primary border-2",
                      )}
                      key={propertyType.name}
                    >
                      <propertyType.icon className="h-4 w-4 text-inherit" />
                      <FormControl>
                        <RadioGroupItem
                          disabled={propertyType.name === "COMMERCIAL"}
                          className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-md border-none opacity-0"
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
      <div className="mt-4">
        <p className=" text-muted-foreground text-sm">
          Please select your property description.
        </p>
        <FormField
          control={form.control}
          name="propertyDescription"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 md:grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyDescriptions.map((propertyType) => (
                    <FormItem
                      className={cn(
                        "border-border text-muted-foreground relative flex h-10 flex-row items-center gap-x-2 space-y-0 rounded-md border px-2 transition-colors",
                        propertyType.name === field.value &&
                          "border-primary text-primary border-2",
                      )}
                      key={propertyType.name}
                    >
                      <propertyType.icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-inherit"
                      />
                      <FormControl>
                        <RadioGroupItem
                          className="absolute -top-2 left-0 h-full w-full cursor-pointer rounded-md opacity-0"
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
    </Step>
  );
};
