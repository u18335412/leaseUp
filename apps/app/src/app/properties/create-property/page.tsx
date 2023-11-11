"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  PropertyTypeStep,
  PropertyDetailsStep,
  createPropertyFormSchema,
  Progress,
} from "@/components/create-property";
import { PropertyOwnershipStep } from "@/components/create-property/property-ownership-step";
import { PropertyUnitsStep } from "@/components/create-property/property-units-step";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyDescription, PropertyType } from "@prisma/client";
import { cn } from "lib";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button, Form } from "ui";
import type * as z from "zod";

const CreateProperty: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const propertyMutation = api.property.post.useMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof createPropertyFormSchema>>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      propertyType: PropertyType.RESIDENTIAL,
      propertyDescription: PropertyDescription.SINGLEFAMILY,
      propertyOwnership: {
        ownershipType: "OWNED",
        propertyOwners: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "Foo@hey.com",
            percentageOwned: "100",
          },
        ],
      },
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createPropertyFormSchema>> = (
    _data,
  ) => {
    propertyMutation.mutate(
      {
        description: _data.propertyDescription,
        ..._data.propertyDetails,
        units: _data.units,
        owners: [..._data.propertyOwnership.propertyOwners],
      },
      {
        onSuccess: () => {
          router.prefetch("/properties");
          router.push("/properties");
          toast.success("Property created successfully!", {
            duration: 5000,
          });
        },
        onError: () => {
          toast.error("Something went wrong!\nPlease try again later", {
            duration: 5000,
          });
        },
      },
    );
  };

  return (
    <div>
      <div>
        <Breadcrumb
          links={[
            {
              href: "/properties",
              name: "Properties",
              current: false,
            },
            {
              href: "/properties/create-property",
              name: "Create Property",
              current: true,
            },
          ]}
        />
      </div>
      <div className="flex items-baseline justify-between">
        <PageHeader>
          <PageHeaderHeading>Create Property</PageHeaderHeading>
          <PageHeaderDescription>
            Please complete all the steps to create a new property.
          </PageHeaderDescription>
        </PageHeader>
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="mt-10 flex items-start gap-x-10 ">
        <Progress currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <div className="w-full max-w-xl">
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- This is expected. */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {currentStep === 0 && <PropertyTypeStep form={form} />}
              {currentStep === 1 && <PropertyDetailsStep form={form} />}
              {currentStep === 2 && <PropertyUnitsStep form={form} />}
              {currentStep === 3 && <PropertyOwnershipStep form={form} />}
              <div className="mt-8 flex justify-between">
                <Button
                  className="flex items-center gap-x-2"
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className={cn(
                    "flex items-center gap-x-2",
                    currentStep !== 3 && "hidden",
                  )}
                  size="sm"
                  type="submit"
                  isLoading={propertyMutation.isLoading}
                >
                  Create Property
                  <Save aria-hidden="true" className="h-4 w-4" />
                </Button>
                <Button
                  className={cn(
                    "flex items-center gap-x-2",
                    currentStep === 3 && "hidden",
                  )}
                  onClick={() => {
                    if (currentStep < 3) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  size="sm"
                  type="button"
                >
                  Next
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
