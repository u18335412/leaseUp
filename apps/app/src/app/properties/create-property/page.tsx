/* eslint-disable @typescript-eslint/no-misused-promises -- Expected */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'ui';
import type * as z from 'zod';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  PropertyTypeStep,
  PropertyDetailsStep,
  createPropertyFormSchema,
  Progress,
} from '@/components/create-property';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { PropertyUnitsStep } from '@/components/create-property/property-units-step';

const CreateProperty: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<z.infer<typeof createPropertyFormSchema>>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      propertyType: 'SINGLEFAMILY',
      propertyDescription: 'COMMERCIAL',
    },
  });

  const onSubmit = (data: z.infer<typeof createPropertyFormSchema>) => {
    const _data = data;
  };

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Create Property</PageHeaderHeading>
        <PageHeaderDescription>
          Please complete all the steps to create a property.
        </PageHeaderDescription>
      </PageHeader>

      <div className="mt-8 max-w-xl pt-6">
        <div>
          <Progress currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>

      <div className="max-w-xl mt-6 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 0 && <PropertyTypeStep form={form} />}
            {currentStep === 1 && <PropertyDetailsStep form={form} />}
            {currentStep === 2 && <PropertyUnitsStep form={form} />}
            <div className="flex justify-between mt-8">
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
                <ArrowLeft className="w-4 h-4" />
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
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProperty;
