"use client";

/* eslint-disable @typescript-eslint/no-misused-promises -- Expected */

import { useState } from "react";
import type { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button, Form } from "ui";
import type * as z from "zod";
import {
  PropertyTypeStep,
  PropertyDetailsStep,
  createPropertyFormSchema,
  Progress,
} from "@/components/create-property";
import { PropertyUnitsStep } from "@/components/create-property/property-units-step";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";

const CreateProperty: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<z.infer<typeof createPropertyFormSchema>>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      propertyType: "SINGLEFAMILY",
      propertyDescription: "COMMERCIAL",
    },
  });

  const onSubmit = (_data: z.infer<typeof createPropertyFormSchema>) => {
    // const _data = data;
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {currentStep === 0 && <PropertyTypeStep form={form} />}
              {currentStep === 1 && <PropertyDetailsStep form={form} />}
              {currentStep === 2 && <PropertyUnitsStep form={form} />}
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
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex items-center gap-x-2"
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                  }}
                  size="sm"
                  type="button"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
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
