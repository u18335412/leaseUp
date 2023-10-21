/* eslint-disable no-nested-ternary -- Disable rule for now */
import type { FC } from 'react';
import { Check } from 'lucide-react';
import { cn } from 'lib';

const steps = [
  {
    name: 'Type',
    description: 'Property type and description goes here.',
  },
  {
    name: 'Address',
    description: 'Add the address of the property.',
  },
  {
    name: 'Units',
    description: 'Add the units for this property.',
  },
  {
    name: 'Finalize',
    description: 'Finalize the property creation.',
  },
];

export const Progress: FC<{
  currentStep: number;
  setCurrentStep: (step: number) => void;
}> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            className={cn(
              stepIdx !== steps.length - 1 ? 'pb-10' : '',
              'relative',
            )}
            key={step.name}
          >
            {currentStep > stepIdx ? (
              <div className="animate-in fade-in">
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary"
                  />
                ) : null}
                <button
                  className="group relative flex items-start text-left"
                  type="button"
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary group-hover:bg-indigo-800">
                      <Check
                        aria-hidden="true"
                        className="h-5 w-5 text-white"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </button>
              </div>
            ) : stepIdx === currentStep ? (
              <div className="animate-in fade-in">
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                  />
                ) : null}
                <button
                  aria-current="step"
                  className="group relative flex items-start text-left"
                  type="button"
                >
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-primary">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in">
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                  />
                ) : null}
                <button
                  className="group relative flex items-start text-left"
                  type="button"
                >
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
