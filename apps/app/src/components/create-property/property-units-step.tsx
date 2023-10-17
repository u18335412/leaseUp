import { FC } from 'react';
import { Step } from './step-wrapper';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from 'ui';
import { createPropertyFormSchema } from './constants';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { PlusIcon, X } from 'lucide-react';

const unitFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'bedrooms',
    label: 'Bedrooms',
    type: 'number',
  },
  {
    name: 'bathrooms',
    label: 'Bathrooms',
    type: 'number',
  },
  {
    name: 'rent',
    label: 'Rent',
    type: 'number',
  },
];

export const PropertyUnitsStep: FC<{
  form: UseFormReturn<z.infer<typeof createPropertyFormSchema>>;
}> = ({ form }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: 'units',
    },
  );

  return (
    <div>
      <Step
        title="Property Units"
        description="Please add the units for this property"
      >
        <div className="mt-4">
          {fields.map((item, fieldsIndex) => (
            <div key={item.id} className="flex items-end gap-x-2">
              <div className="grid grid-cols-4 gap-x-4">
                {unitFields.map(({ name, label, type }, index) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={`units.${fieldsIndex as number}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{label}</FormLabel>
                        <FormControl>
                          <Input type={type} placeholder={label} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="group hover:bg-transparent"
                type="button"
                onClick={() => remove(fieldsIndex)}
              >
                <span className="sr-only">Remove</span>
                <X className="w-4 h-4 group-hover:text-primary transition-colors" />
              </Button>
            </div>
          ))}

          <div className="mt-4">
            <Button
              size="sm"
              className="flex gap-x-2 w-full"
              variant="secondary"
              onClick={() =>
                append({
                  name: '',
                  bedrooms: 0,
                  bathrooms: 0,
                  rent: 0,
                })
              }
              type="button"
            >
              <PlusIcon className="w-4 h-4 flex-shrink-0"></PlusIcon>
              Add Unit
            </Button>
          </div>
        </div>
      </Step>
    </div>
  );
};
