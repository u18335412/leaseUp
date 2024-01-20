"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createUnitSchema, createUnitFormFields } from "./constants";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  DialogDismiss,
} from "ui";
import type * as z from "zod";

export function CreateUnit(): ReactNode {
  const isEmpty = false;
  const createUnitMutation = api.property.createUnit.useMutation();
  const path = usePathname();
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof createUnitSchema>>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {},
  });

  const propertyId: string = path?.split("/")[2] as string;

  const handleSubmit = (_data: z.infer<typeof createUnitSchema>) => {
    const data = _data;
    createUnitMutation.mutate(
      { propertyId, ...data },
      {
        onSuccess: () => {
          form.reset({
            name: "",
            bedrooms: 0,
            bathrooms: 0,
            rent: 0,
            deposit: 0,
          });
          toast.success("Unit created successfully!");
          closeModalButtonRef.current?.click();
          router.refresh();
        },
        onError: (e) => {
          toast.error("Failed to create new unit. Please try again later");
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-x-2">
          <Plus aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only md:not-sr-only">Create Unit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-sm">
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
                    "mt-4 flex gap-x-2",
                  )}
                  href="/properties/create-property"
                >
                  <Plus aria-hidden="true" className="h-4 w-4" />
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
                          <FormItem
                            className={cn("col-span-2", {
                              "col-span-4": name === "name",
                            })}
                          >
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
                    <DialogDismiss ref={closeModalButtonRef} asChild>
                      <Button size="sm" type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogDismiss>
                    <Button
                      size="sm"
                      type="submit"
                      isLoading={createUnitMutation.isLoading}
                    >
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
