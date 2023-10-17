/* eslint-disable @typescript-eslint/no-misused-promises -- Expected */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Alert,
  AlertDescription,
  AlertTitle,
  buttonVariants,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui';
import type * as z from 'zod';
import { cn } from 'lib';
import Link from 'next/link';
import { createUnitSchema, createUnitFormFields } from './constants';

const dummyProperties = [
  'Property 1',
  'Property 2',
  'Property 3',
  'Property 4',
];

export function CreateUnit(): ReactNode {
  const isEmpty = false;

  const form = useForm<z.infer<typeof createUnitSchema>>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {},
  });

  const handleSubmit = (_data: z.infer<typeof createUnitSchema>) => {
    const data = _data;
    data.name = 'test';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-x-2">
          <Plus aria-hidden className="w-4 h-4" />
          Create Unit
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-sm">
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- testing */}
        {isEmpty ? (
          <div>
            <Alert className="border-none">
              <div className="mt-4">
                <AlertTitle>No Properties</AlertTitle>
                <AlertDescription>
                  Oops, it looks like you haven&apos;t created any properties
                  yet.
                </AlertDescription>
                <Link
                  className={cn(
                    buttonVariants({
                      size: 'sm',
                    }),
                    'mt-4 flex gap-x-2',
                  )}
                  href="/properties/create-property"
                >
                  <Plus aria-hidden className="w-4 h-4" />
                  Create Property
                </Link>
              </div>
            </Alert>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create Unit</DialogTitle>
              <DialogDescription>
                Please complete the form below to create a unit.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  className="gap-4 grid grid-cols-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="propertyId"
                    render={({ field }) => (
                      <FormItem className=" col-span-4">
                        <FormLabel>Property</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the property the unit belongs to." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dummyProperties.map((property) => (
                              <SelectItem key={property} value={property}>
                                {property}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  {createUnitFormFields.map(({ name, label }) => {
                    return (
                      <FormField
                        control={form.control}
                        key={name}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                  <DialogFooter className="col-span-4">
                    <Button size="sm" type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Create Unit
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
