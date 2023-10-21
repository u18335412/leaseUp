import type { FC } from 'react';
import { cn } from 'lib';
import { CheckCircle2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from 'ui';
import type * as z from 'zod';
import { Step } from './step-wrapper';
import type { createPropertyFormSchema } from './constants';
import { propertyDescription, propertyTypes } from './constants';

export const PropertyTypeStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <Step description="" title="Property type & description">
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          Please select a description that best describes your property.
        </p>
        <FormField
          control={form.control}
          name="propertyDescription"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyDescription.map((propertyType) => (
                    <FormItem
                      className={cn(
                        'relative flex h-10 flex-row items-center gap-x-2  space-y-0  rounded-md border border-border px-2 text-muted-foreground transition-colors',
                        propertyType.name === field.value &&
                          'border-2 border-primary text-primary',
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
                          'ml-0 space-x-0 text-xs',
                          propertyType.name === field.value && 'font-bold',
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
        <p className=" text-sm text-muted-foreground">
          Please select your property type.
        </p>
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-3"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {propertyTypes.map((propertyType) => (
                    <FormItem
                      className={cn(
                        'relative flex h-10 flex-row items-center gap-x-2 space-y-0 rounded-md border border-border px-2 text-muted-foreground transition-colors',
                        propertyType.name === field.value &&
                          'border-2 border-primary text-primary',
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
                          'ml-0 space-x-0 text-xs',
                          propertyType.name === field.value && 'font-bold',
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
