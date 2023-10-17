import { FC } from 'react';
import { Step } from './step-wrapper';
import * as z from 'zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from 'ui';
import {
  createPropertyFormSchema,
  propertyDescription,
  propertyTypes,
} from './constants';
import { cn } from 'lib';
import { UseFormReturn } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';

export const PropertyTypeStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  return (
    <div>
      <Step title="Property type" description="">
        <div className="mt-4">
          <p className=" text-muted-foreground text-sm">
            Please select a description that best describes your property.
          </p>
          <FormField
            control={form.control}
            name="propertyDescription"
            render={({ field }) => (
              <FormItem className="space-y-3 mt-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3"
                  >
                    {propertyDescription.map((propertyType) => (
                      <FormItem
                        key={propertyType.name}
                        className={cn(
                          'flex flex-col items-center justify-center space-y-2 border w-28 h-28 relative  border-border  rounded-md p-3 text-muted-foreground transition-colors',
                          propertyType.name === field.value &&
                            'border-primary border-2 text-primary',
                        )}
                      >
                        <propertyType.icon className="w-4 h-4 text-inherit" />
                        <FormControl>
                          <RadioGroupItem
                            value={propertyType.name}
                            className="w-full h-full absolute -top-2 left-0 rounded-md opacity-0 cursor-pointer"
                          />
                        </FormControl>
                        {propertyType.name === field.value && (
                          <CheckCircle2
                            aria-hidden="true"
                            className="absolute w-5 h-5 top-0 right-2"
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
          <p className=" text-muted-foreground text-sm">
            Please select your property type and description
          </p>
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem className="space-y-3 mt-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3"
                  >
                    {propertyTypes.map((propertyType) => (
                      <FormItem
                        key={propertyType.name}
                        className={cn(
                          'flex flex-col items-center justify-center space-y-2 border w-28 h-28 relative  border-border  rounded-md p-3 text-muted-foreground transition-colors',
                          propertyType.name === field.value &&
                            'border-primary border-2 text-primary',
                        )}
                      >
                        <propertyType.icon className={'w-4 h-4 text-inherit'} />
                        <FormControl>
                          <RadioGroupItem
                            value={propertyType.name}
                            className="w-full h-full absolute -top-2 left-0 rounded-md opacity-0 cursor-pointer"
                          />
                        </FormControl>
                        {propertyType.name === field.value && (
                          <CheckCircle2
                            aria-hidden="true"
                            className="absolute w-5 h-5 top-0 right-2"
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
    </div>
  );
};
