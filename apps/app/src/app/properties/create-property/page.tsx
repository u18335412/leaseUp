"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "lib";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import type { NextPage } from "next";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button, Form } from "ui";
import type * as z from "zod";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { PropertyUnitsStep } from "@/components/create-property/property-units-step";
import { PropertyOwnershipStep } from "@/components/create-property/property-ownership-step";
import {
  PropertyTypeStep,
  PropertyDetailsStep,
  createPropertyFormSchema,
  Progress,
} from "@/components/create-property";

const CreateProperty: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<z.infer<typeof createPropertyFormSchema>>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      propertyType: "SINGLEFAMILY",
      propertyDescription: "COMMERCIAL",
      propertyOwnership: {
        ownershipType: "OWNED",
        propertyOwners: [],
      },
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createPropertyFormSchema>> = (
    data
  ) => {
    // eslint-disable-next-line no-alert -- Expected.
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Create Property</PageHeaderHeading>
        <PageHeaderDescription>
          Please complete all the steps to create a new property.
        </PageHeaderDescription>
      </PageHeader>

      <div className="mt-10 flex items-start gap-x-10">
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
                    currentStep !== 3 && "hidden"
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
                  currentStep === 3 && "hidden"
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
