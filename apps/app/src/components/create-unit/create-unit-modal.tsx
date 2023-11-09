"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  buttonVariants,
  Button,
  Dialog,
  DialogTrigger,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DialogDismiss,
} from "ui";
import type * as z from "zod";
import { createUnitSchema, createUnitFormFields } from "./constants";

/* eslint-disable @typescript-eslint/no-misused-promises -- Expected */

const dummyProperties = [
  "Property 1",
  "Property 2",
  "Property 3",
  "Property 4",
];

export function CreateUnit(): ReactNode {
  const isEmpty = false;

  const form = useForm<z.infer<typeof createUnitSchema>>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {},
  });

  const handleSubmit = (_data: z.infer<typeof createUnitSchema>) => {
    const data = _data;
    data.name = "test";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-x-2">
          <Plus aria-hidden className="h-4 w-4" />
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
                      size: "sm",
                    }),
                    "mt-4 flex gap-x-2"
                  )}
                  href="/properties/create-property"
                >
                  <Plus aria-hidden className="h-4 w-4" />
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
                  className="grid grid-cols-4 gap-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  {createUnitFormFields.map(({ name, label, type }) => {
                    return (
                      <FormField
                        control={form.control}
                        key={name}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input {...field} type={type} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                  <DialogFooter className="col-span-4 gap-2">
                    <DialogDismiss asChild>
                      <Button size="sm" type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogDismiss>
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
