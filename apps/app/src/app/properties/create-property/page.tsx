'use client';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/PageHeading';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'ui';
import {
  PropertyTypeStep,
  PropertyDetailsStep,
  createPropertyFormSchema,
  Progress,
} from '@/components/create-property';
import * as z from 'zod';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
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
          <Progress setCurrentStep={setCurrentStep} currentStep={currentStep} />
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
                disabled={currentStep === 0}
                type="button"
                variant="outline"
                className="flex items-center gap-x-2"
                onClick={() => setCurrentStep(currentStep - 1)}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                type="button"
                className="flex items-center gap-x-2"
                onClick={() => setCurrentStep(currentStep + 1)}
                size="sm"
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
