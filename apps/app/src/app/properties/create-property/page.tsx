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
  MultiStep,
  MultiStepNext,
  MultiStepPrevious,
} from "@/components/multistep-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyDescription, PropertyType } from "@prisma/client";
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
          router.push("/properties");
          router.refresh();
          toast.success("Property created successfully!", {
            duration: 5000,
          });
        },
        onError: (e) => {
          toast.error("Something went wrong. Please try again later", {
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
      <div className="mt-2 flex items-baseline justify-between">
        <PageHeader>
          <PageHeaderHeading>Create Property</PageHeaderHeading>
          <PageHeaderDescription className="hidden md:flex">
            Please complete all the steps to create a new property.
          </PageHeaderDescription>
        </PageHeader>
      </div>

      <div className="mt-4 flex items-start gap-x-10 md:mt-10 ">
        <Progress currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <div className="w-full max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MultiStep
                className="w-full"
                onStepChange={(currentStep) => {
                  setCurrentStep(currentStep);
                }}
              >
                <PropertyTypeStep form={form} />
                <PropertyDetailsStep form={form} />
                <PropertyUnitsStep form={form} />
                <PropertyOwnershipStep form={form} />
                <div className="mt-8 flex w-full justify-between">
                  <MultiStepPrevious className="flex gap-x-2">
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Back
                  </MultiStepPrevious>
                  {currentStep === 3 ? (
                    <Button
                      type="submit"
                      isLoading={propertyMutation.isLoading}
                    >
                      Create Property
                      <Save aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <MultiStepNext className="flex gap-x-2">
                      Next
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </MultiStepNext>
                  )}
                </div>
              </MultiStep>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
