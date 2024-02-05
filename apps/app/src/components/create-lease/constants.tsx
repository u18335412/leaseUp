import Link from "next/link";
import { api } from "@/trpc/react";
import { LeaseType } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "lib";
import {
  CalendarDays,
  CalendarIcon,
  CalendarRange,
  CheckCircle2,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Calendar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  buttonVariants,
} from "ui";
import * as z from "zod";

const createLeaseFormSchema = z.object({
  propertyId: z.string(),
  unitId: z.string(),
  leaseStartDate: z.date().default(new Date()),
  leaseEndDate: z.date().default(new Date()).optional(),
  rent: z.number(),
  deposit: z.number(),
  tenantId: z.array(z.string()).min(1, {
    message: "At least one tenant is required",
  }),
  unitIds: z.array(z.string()).min(1, {
    message: "At least one unit is required",
  }),
  leaseType: z.enum([LeaseType.FIXED, LeaseType.MONTH_TO_MONTH]),
  isActive: z.boolean().optional().default(false),
});

const LeaseTypes = [
  {
    name: LeaseType.FIXED,
    icon: CalendarRange,
    label: "Fixed",
  },
  {
    name: LeaseType.MONTH_TO_MONTH,
    icon: CalendarDays,
    label: "Month to Month",
  },
] as const;

const FormFields = {
  basics: [
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        const propertiesQuery = api.lease.getAllProperties.useQuery();
        return (
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Property</FormLabel>
                <FormDescription>
                  Select the property for which you want to create a lease.
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-56">
                    {propertiesQuery.data?.data.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        <div className="flex gap-x-2 truncate">
                          <span>{property.name}</span>
                          <span className="text-muted-foreground">{`${property.street}, ${property.city}, ${property.province}, ${property.zip}, ${property.country}.`}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        const propertyId = form.watch("propertyId");
        const unitsQuery = api.lease.getAllUnits.useQuery(propertyId, {
          enabled: propertyId === undefined ? false : true,
        });
        return (
          <FormField
            control={form.control}
            name="unitId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Unit</FormLabel>
                <FormDescription>
                  Select the unit for which you want to create a lease.
                </FormDescription>
                <Select
                  disabled={!propertyId}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" line-clamp-1">
                      <SelectValue
                        className="line-clamp-1"
                        placeholder={
                          propertyId === undefined
                            ? "Select property first."
                            : "Select unit."
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {unitsQuery.data?.data &&
                    unitsQuery.data?.data.length > 0 ? (
                      <div>
                        {unitsQuery.data?.data.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            <div className="flex w-full items-center justify-between gap-x-1">
                              <span>
                                {unit.name}{" "}
                                <span className="text-muted-foreground italic"></span>
                              </span>
                              <Separator className="h-1.5 w-1.5 rounded-full" />
                              <div className="text-muted-foreground leading-8">
                                {unit.bedrooms} bed, {unit.bathrooms} bath
                              </div>
                              <Separator className="h-1.5 w-1.5 rounded-full" />
                              <span className="text-muted-foreground italic">
                                R {unit.rent} / mo.
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    ) : (
                      <Alert className="border-none text-center shadow-none">
                        <div>
                          <AlertTitle>No Units</AlertTitle>
                          <AlertDescription>
                            Property has no units.
                          </AlertDescription>
                        </div>
                        <div className="mt-2">
                          <Link
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                            })}
                            href={`/properties/${propertyId}/units`}
                          >
                            Create a unit
                          </Link>
                        </div>
                      </Alert>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        return (
          <FormField
            control={form.control}
            name="leaseType"
            render={({ field }) => (
              <FormItem className="col-span-2 mt-3 space-y-3">
                <FormLabel>Lease Type</FormLabel>
                <FormDescription>
                  Select the type of lease you want to create.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2 gap-4 md:grid-cols-3"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {LeaseTypes.map((leaseType) => (
                      <FormItem
                        className={cn(
                          "border-border text-muted-foreground relative flex h-10 flex-row items-center gap-x-2 space-y-0 rounded-md border px-2 transition-colors",
                          leaseType.name === field.value &&
                            "border-primary text-primary border-2",
                        )}
                        key={leaseType.name}
                      >
                        <leaseType.icon className="h-4 w-4 text-inherit" />
                        <FormControl>
                          <RadioGroupItem
                            className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-md border-none opacity-0"
                            value={leaseType.name}
                          />
                        </FormControl>
                        {leaseType.name === field.value && (
                          <CheckCircle2
                            aria-hidden="true"
                            className="absolute right-2 top-2 h-5 w-5"
                          />
                        )}
                        <FormLabel
                          className={cn(
                            "ml-0 space-x-0 text-xs",
                            leaseType.name === field.value && "font-bold",
                          )}
                        >
                          {leaseType.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        return (
          <FormField
            control={form.control}
            name="leaseStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormDescription className="leading-6">
                  Lease start date
                </FormDescription>
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
        );
      },
    },
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        const leaseType = form.watch("leaseType");

        if (leaseType === LeaseType.MONTH_TO_MONTH) return null;

        return (
          <FormField
            control={form.control}
            name="leaseEndDate"
            render={({ field }) => (
              <FormItem className="animate animate-in fade-in flex flex-1 flex-col">
                <FormDescription className="leading-6">
                  Lease end date
                </FormDescription>
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
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
  ],
  tenants: [
    {
      field: (form: UseFormReturn<z.infer<typeof createLeaseFormSchema>>) => {
        return 
      },
    },
  ],
};

export { createLeaseFormSchema, FormFields, LeaseTypes };
