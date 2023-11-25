"use client";

import { FC } from "react";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "ui";
import { z } from "zod";

const NewTenantFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email().optional(),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
});

export const CreateNewTenant: FC = () => {
  const newTenantMutation = api.tenant.post.useMutation();
  const form = useForm<z.infer<typeof NewTenantFormSchema>>({
    resolver: zodResolver(NewTenantFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof NewTenantFormSchema>) => {
    newTenantMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tenant created successfully.");
        form.reset();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" aria-hidden="true" />
          Create Tenant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tenant</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new tenant, please.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="John@Hey.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="712356789" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>9 digit phone number.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" isLoading={newTenantMutation.isLoading}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
