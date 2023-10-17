import { FC } from 'react';
import { Step } from './step-wrapper';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from 'ui';
import { createPropertyFormSchema, formFields } from './constants';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

export const PropertyDetailsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <div>
      <Step
        title="Property Details"
        description="Lets fill in the property details"
      >
        <div className="grid mt-4 grid-cols-4 gap-4">
          {formFields.map(({ name, label, placeholder }) => (
            <FormField
              key={name}
              control={form.control}
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
    </div>
  );
};
