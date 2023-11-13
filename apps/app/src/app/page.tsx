import {
  MultiStepForm,
  MultiStepFormNextStep,
  MultiStepFormPreviousStep,
  MultiStepFormStep,
  MultiStepFormStepDescription,
  MultiStepFormStepTitle,
} from "@/components/multistep-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

export default async function Index() {
  const user: User | null = await currentUser();
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome back, {user?.firstName} !
        </PageHeaderDescription>

        <MultiStepForm className="mt-10">
          <MultiStepFormStep stepIndex={1}>
            <MultiStepFormStepTitle>Step 1</MultiStepFormStepTitle>
            <MultiStepFormStepDescription>
              This is Step 1 description
            </MultiStepFormStepDescription>
          </MultiStepFormStep>
          <MultiStepFormStep stepIndex={2}>
            <MultiStepFormStepTitle>Step 2</MultiStepFormStepTitle>
            <MultiStepFormStepDescription>
              This is Step 2 description
            </MultiStepFormStepDescription>
          </MultiStepFormStep>
          <MultiStepFormStep stepIndex={3}>
            <MultiStepFormStepTitle>Step 3</MultiStepFormStepTitle>
            <MultiStepFormStepDescription>
              This is Step 3 description
            </MultiStepFormStepDescription>
          </MultiStepFormStep>
          <div className="mt-6 flex gap-x-4">
            <MultiStepFormPreviousStep>Previous</MultiStepFormPreviousStep>
            <MultiStepFormNextStep>Next</MultiStepFormNextStep>
          </div>
        </MultiStepForm>

        <MultiStepForm className="mt-10">
          <MultiStepFormStep stepIndex={1}>
            <MultiStepFormStepTitle>Step 1</MultiStepFormStepTitle>
            <MultiStepFormStepDescription>
              This is Step 1 description
            </MultiStepFormStepDescription>
          </MultiStepFormStep>
          <MultiStepFormStep stepIndex={2}>
            <MultiStepFormStepTitle>Step 2</MultiStepFormStepTitle>
            <MultiStepFormStepDescription>
              This is Step 2 description
            </MultiStepFormStepDescription>
          </MultiStepFormStep>
          <div className="mt-6 flex gap-x-4">
            <MultiStepFormPreviousStep>Previous</MultiStepFormPreviousStep>
            <MultiStepFormNextStep>Next</MultiStepFormNextStep>
          </div>
        </MultiStepForm>
      </PageHeader>
    </div>
  );
}
