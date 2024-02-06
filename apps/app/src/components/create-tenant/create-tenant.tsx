"use client";

import { FC, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { cn } from "lib";
import { Plus, CalendarIcon, User, X } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogDismiss,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  buttonVariants,
} from "ui";
import { z } from "zod";

const TITLES = ["Mr", "Ms", "Mrs", "Dr", "Other"] as const;
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const NewTenantFormSchema = z.object({
  avatar: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      `Only .jpg, .jpeg, .png and .webp formats are supported.`,
    ),
  title: z.enum(TITLES).default("Mr"),
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  dob: z.date(),
  occupation: z.string().min(1, {
    message: "Occupation is required.",
  }),
  email: z.string().email().optional(),
  phone: z
    .string()
    .min(1, {
      message: "Phone number is required.",
    })
    .length(10, {
      message: "10 digits phone number please.",
    }),
});

const FormFields = {
  basic: [
    {
      field: (form: UseFormReturn<z.infer<typeof NewTenantFormSchema>>) => {
        const [selectedImage, setSelectedImage] = useState(null as File | null);
        return (
          <div className="mt-4 flex items-start gap-x-8">
            {selectedImage ? (
              <div className="animate animate-in fade-in relative h-11 w-11 shrink-0">
                <img
                  className="h-11 w-11 rounded-md object-cover"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                />
                <button
                  onClick={() => {
                    form.setValue("avatar", null);
                    setSelectedImage(null);
                  }}
                  title="Remove avatar"
                >
                  <X
                    aria-hidden="true"
                    className="text-destructive absolute -right-2 -top-2 h-4 w-4"
                  />
                  <span className="sr-only">Remove</span>
                </button>
              </div>
            ) : (
              <User
                aria-hidden="true"
                className="text-muted-foreground animate-in animate fade-in h-11 w-11 shrink-0 rounded-md border p-2"
              />
            )}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        id="avatar"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
                      />
                      <label
                        htmlFor="avatar"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "sm",
                        })}
                      >
                        <span className="whitespace-nowrap">
                          choose your image
                        </span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      },
    },
    {
      field: (form: UseFormReturn<z.infer<typeof NewTenantFormSchema>>) => (
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2" key="title">
              <FormLabel>Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TITLES.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      name: "firstName",
      label: "First name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last name",
      type: "text",
    },
    {
      field: (form: UseFormReturn<z.infer<typeof NewTenantFormSchema>>) => (
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="leading-6">Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "text",
    },
  ],
  contact: [
    {
      name: "phone",
      label: "Phone number",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
  ],
};

export const CreateNewTenant: FC = () => {
  const newTenantMutation = api.tenant.post.useMutation();
  const form = useForm<z.infer<typeof NewTenantFormSchema>>({
    resolver: zodResolver(NewTenantFormSchema),
    defaultValues: {},
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const onSubmit = (data: z.infer<typeof NewTenantFormSchema>) => {
    newTenantMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tenant created successfully.");
        form.reset({});
        queryClient.invalidateQueries();
        closeButtonRef.current?.click();
      },
      onError: () => {
        toast.error("Something went wrong, please try again.");
      },
    });
  };

  return (
    <Dialog
      onOpenChange={(boolean) => {
        if (!boolean) {
          form.reset({
            title: "Mr",
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Create</span> Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-md">
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
                <h2 className="text-muted-foreground text-sm">
                  Basic Information
                </h2>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-4">
                  {FormFields.basic.map(({ label, name, type, field }) => {
                    if (field) {
                      return field(form);
                    }
                    return (
                      <FormField
                        name={name}
                        render={({ field }) => (
                          <FormItem
                            className={cn({
                              "col-span-2": name === "title",
                            })}
                            key={name}
                          >
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input placeholder="" type={type} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                <div className="mt-6">
                  <h2 className="text-muted-foreground text-sm">
                    Contact Information
                  </h2>
                  <Separator className="my-2" />
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {FormFields.contact.map(({ label, name, type }) => {
                      return (
                        <FormField
                          name={name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{label}</FormLabel>
                              <FormControl>
                                <Input placeholder="" type={type} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <DialogDismiss ref={closeButtonRef}>
                  <Button variant="outline">Cancel</Button>
                </DialogDismiss>
                <Button type="submit" isLoading={newTenantMutation.isLoading}>
                  Save Tenant
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
