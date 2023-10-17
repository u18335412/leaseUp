import { FC } from 'react';

const steps = [
  { id: 'Step 1', name: 'Type' },
  { id: 'Step 2', name: 'Address' },
  { id: 'Step 3', name: 'Units' },
  { id: 'Step 4', name: 'Ownership' },
];
export const Progress: FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}> = ({ setCurrentStep, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            {index < currentStep ? (
              <button
                onClick={() => setCurrentStep(index)}
                className="group w-full flex flex-col border-l-4 border-primary py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs font-medium text-primary group-hover:text-indigo-800">
                  {step.id}
                </span>
                <span className="text-xs font-medium">{step.name}</span>
              </button>
            ) : index === currentStep ? (
              <button
                onClick={() => setCurrentStep(index)}
                className="flex flex-col w-full border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-xs font-medium text-primary">
                  {step.id}
                </span>
                <span className="text-xs font-medium">{step.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(index)}
                className="group w-full flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-xs font-medium">{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
