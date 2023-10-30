"use client";

import { useState } from "react";
import type { NextPage } from "next";
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

  const form = useForm<z.infer<typeof createPropertyFormSchema>>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      propertyType: "SINGLEFAMILY",
      propertyDescription: "RESIDENTIAL",
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
    alert(JSON.stringify(_data));

    propertyMutation.mutate(
      {
        name: _data.propertyDetails.name,
        streetNumber: _data.propertyDetails.streetNumber,
        streetName: _data.propertyDetails.streetName,
        zip: _data.propertyDetails.zip,
        province: _data.propertyDetails.province,
        city: _data.propertyDetails.city,
      },
      {
        onSuccess: () => {
          toast.success("Property created successfully!", {
            duration: 5000,
          });
        },
      },
    );
  };

  const data = api.healthcheck.useQuery();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Create Property</PageHeaderHeading>
        <PageHeaderDescription>
          Please complete all the steps to create a new property.
        </PageHeaderDescription>
      </PageHeader>

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
