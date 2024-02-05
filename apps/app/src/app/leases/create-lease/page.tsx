"use client";

import { useState } from "react";
import { NextPage } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { createLeaseFormSchema } from "@/components/create-lease/constants";
import { DepositStep } from "@/components/create-lease/deposit-step";
import { FinalisStep } from "@/components/create-lease/finalize-step";
import { OverviewStep } from "@/components/create-lease/overview-step";
import { Progress } from "@/components/create-lease/progress";
import { RentalStep } from "@/components/create-lease/rental-step";
import { TenantsStep } from "@/components/create-lease/tenants-step";
import {
  Stepper,
  StepperNextStep,
  StepperPreviousStep,
} from "@/components/multistep-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaseType } from "@prisma/client";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button, Form } from "ui";
import * as z from "zod";

const CreateNewLease: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<z.infer<typeof createLeaseFormSchema>>({
    resolver: zodResolver(createLeaseFormSchema),
    defaultValues: {
      leaseType: LeaseType.MONTH_TO_MONTH,
    },
  });

  const onSubmit = (data: z.infer<typeof createLeaseFormSchema>) => {
    console.log("submit");
  };

  return (
    <div>
      <div>
        <Breadcrumb
          links={[
            {
              href: "/leases",
              name: "Leases",
              current: false,
            },
            {
              href: "/leases/create-lease",
              name: "Create Property",
              current: true,
            },
          ]}
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <PageHeader>
          <PageHeaderHeading>Create Lease</PageHeaderHeading>
          <PageHeaderDescription className="hidden md:flex">
            Complete all the steps to create a new lease for a tenant.
          </PageHeaderDescription>
        </PageHeader>
      </div>

      <div className="mt-4 flex items-start gap-x-10 md:mt-10 ">
        <Progress currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <div className="w-full max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stepper
                className="w-full"
                onStepChange={(currentStep) => {
                  setCurrentStep(currentStep);
                }}
              >
                <OverviewStep form={form} />
                <TenantsStep form={form} />
                <RentalStep form={form} />
                <DepositStep form={form} />
                <FinalisStep form={form} />

                <div className="mt-8 flex w-full justify-between">
                  <StepperPreviousStep className="flex gap-x-2">
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Back
                  </StepperPreviousStep>
                  {currentStep === 4 ? (
                    <Button
                      type="submit"
                      // isLoading={propertyMutation.isLoading}
                    >
                      Create Lease
                      <Save aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <StepperNextStep className="flex gap-x-2">
                      Next
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </StepperNextStep>
                  )}
                </div>
              </Stepper>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewLease;
